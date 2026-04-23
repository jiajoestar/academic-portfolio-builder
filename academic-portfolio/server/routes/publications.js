const express = require("express")
const axios = require("axios")
const User = require("../models/User")
const elsevier = require("../lib/elsevier")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

console.log("Publications routes loaded")

// TEST
router.get("/test", (req, res) => {
    res.json({ message: "Publications route works" })
})

// SEARCHING FOR PUBLICATION
router.get("/search", async (req, res) => {
    try {
        const q = req.query.q

        if (!q) {
            return res.status(400).json({ error: "Query is required" })
        }

        const response = await elsevier.get("/search/scopus", {
            params: {
                query: q,
                count: 10,
            },
        })

        const entries = response.data?.["search-results"]?.entry || []

        const results = entries.map((item) => ({
            eid: item.eid,
            title: item["dc:title"] || "",
            doi: item["prism:doi"] || null,
            journal: item["prism:publicationName"] || null,
            date: item["prism:coverDate"] || null,
            citedByCount: item["citedby-count"] || 0,
            creator: item["dc:creator"] || null,
        }))

        res.json(results)
    } catch (error) {
        console.error("Search error:", error.response?.data || error.message)
        res.status(500).json({ error: "Failed to fetch publications" })
    }
})

// RETRIEVING PUBLICATIONS
router.get("/:eid", async (req, res) => {
    try {
        const { eid } = req.params

        const response = await elsevier.get(`/abstract/eid/${encodeURIComponent(eid)}`, {
            params: {
                view: "META_ABS",
            },
        })

        const data = response.data?.["abstracts-retrieval-response"]

        if (!data) {
            return res.status(404).json({ error: "Publication not found" })
        }

        const authors = data.authors?.author || []

        res.json({
        eid: data.eid || eid,
        title: data["dc:title"] || null,
        doi: data["prism:doi"] || null,
        journal: data["prism:publicationName"] || null,
        date: data["prism:coverDate"] || null,
        citedByCount: data["citedby-count"] || 0,
        abstract: data["dc:description"] || null,
        authors: Array.isArray(authors)
            ? authors.map((a) => ({
                auid: a["@auid"] || null,
                name: [a["ce:given-name"], a["ce:surname"]].filter(Boolean).join(" "),
            }))
            : [],
        })
    } catch (error) {
        console.error("Detail error:", error.response?.data || error.message)
        res.status(500).json({ error: "Failed to fetch publication details" })
    }
})

// ADDING PUBLICATION TO PROFILE
router.post("/save", authMiddleware, async (req, res) => {
    try {
        const { eid } = req.body

        if (!eid) {
            return res.status(400).json({ error: "eid is required" })
        }

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const alreadyExists = (user.publications || []).some(pub => pub.eid === eid)
        if (alreadyExists) {
            return res.status(200).json({ message: "Publication already added" })
        }

        const response = await elsevier.get(`/abstract/eid/${encodeURIComponent(eid)}`, {
            params: { view: "META_ABS" },
        })

        const data = response.data?.["abstracts-retrieval-response"]
        if (!data) {
            return res.status(404).json({ error: "Publication not found" })
        }

        const authors = Array.isArray(data.authors?.author)
        ? data.authors.author.map((a) => ({
            auid: a["@auid"] || null,
            name:
                [a["ce:given-name"], a["ce:surname"]].filter(Boolean).join(" ") ||
                a["ce:indexed-name"] ||
                null,
            }))
        : []

        const publication = {
            eid: data.eid || eid,
            title: data["dc:title"] || data.coredata?.["dc:title"] || "Untitled publication",
            doi: data["prism:doi"] || data.coredata?.["prism:doi"] || null,
            journal: data["prism:publicationName"] || data.coredata?.["prism:publicationName"] || null,
            date: data["prism:coverDate"] || data.coredata?.["prism:coverDate"] || null,
            citedByCount: data["citedby-count"] || data.coredata?.["citedby-count"] || 0,
            creator: authors.length > 0 ? authors.map((a) => a.name).filter(Boolean).join(", ") : null,
            authors,
            sourceType: data["prism:aggregationType"] || data.coredata?.["prism:aggregationType"] || null,
            url: data["prism:url"] || data.coredata?.["prism:url"] || null,
        }

        if (!user.publications) {
            user.publications = []
        }

        console.log("Publication to save:", publication)
        user.publications.push(publication)
        await user.save()

        res.status(201).json({
            message: "Publication saved to profile",
            publication,
        })
    } catch (error) {
        console.error("Save publication error:", error.response?.data || error.message)
        res.status(500).json({ error: "Failed to save publication" })
    }
})

// REMOVING PUBLICATION FROM PROFILE
router.delete("/:publicationId", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        user.publications = (user.publications || []).filter(
            (pub) => pub._id.toString() !== req.params.publicationId
        )

        await user.save()

        res.json({ message: "Publication removed from profile" })
    } catch (error) {
        console.error("Delete publication error:", error.message)
        res.status(500).json({ error: "Failed to remove publication" })
    }
})

module.exports = router