import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { Checkbox, InputAdornment, TextField, Tooltip } from '@mui/material';
import Link from 'next/link';

import { useAppContext } from '../pages/appContext';
import { useRouter } from 'next/router';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  // Filter States (Correlate with Set Arrays)
  const settings = ['in-person', 'virtual'];
  const audiences = ['Children', 'Teenagers', 'Young Adults', 'Adults'];
  const groups = ['under 10 people', '10-20 people', '20+ people'];
  const lengths = [
    '0-15 min',
    '15-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
  ];

  const theme = useTheme();
  const [open, setOpen] = useState(true); // Filter Drawer Status
  const dynamicIndex = open ? 350 : 250; // Z-Index Adjustment based on Drawer Status

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Search Function
  const searchGames = () => {
    const body = { query: search };
    console.log('Searching for: ', body.query);

    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(data => {
        setGames(data);
      })
      .catch(err => console.log('UH OH: ERROR: ', err));
  };

  // Search on Enter key press
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      searchGames();
    }
  };

  // Filter Function
  type Query = {
    forAges?: string;
    forGroupSize?: string;
    timeReq?: string;
    setting?: string;
  };

  const filterGame = () => {
    const query: Query = {};
    // Add Setting to the Search Query
    for (let i = 0; i < settings.length; i++) {
      if (settingSet[i] === true) {
        query['setting'] = settings[i];
      }
    }
    // Add Audience to Search Query
    for (let i = 0; i < audiences.length; i++) {
      if (audienceSet[i] === true) {
        query['forAges'] = audiences[i];
      }
    }
    // Add Group Size to Search Query
    for (let i = 0; i < groupSet.length; i++) {
      if (groupSet[i] === true) {
        query['forGroupSize'] = groups[i];
      }
    }
    // Add Game Length to Search Query
    for (let i = 0; i < lengthSet.length; i++) {
      if (lengthSet[i] === true) {
        query['timeReq'] = lengths[i];
      }
    }

    const body = query;

    fetch('/api/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('Filtered Results: ', data);
        setGames(data);
      })
      .catch(err => console.log('UH OH: ERROR: ', err));
  };

  // Setting Filter
  const handleSettingCheck = (e: any) => {
    const idx = e.target.value;
    setSettingSet(prevState => {
      const newSettingSet = [...prevState];
      newSettingSet[idx] = !newSettingSet[idx];
      return newSettingSet;
    });
  };

  const settingsCheckboxes = settings.map((setting, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          value={index}
          checked={settingSet[index]}
          style={{ color: 'white' }}
          onChange={handleSettingCheck}
        />
        <h4>&nbsp;&nbsp;{setting}</h4>
      </div>
    );
  });

  // Audience Filter
  const handleAudienceCheck = (e: any) => {
    const idx = e.target.value;
    setAudienceSet(prevState => {
      const newAudienceSet = [...prevState];
      newAudienceSet[idx] = !newAudienceSet[idx];
      return newAudienceSet;
    });
  };

  const audienceCheckboxes = audiences.map((audience, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          style={{ color: 'white' }}
          value={index}
          checked={audienceSet[index]}
          onChange={handleAudienceCheck}
        />
        <h4>&nbsp;&nbsp;{audience}</h4>
      </div>
    );
  });

  // Group Size Filter
  const handleGroupCheck = (e: any) => {
    const idx = e.target.value;
    setGroupSet(prevState => {
      const newGroupSet = [...prevState];
      newGroupSet[idx] = !newGroupSet[idx];
      return newGroupSet;
    });
  };

  const groupsCheckboxes = groups.map((group, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          style={{ color: 'white' }}
          value={index}
          checked={groupSet[index]}
          onChange={handleGroupCheck}
        />
        <h4>&nbsp;&nbsp;{group}</h4>
      </div>
    );
  });

  // Length Filter
  const handleLengthCheck = (e: any) => {
    const idx = e.target.value;
    setLengthSet(prevState => {
      const newLengthSet = [...prevState];
      newLengthSet[idx] = !newLengthSet[idx];
      return newLengthSet;
    });
  };

  const lengthCheckboxes = lengths.map((time, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          value={index}
          style={{ color: 'white' }}
          checked={lengthSet[index]}
          onChange={handleLengthCheck}
        />
        <h4>&nbsp;&nbsp;{time}</h4>
      </div>
    );
  });

  // Clear Filter State and Refresh Games List
  const clearFilter = () => {
    setSettingSet([false, false]);
    setAudienceSet([false, false, false, false]);
    setGroupSet([false, false, false]);
    setLengthSet([false, false, false, false, false]);
    fetch('/api/filter')
      .then(res => res.json())
      .then(result => {
        setGames(result);
        setFetchedGames(true);
      })
      .catch(err => console.log('Error while fetching games', err));
  };

  const router = useRouter();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position='fixed' open={open} sx={{ zIndex: 500 }}>
          <Toolbar className='header'>
            <div id='drawerButton'>
              {!open ? (
                <IconButton
                  color='default'
                  aria-label='open drawer'
                  onClick={handleDrawerOpen}
                  edge='start'
                >
                  <Tooltip title='Filter & Search'>
                    <MenuIcon fontSize='large' style={{ color: 'white' }} />
                  </Tooltip>
                </IconButton>
              ) : (
                <IconButton color='inherit' onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <Tooltip title='Collapse'>
                      <ChevronLeftIcon fontSize='large' color='inherit' />
                    </Tooltip>
                  ) : (
                    <ChevronRightIcon fontSize='large' color='info' />
                  )}
                </IconButton>
              )}
            </div>

            <div id='title' style={{ flexGrow: 1 }}>
              <Link href={'/'} style={{ textDecoration: 'none' }}>
                <h1>
                  playtabase&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h1>
              </Link>
              <h2 color='white'>your game & activity database</h2>
            </div>

            <div id='navBar'>
              <IconButton
                color='default'
                aria-label='open drawer'
                onClick={() => {
                  router.push('/create');
                }}
                edge='end'
              >
                <Tooltip title='Add Game'>
                  <LibraryAddIcon fontSize='large' style={{ color: 'white' }} />
                </Tooltip>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            zIndex: dynamicIndex,
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          {/* <DrawerHeader 
          // sx={{ height: 112 }}
          ></DrawerHeader> */}

          <div id='filter'>
            {/* Search Field */}
            <TextField
              label='Search'
              variant='outlined'
              size='small'
              fullWidth
              onChange={searchOnChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                style: {
                  color: 'white',
                },
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => searchGames()}>
                      <SearchIcon style={{ color: 'white' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />

            <div>
              <h3>Setting:</h3>
              {settingsCheckboxes}
            </div>

            <div>
              <h3>Audience:</h3>
              {audienceCheckboxes}
            </div>

            <div>
              <h3>Group Size:</h3>
              {groupsCheckboxes}
            </div>

            <div>
              <h3>Time:</h3>
              {lengthCheckboxes}
            </div>

            <Button
              variant='contained'
              size='medium'
              fullWidth
              id='button'
              onClick={() => filterGame()}
              endIcon={<FilterAltIcon />}
            >
              Filter
            </Button>

            <Button
              variant='contained'
              size='medium'
              fullWidth
              id='button'
              onClick={() => clearFilter()}
              endIcon={<ClearAllIcon />}
            >
              Clear Filters
            </Button>
          </div>
        </Drawer>

        <Main
          id='main'
          open={open}
          sx={{
            zIndex: 300,
          }}
        >
          {children}
        </Main>
      </Box>
    </>
  );
}
