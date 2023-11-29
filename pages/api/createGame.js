import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const gameData = req.body;
    const database = client.db('games');
    const collection = database.collection('games');
    await collection.insertOne(gameData);
    return res.status(200).json({ message: 'Game created successfuly' });
  } catch (error) {
    console.error('There was an error creating your game', error);
    res.status(500).json({ message: 'Error creating game' });
  }
};