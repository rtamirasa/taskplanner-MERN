const express = require('express');
const router = express.Router();
const Task = require('../models/TaskModels');

router.get('/status-summary', async (req, res) => {
  try {
    let filter = {};
    if (req.query.filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filter.dueDate = { $gte: oneWeekAgo };
    }

    const summary = await Task.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/category-summary', async (req, res) => {
  try {
    let filter = {};
    if (req.query.filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filter.dueDate = { $gte: oneWeekAgo };
    }

    const summary = await Task.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
