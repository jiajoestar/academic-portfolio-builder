import React, { useState } from 'react';
import './Forms.css'

const Publication = ({ onSaved }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [searching, setSearching] = useState(false)
    const [savingEid, setSavingEid] = useState(null)
    const [message, setMessage] = useState('')
    const [addedPublications, setAddedPublications] = useState([])

    const handleSearch = async () => {
        if (!query.trim()) return

        try {
            setSearching(true)
            setMessage('')
            setResults([])

            const res = await fetch(
                `http://localhost:5000/api/publications/search?q=${encodeURIComponent(query)}`,
                {
                credentials: "include",
                }
            )

            const text = await res.text()

            let data

        try {
            data = JSON.parse(text)
        } catch {
            throw new Error('Server returned an invalid response')
        }

        if (!res.ok) {
            throw new Error(data.error || 'Failed to search publications')
        }

        setResults(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
            setMessage(err.message || "Search failed")
        } finally {
            setSearching(false)
        }
    }

    const handleAddPublication = async (publication) => {
        try {
            setSavingEid(publication.eid)
            setMessage('')

            const token = localStorage.getItem('token')

            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/publications/save`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                eid: publication.eid,
                }),
            })

            const text = await res.text()

            let data

        try {
            data = JSON.parse(text)
        } catch {
            throw new Error('Server returned an invalid response')
        }

        if (!res.ok) {
            throw new Error(data.error || 'Failed to save publication')
        }

        setAddedPublications((prev) => [...prev, publication.eid])

        if (onSaved) {
            onSaved()
        }
        } catch (err) {
            console.error(err)
            setMessage(err.message || 'Save failed')
        } finally {
            setSavingEid(null)
        }
    }

    return (
        <form className='form-container'>
            <h3>Add publication</h3>
            <p>Search for a publication and add it to your profile.</p>

            <div className='form-group'>
                <label>Search</label>
                <div className='publication-search-row'>
                    <input
                    type="text"
                    placeholder="Search by title, DOI, keyword..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ flex: 1 }}
                    />
                    <button type="button" onClick={handleSearch} disabled={searching}>
                    {searching ? "Searching..." : "Search"}
                    </button>
                </div>
            </div>
            

            

            <div className='publication-results'>
                {results.length === 0 && !searching && (
                <p>No publications found yet. Try a title, DOI, or keyword.</p>
                )}

                {results.map((pub) => (
                <div className='publication-card'>
                    <h4 style={{ margin: 0 }}>{pub.title}</h4>

                    <p className='publication-meta'>
                    {pub.journal || "Unknown journal"}
                    {pub.date ? ` (${pub.date})` : ""}
                    </p>

                    <p style={{ margin: "8px 0" }}>
                    DOI: {pub.doi || "N/A"}
                    </p>

                    <p style={{ margin: "8px 0" }}>
                    Author: {pub.creator || "N/A"}
                    </p>

                    <button
                        type="button"
                        className={`form-button publication-add-button ${
                            addedPublications.includes(pub.eid)
                            ? "added-button"
                            : "publish-button"
                        }`}
                        onClick={() => handleAddPublication(pub)}
                        disabled={
                            savingEid === pub.eid ||
                            addedPublications.includes(pub.eid)
                        }
                    >
                        {savingEid === pub.eid
                            ? "Adding..."
                            : addedPublications.includes(pub.eid)
                            ? "✓ Added"
                            : "Add to profile"}
                    </button>
                </div>
                ))}
            </div>
        </form>
    )
}

export default Publication