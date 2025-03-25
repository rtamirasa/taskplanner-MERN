const { MongoClient } = require('mongodb');

const getTaskCountsByStatus = async (req, res) => {
  const uri = process.env.MONG_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); 
    const tasks = db.collection('tasks');

    const result = await tasks.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report' });
  } finally {
    await client.close();
  }
};

module.exports = { getTaskCountsByStatus };
