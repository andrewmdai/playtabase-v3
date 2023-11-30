import { useEffect } from 'react';
import GameCard from '../components/GameCard';
import { useAppContext } from './appContext';
import { useRouter } from 'next/router';
import GameDetail from './[id]';

import Create from './create';

export default function Main() {
  const { games, setGames, fetchedGames, setFetchedGames } = useAppContext();

  const router = useRouter();
  const currentPath = router.pathname;

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

  return currentPath === '/' && !fetchedGames ? (
    <>
      <h1>Loading data, please wait...</h1>
    </>
  ) : currentPath === '/' && fetchedGames ? (<div className='gameCard'>{gameElements}</div>
  ) : currentPath === "/create" ? <Create /> 
    : currentPath === "/[id]" ? <GameDetail games={games} /> : null
}
