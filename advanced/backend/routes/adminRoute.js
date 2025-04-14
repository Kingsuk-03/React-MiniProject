const { Router } = require("express");
const { Admin, User, Card } = require("../db");
const adminMiddleware = require("../middleware/admin");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const router = Router();


router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        await Admin.create({
            username: username,
            password: password
        });
        res.json({
            msg: "Admin Created Succesfully"
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const checkAdmin = await Admin.find({ username, password });
        if (checkAdmin) {
            const token = jwt.sign({ username: username }, JWT_SECRET)
            return res.status(200).json({
                token,
                msg: "SignIn Successfull"
            })
        } else {
            res.json({
                msg: " Incorrect username & password"
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.delete('/manage', adminMiddleware, async (req, res) => {
    try {
        const username = req.body.username;

        const findCard = await Card.findOne({ username });
        if (findCard) {
            await Card.deleteOne({ username });
            await User.updateOne({ username: username }, { $set: { BusinessCard: "" } });
            return res.status(200).json({
                msg: "Card Deleted successfully"
            })
        } else {
            res.json({
                msg: " Incorrect Name"
            })
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to Delete Card" });
    }
})

router.get('/allCards', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCards = await Card.find({});
    res.json({
        courses: allCards
    });
});

module.exports = router;

