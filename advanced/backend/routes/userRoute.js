const { Router } = require("express");
const { User, Card } = require("../db");
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const router = Router();


router.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        await User.create({
            username: username,
            password: password
        });
        res.json({
            msg: "User Created Succesfully"
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const checkUser = await User.findOne({ username, password });
        if (checkUser) {
            const token = jwt.sign({ username: username }, JWT_SECRET)
            return res.status(200).json({
                token,
                msg: "SignIn Successfull"
            })
        } else {
            return res.status(401).json({
                msg: " Incorrect username & password"
            })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

router.post('/addCard', userMiddleware, async (req, res) => {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const interests = req.body.interests;
        const LinkedInURL = req.body.LinkedInURL;
        const TwitterURL = req.body.TwitterURL;

        const findUser = await User.findOne({ username });

        const userID = findUser._id;

        await Card.create({
            username: username,
            description: description,
            interests: interests,
            LinkedInURL: LinkedInURL,
            TwitterURL: TwitterURL,
            user: userID
        });
        await User.findByIdAndUpdate(userID, {
            BusinessCard: {
                username,
                description,
                interests,
                LinkedInURL,
                TwitterURL
            }
        });
        res.status(200).json({
            msg: "Your card has been created Succesfully"
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})

router.get('/showCard/:username', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const { username } = req.params;
    const findCard = await Card.findOne({ username });
    res.status(200).json({
        card: findCard
    });
});

router.delete('/manage', userMiddleware, async (req, res) => {
    try {
        const username = req.body.username;

        const findCard = await Card.findOne({ username });
        if (findCard) {
            await Card.deleteOne({ username });
            await User.updateOne({ username: username }, { $set: { BusinessCard: "" } });
            return res.status(200).json({
                card: {},
                msg: "Card Deleted successfully"
            })
        } else {
            return res.json({
                msg: " Incorrect Name"
            })
        }
    } catch (err) {
        return res.status(500).json({ error: "Failed to Delete Card" });
    }
})

module.exports = router
