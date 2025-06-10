const express = require('express');
const { getDb } = require('../connect.cjs');
const router = express.Router();

// POST /api/bookmark to save or update bookmarks
router.post('/', async (req, res) => {
    const { userId, bookmarks } = req.body;

    if (!bookmarks || !userId) {
        return res.status(400).json({ error: 'Invalid or missing userId/bookmarks' });
    }

    try {
        const db = getDb();
        const collection = db.collection('bookmarks');

        const existingEntry = await collection.findOne({ userId });

        if (existingEntry) {
            const existingBookmarks = existingEntry.bookmarks || [];

            if (existingBookmarks.length === 0) {
                const result = await collection.updateOne(
                    { userId },
                    { $set: { bookmarks } }
                );

                return res.status(200).json({
                    message: 'Bookmarks inserted successfully',
                    modifiedCount: result.modifiedCount,
                    bookmarks
                });
            }

            const isBookmarkExist = existingBookmarks.some(b => b.id === bookmarks.id);

            if (!isBookmarkExist) {
                const result = await collection.updateOne(
                    { userId },
                    { $set: { bookmarks } }
                );

                return res.status(200).json({
                    message: 'Bookmarks updated successfully',
                    modifiedCount: result.modifiedCount,
                    bookmarks
                });
            }

            return res.status(200).json({
                message: 'Bookmark already exists. No update performed.',
                bookmarks: existingBookmarks
            });

        } else {
            const result = await collection.insertOne({ userId, bookmarks });

            return res.status(201).json({
                message: 'Bookmarks saved successfully',
                insertedId: result.insertedId,
                bookmarks
            });
        }

    } catch (err) {
        console.error('Error saving/updating bookmarks:', err);
        return res.status(500).json({ error: 'Failed to save or update bookmarks' });
    }
});

module.exports = router;
