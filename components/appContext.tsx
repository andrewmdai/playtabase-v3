import { createContext, useContext, useState, ReactNode } from 'react';

export interface GameType {
  _id: string;
  name: string;
  forAges: Array<string>;
  forGroupSize: Array<string>;
  setupTimeReq: Array<string>;
  timeReq: string;
  suppliesReq: Array<string>;
  setting: string;
  setup: string;
  howToPlay: string;
  tags: Array<string>;
  featured: boolean;
}

interface AppContextValue {
  games: GameType[];
  setGames: React.Dispatch<React.SetStateAction<GameType[]>>;
  fetchedGames: boolean;
  setFetchedGames: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  searchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settingSet: boolean[];
  setSettingSet: React.Dispatch<React.SetStateAction<boolean[]>>;
  audienceSet: boolean[];
  setAudienceSet: React.Dispatch<React.SetStateAction<boolean[]>>;
  groupSet: boolean[];
  setGroupSet: React.Dispatch<React.SetStateAction<boolean[]>>;
  lengthSet: boolean[];
  setLengthSet: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Custom hook for capturing user input
export const useInput = (init: any) => {
  const [value, setValue] = useState(init);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue(init);
  };
  return [value, onChange, reset];
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [games, setGames] = useState<GameType[]>([]); // Array of Games & Activities from the Database
  const [fetchedGames, setFetchedGames] = useState(false); // Boolean - Have the games been loaded from the Database?

  // Filter States (Correlate with Set Arrays)
  const [search, searchOnChange, searchReset] = useInput('');
  const [settingSet, setSettingSet] = useState([false, false]);
  const [audienceSet, setAudienceSet] = useState([false, false, false, false]);
  const [groupSet, setGroupSet] = useState([false, false, false]);
  const [lengthSet, setLengthSet] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const contextValue: AppContextValue = {
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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
