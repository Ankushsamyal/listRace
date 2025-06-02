const express = require('express');
const { getDb } = require('../connect.cjs');
const router = express.Router();

// POST /api/bookmark to save or update bookmarks
router.post('/', async (req, res) => {
    const { userId, bookmarks } = req.body;
    if (!userId || !bookmarks) {
        return res.status(400).json({ error: 'Invalid or missing userId/bookmarks' });
    }

    try {
        const db = getDb();
        const collection = db.collection('bookmarks');

        const existingData = await collection.findOne({ userId });

        if (existingData) {
            const DbData = existingData.bookmarks || [];
            if (DbData) {
                const DefaultValue = bookmarks;
                const result = await collection.updateOne(
                    { userId },
                    { $set: { bookmarks: DefaultValue } }
                );
                return res.status(200).json({
                    message: 'Bookmarks inserted successfully',
                    modifiedCount: result.modifiedCount,
                    bookmarks: DefaultValue,
                });
            }
            else {
                const isDuplicate = DbData.some(item => item.id === bookmarks.id);
                if (isDuplicate) {
                    return res.status(200).json({
                        message: 'Bookmark already exists, no update needed',
                        bookmarks: DbData,
                    });
                }

                const updatedBookmarks = [...DbData, bookmarks];

                const result = await collection.updateOne(
                    { userId },
                    { $set: { bookmarks: updatedBookmarks } }
                );

                return res.status(200).json({
                    message: 'Bookmarks updateeed successfully',
                    modifiedCount: result.modifiedCount,
                    bookmarks: updatedBookmarks,
                });
            }
        }
        else {

            const result = await collection.insertOne({ userId });

            return res.status(201).json({
                message: 'Bookmarks saved successfully',
                insertedId: result.insertedId,
                bookmarks,
            });
        }

    } catch (err) {
        console.error('Error saving/updating bookmarks:', err);
        return res.status(500).json({ error: 'Failed to save or update bookmarks' });
    }
});

module.exports = router;
