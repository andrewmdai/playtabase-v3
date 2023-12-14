import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('games');

    const clues = await db.collection('games').find({}).toArray();

    res.json(clues);
  } catch (error) {
    console.error(error);
  }
};
