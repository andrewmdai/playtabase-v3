import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const gameData = req.body;
    const database = client.db('games');
    const collection = database.collection('games');
    const idToFind = new ObjectId(gameData._id);
    await collection.deleteOne({ _id: idToFind });
    return res.status(200).json({ message: 'Game deleted successfuly' });
  } catch (error) {
    console.error('There was an error editing your game', error);
    res.status(500).json({ message: 'Error editing game', error });
  }
};
