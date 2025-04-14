const { Router } = require("express");
const { Card } = require("../db");
const router = Router();

router.get('/allCards', async (req, res) => {
    // Implement fetching all courses logic
    const allCards = await Card.find({});
    res.json({
        cards: allCards
    });
});

module.exports = router;

