const express = require('express');
const { getDb } = require('../connect.cjs');
const router = express.Router();

// POST /api/bookmark to save bookmarks
router.post('/', async (req, res) => {
    const { userId, bookmarks } = req.body;

    // Check if the data is received correctly
    if (!userId || !bookmarks) {
        return res.status(400).json({ error: 'Missing userId or bookmarks' });
    }

    try {
        // Check if user already has bookmarks stored
        const existingData = await getDb()
            .collection('bookmarks')
            .findOne({ userId: userId });

        if (existingData) {
            // If bookmarks exist for the user, update the existing ones
            const updatedData = await getDb().collection('bookmarks').updateOne(
                { userId: userId },
                { $set: { bookmarks: bookmarks } }
            );
            return res.json({ message: 'Bookmarks updated successfully', updatedData });
        } else {
            // If no bookmarks exist for the user, create a new document with bookmarks
            const result = await getDb().collection('bookmarks').insertOne({
                userId: userId,
                bookmarks: bookmarks,
            });
            return res.json({ message: 'Bookmarks saved successfully', result });
        }
    } catch (err) {
        console.error('Error saving bookmarks:', err);
        return res.status(500).json({ error: 'Failed to save bookmarks' });
    }
});

module.exports = router;
