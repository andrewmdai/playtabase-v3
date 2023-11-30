import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const gameData = req.body;
    const database = client.db('games');
    const collection = database.collection('games');
    const idToFind = new ObjectId(gameData._id);
    const updatedData = {
      name: gameData.name,
      forAges: gameData.forAges,
      forGroupSize: gameData.forGroupSize,
      setupTimeReq: gameData.setupTimeReq,
      timeReq: gameData.timeReq,
      suppliesReq: gameData.suppliesReq,
      setting: gameData.setting,
      setup: gameData.setup,
      howToPlay: gameData.howToPlay,
      tags: gameData.tags,
      featured: gameData.featured,
    };
    await collection.updateOne({ _id: idToFind }, { $set: updatedData });
    return res.status(200).json({ message: 'Game edited successfuly' });
  } catch (error) {
    console.error('There was an error editing your game', error);
    res.status(500).json({ message: 'Error editing game', error });
  }
};