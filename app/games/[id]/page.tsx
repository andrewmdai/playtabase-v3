'use client';

import GameDetail from '../../../components/GameDetail';
import { AppProvider, useAppContext } from '../../../pages/appContext';

export default function GamePage({ params }: any) {
  const {
    games,
    setGames,
    fetchedGames,
    setFetchedGames,
    search,
    searchOnChange,
    settingSet,
    setSettingSet,
    audienceSet,
    setAudienceSet,
    groupSet,
    setGroupSet,
    lengthSet,
    setLengthSet,
  } = useAppContext();

  // const note = await getNote(params.id)
  // console.log(params)
  const { id } = params;

  return (
    // <div>
    <AppProvider>
      <GameDetail game={games} id={id}></GameDetail>
    </AppProvider>
    // <h1>TEST TEST TEST TESET TSETSTETSTETSETEST</h1>
    // {/* <GameDetail></GameDetail>
    // <h1>notes/{note.id}</h1>
    // <div className="{styles.note}">
    //   <h3>{note.title}</h3>
    //   <h5>{note.description}</h5>
    //   <p>{note.created}</p>
    // </div> */}
    // {/* <GameDetail id={id}></GameDetail> */}
    // </div>
  );
}
