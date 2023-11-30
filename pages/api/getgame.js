import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const database = client.db('games');
    const collection = database.collection('games');
    const idToFind = req.query.id;
    const response = await collection.findOne({ _id: new ObjectId(idToFind) });

    if (response) {
      return res.status(200).json({ data: response });
    } else {
      return res.status(404).json({ message: 'Game data not found' });
    }
  } catch (error) {
    console.error('There was an error getting your game', error);
    res.status(500).json({ message: 'Error getting game', error });
  }
};
