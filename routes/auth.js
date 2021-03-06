const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/key')
router.post('/signup', (req, res) => {
    console.log('request done')
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email already registered" })
            }

            bcrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const user = new User({
                        name,
                        email,
                        password: hashedpassword,
                    })

                    user.save()
                        .then((user) => {
                            res.json({ message: "Saved Successfully" })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/login', (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please fill all the details" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Email is not registered" })
            }
            bcrypt.compare(password, savedUser.password)
                .then((isMatched) => {
                    if (isMatched) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)

                        const { _id, name, rooms } = savedUser

                        res.json({
                            token: token,
                            user: { _id, name, rooms }
                        })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
})

module.exports = router
