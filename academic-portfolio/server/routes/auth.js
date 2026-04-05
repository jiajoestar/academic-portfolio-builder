const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("Incoming data:", req.body)

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    })

    await user.save();
    console.log("User saved:", user)

    res.status(201).json({ message: "User created successfully" })
  } catch (err) {
    console.error("Register error:", err)
    res.status(400).json({ message: "Error creating user"})
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const email = req.body?.email
    const password = req.body?.password

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" })
    }

    console.log('Login attempt:', email)

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid email or password"})
    console.log('User found:', user)

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ message: "Invalid password"})

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: "1d" }
    )

    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        workplace: user.workplace || ""
      }
     })
  } catch (err) {
    console.error('Full login error:', err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// RESET PASSWORD AT LOGIN
const sendEmail = require("../sendEmail");

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user)
    return res.status(200).json("If email exists, reset link sent")

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000

  await user.save()

  const resetLink = `http://localhost:5173/reset-password/${token}`

  await sendEmail(
    email,
    "Password Reset",
    `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `
  )

  res.json("Reset email sent")
})

// UPDATE EMAIL IN SETTING PAGE
router.put("/update-email", async (req, res) => {
    const { email } = req.body
    const token = req.headers.authorization.split("")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret")

    const user = await User.findByIdAndUpdate(
        decoded.id,
        { email },
        { new: true }
    )

    res.json(user)
})

// CHANGE PASSWORD IN SETTINGS PAGE
router.put("/change-password", async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const token = req.headers.authorization.split("")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret")
    const user = await User.findById(decoded.id)
    const valid = await bcrpyt.compare(oldPassword, user.password)
    if (!valid) return res.status(400).json({ message: "wrong password" })
    
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: "Password updated" })
})

module.exports = router