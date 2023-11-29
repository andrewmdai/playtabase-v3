import { useEffect } from 'react';
import GameCard from '../../components/GameCard';
import { useAppContext } from '../../pages/appContext';
// import GameDetail from '../../components/GameDetail';
// import GameCreator from '../../components/GameCreator';

export default function Main() {
  const { games, setGames, fetchedGames, setFetchedGames } = useAppContext();

  // Fetching Games Array on Mount
  useEffect(() => {
    fetch('/api/gamesData', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        setGames(result);
        setFetchedGames(true);
      })
      .catch(err => console.log('Error while fetching games', err));
  }, []);

  // Create Game Cards from Fetch
  const gameElements = games.map((game: any, i: number) => (
    <GameCard key={i} info={game} />
  ));

  return !fetchedGames ? (
    <>
      <h1>Loading data, please wait...</h1>
    </>
  ) : (
    <div className='gameCard'>{gameElements}</div>
  );
}
