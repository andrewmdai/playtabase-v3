import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const database = client.db('games');
    const collection = database.collection('games');
    let searchQuery = req.body.query;
    console.log('Search Query: ', req.body.query);
    const data = await collection
      .find({ $text: { $search: searchQuery } })
      .toArray();
    console.log('Search Results: ', data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('There was an error getting database data', error);
    return ['This is not the data you are looking for'];
  }
};
