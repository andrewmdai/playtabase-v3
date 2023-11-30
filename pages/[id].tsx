import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import FaceIcon from '@mui/icons-material/Face';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600'],
});

export default function GameDetail({ games }: any) {
  const router = useRouter();
  const { id } = router.query;
  const game = games.find((game: any) => game._id === id);

  const {
    name,
    forAges,
    forGroupSize,
    setupTimeReq,
    timeReq,
    suppliesReq,
    setting,
    setup,
    howToPlay,
    tags,
    featured,
  } = game;

  const useInput = (init: any) => {
    const [value, setValue] = useState(init);
    const onChange = (e: any) => {
      setValue(e.target.value);
    };
    return [value, onChange];
  };

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useInput(name);

  // Audience State Handler
  const audiences = ['Children', 'Teenagers', 'Young Adults', 'Adults'];
  const defaultAges = [false, false, false, false];
  const newEditAges = defaultAges;
  for (let i = 0; i < audiences.length; i++) {
    if (forAges.includes(audiences[i])) {
      newEditAges[i] = true;
    }
  }
  const [editAges, setEditAges] = useState(newEditAges);

  // Group Size State Handler
  const groups = ['under 10 people', '10-20 people', '20+ people'];
  const defaultGroups = [false, false, false];
  const newEditGroup = defaultGroups;
  for (let i = 0; i < groups.length; i++) {
    if (forGroupSize.includes(groups[i])) {
      newEditGroup[i] = true;
    }
  }
  const [editGroup, setEditGroup] = useState(newEditGroup);

  // Setup Time State Handler
  const setupTimes = [
    '0-15 min',
    '15-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
  ];
  const defaultSetupTimes = [false, false, false, false, false];
  const newEditSetupTime = defaultSetupTimes;
  for (let i = 0; i < setupTimes.length; i++) {
    if (setupTimeReq.includes(setupTimes[i])) {
      newEditSetupTime[i] = true;
    }
  }
  const [editSetupTime, setEditSetupTime] = useState(newEditSetupTime);

  // Game Length State Handler
  const lengths = [
    '0-15 min',
    '15-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
  ];
  const defaultTimes = [false, false, false, false, false];
  const newEditTime = defaultTimes;
  for (let i = 0; i < lengths.length; i++) {
    if (timeReq.includes(lengths[i])) {
      newEditTime[i] = true;
    }
  }
  const [editTime, setEditTime] = useState(newEditTime);

  // Game Supplies State Handler
  const [editSupplies, setEditSupplies] = useInput(suppliesReq.toString());

  // Game Setting State Hadler
  const settings = ['in-person', 'virtual'];
  const defaultSetting = [false, false];
  const newSetting = defaultSetting;
  for (let i = 0; i < settings.length; i++) {
    if (setting === settings[i]) {
      newSetting[i] = true;
    }
  }
  const [editSetting, setEditSetting] = useState(newSetting);

  const [editSetup, setEditSetup] = useInput(setup);
  const [editHowTo, setEditHowTo] = useInput(howToPlay);
  const [editTags, setEditTags] = useInput(tags.toString());

  // Make updates to game card
  const editGame = () => {
    // check if name is empty
    if (name === '') {
      // setNameError('required');
    } else {
      const _id = id;

      const name = editName;

      const forAges = [];
      for (let i = 0; i < audiences.length; i++) {
        if (editAges[i] === true) {
          forAges.push(audiences[i]);
        }
      }

      const forGroupSize = [];
      for (let i = 0; i < groups.length; i++) {
        if (editGroup[i] === true) {
          forGroupSize.push(groups[i]);
        }
      }

      const setupTimeArray = [];
      for (let i = 0; i < setupTimes.length; i++) {
        if (editSetupTime[i] === true) {
          setupTimeArray.push(setupTimes[i]);
        }
      }
      const setupTimeReq = setupTimeArray[0];

      const lengthArray = [];
      for (let i = 0; i < lengths.length; i++) {
        if (editTime[i] === true) {
          lengthArray.push(lengths[i]);
        }
      }
      const timeReq = lengthArray[0];

      const suppliesReq = editSupplies.split(',');

      const settingArray = [];
      for (let i = 0; i < settings.length; i++) {
        if (editSetting[i] === true) {
          settingArray.push(settings[i]);
        }
      }
      const setting = settingArray[0];

      const setup = editSetup;

      const howToPlay = editHowTo;

      const tags = editTags.split(',');

      const body = {
        _id,
        name,
        forAges,
        forGroupSize,
        setupTimeReq,
        timeReq,
        suppliesReq,
        setting,
        setup,
        howToPlay,
        tags,
        featured: false,
      };

      console.log('Edit Body: ', body);

      fetch('/api/editgame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          router.push('/');
        })
        .catch(err =>
          console.log('EditGame fetch /api/editgame: ERROR: ', err),
        );
    }
  };

  // ___________________________________________________________________________________________-

  const ageElements = forAges.map((age: string, i: number) => {
    return (
      <Chip
        size='small'
        icon={<FaceIcon color='disabled' />}
        key={age + i}
        label={age}
        id='chip'
        sx={{ mt: 0.5, mr: 0.5 }}
      />
    );
  });

  const groupElements = forGroupSize.map((group: string, i: number) => {
    return (
      <Chip
        size='small'
        icon={<Groups2RoundedIcon color='disabled' />}
        key={group + i}
        label={group}
        id='chip'
        sx={{ mt: 0.5, mr: 0.5 }}
      />
    );
  });

  const tagElements = tags.map((tag: string, i: number) => {
    return (
      <Chip size='small' key={tag + i} label={tag} id='chip' sx={{ mr: 0.5 }} />
    );
  });

  // -------------------------------------------------------------------------------------------

  // Audience Block
  const handleAudienceCheck = (e: any) => {
    const idx = e.target.value;
    const newAudienceSet = { ...editAges };
    if (newAudienceSet[idx]) delete newAudienceSet[idx];
    else newAudienceSet[idx] = true;
    setEditAges(newAudienceSet);
  };
  const audienceCheckboxes = audiences.map((audience, index) => {
    return (
      <Chip
        className='checkboxWithLabel'
        size='medium'
        icon={
          <Checkbox
            size='small'
            className='audienceCheckbox'
            style={{ color: 'white' }}
            value={index}
            checked={editAges[index]}
            onChange={handleAudienceCheck}
          />
        }
        key={audience + index}
        label={audience}
        id='chip'
      />
    );
  });

  // Group Size Block
  const handleGroupCheck = (e: any) => {
    const idx = e.target.value;
    const newGroupSet = { ...editGroup };
    if (newGroupSet[idx]) delete newGroupSet[idx];
    else newGroupSet[idx] = true;
    setEditGroup(newGroupSet);
  };
  const groupsCheckboxes = groups.map((group, index) => {
    return (
      <Chip
        size='medium'
        icon={
          <Checkbox
            size='small'
            className='groupsCheckbox'
            style={{ color: 'white' }}
            checked={editGroup[index]}
            value={index}
            onChange={handleGroupCheck}
          />
        }
        key={group + index}
        label={group}
        id='chip'
      />
    );
  });

  // Setup Time Block
  const handleSetupTimeCheck = (e: any) => {
    const idx = e.target.value;
    const newSetupTimeSet = { ...editSetupTime };
    if (newSetupTimeSet[idx]) delete newSetupTimeSet[idx];
    else newSetupTimeSet[idx] = true;
    setEditSetupTime(newSetupTimeSet);
  };
  const setupCheckboxes = setupTimes.map((time, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          className='setupTimeCheckbox'
          value={index}
          checked={editSetupTime[index]}
          onChange={handleSetupTimeCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  // Length Block
  const handleLengthCheck = (e: any) => {
    const idx = e.target.value;
    const newLengthSet = { ...editTime };
    if (newLengthSet[idx]) delete newLengthSet[idx];
    else newLengthSet[idx] = true;
    setEditTime(newLengthSet);
  };
  const lengthCheckboxes = lengths.map((time, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          className='lengthCheckbox'
          checked={editTime[index]}
          value={index}
          onChange={handleLengthCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  //Setting Block
  const handleSettingCheck = (e: any) => {
    const idx = e.target.value;
    const newSettingSet = [...editSetting];
    newSettingSet[idx] = !newSettingSet[idx];
    setEditSetting(newSettingSet);
  };
  const settingsCheckboxes = settings.map((settingVar, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Chip
          size='medium'
          icon={
            <Checkbox
              size='small'
              className='settingsCheckbox'
              value={index}
              checked={editSetting[index]}
              style={{ color: 'white' }}
              onChange={handleSettingCheck}
            />
          }
          key={setting + index}
          label={
            settingVar === 'in-person' ? (
              <Tooltip title='In-Person'>
                <PeopleAltRoundedIcon sx={{ mt: 0.25 }} />
              </Tooltip>
            ) : (
              <Tooltip title='Virtual'>
                <PhonelinkIcon sx={{ mt: 0.25 }} />
              </Tooltip>
            )
          }
          id='chip'
        />
      </div>
    );
  });

  // -------------------------------------------------------------------------------------------

  return (
    <div className='createGameCardContainer'>
      {!editing ? (
        // -------------------------- CARD VIEW --------------------------
        <Card
          className='detailCard'
          variant='outlined'
          sx={{
            borderRadius: '15px',
            boxShadow: 5,
            margin: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardHeader
            action={
              <div>
                <IconButton aria-label='settings'>
                  {setting === 'in-person' ? (
                    <Tooltip title='In-Person'>
                      <PeopleAltRoundedIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Virtual'>
                      <PhonelinkIcon />
                    </Tooltip>
                  )}
                </IconButton>

                {/* <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton> */}

                <IconButton aria-label='settings'>
                  <Tooltip title='Edit'>
                    <EditIcon onClick={() => setEditing(!editing)} />
                  </Tooltip>
                </IconButton>

                <IconButton aria-label='settings'>
                  <Tooltip title='Close'>
                    <CloseIcon onClick={() => router.push('/')} />
                  </Tooltip>
                </IconButton>
              </div>
            }
            title={<a className={poppins.className}>{name}</a>}
            subheader={
              <div>
                <div className='cardTimes'>
                  <Tooltip title='Set-Up Time Required'>
                    <BuildRoundedIcon sx={{ fontSize: 15 }} />
                  </Tooltip>{' '}
                  {setupTimeReq}{' '}
                  <Tooltip title='Time Required'>
                    <QueryBuilderRoundedIcon sx={{ fontSize: 15, mx: 0.5 }} />
                  </Tooltip>{' '}
                  {timeReq}
                </div>
                <div className='cardSetup'>
                  <p>Supplies: {!suppliesReq.length ? 'none' : suppliesReq}</p>
                  <p>Setup: {!setup ? 'none' : setup}</p>
                </div>
                <div>{ageElements}</div>
                <div>{groupElements}</div>
              </div>
            }
          />

          <Divider textAlign='left' sx={{ fontSize: '.9em', color: 'gray' }}>
            Rules
          </Divider>

          <CardContent
            sx={{
              color: 'gray',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <p color='gray'>{howToPlay}</p>
          </CardContent>
          <CardActions disableSpacing sx={{ mt: 'auto' }}>
            {/* <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton> */}
            <div>
              <Tooltip title='Tags'>
                <IconButton aria-label='tags'>
                  <LocalOfferIcon sx={{ mr: 1 }} />
                </IconButton>
              </Tooltip>
              {tagElements}
            </div>
          </CardActions>
        </Card>
      ) : (
        // -------------------------- EDITING VIEW --------------------------
        <Card
          className='createGameCardContainer'
          variant='outlined'
          sx={{
            borderRadius: '15px',
            boxShadow: 5,
            margin: 2,
            padding: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <CardHeader
            action={
              <div className='cardTimes'>
                <h3>Setting (Choose One):&nbsp;&nbsp;</h3>
                {settingsCheckboxes}
                {/* <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton> */}
                {/* <IconButton aria-label='edit'>
                  <Tooltip title='Edit'>
                    <EditIcon onClick={() => setEditing(!editing)} />
                  </Tooltip>
                </IconButton> */}
                <IconButton aria-label='close'>
                  <Tooltip title='Close'>
                    <CloseIcon onClick={() => router.push('/')} />
                  </Tooltip>
                </IconButton>
              </div>
            }
            titleTypographyProps={{
              fontFamily: 'Poppins',
              fontSize: '2em',
              fontWeight: '700',
            }}
            title=<a>Edit Game</a>
          />
          <CardContent>
            <div>
              <div>
                <div>
                  <TextField
                    id='textInput'
                    label='Game Name'
                    variant='outlined'
                    size='small'
                    fullWidth
                    value={editName}
                    onChange={setEditName}
                    required
                    sx={{ marginBottom: 2 }}
                  />
                </div>
                <div className='cardTimes'>
                  <Tooltip title='Set-Up Time Required'>
                    <BuildRoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                  </Tooltip>{' '}
                  <h3> Set-Up Time Required (Choose One): </h3>
                  <div className='cardTimes'>{setupCheckboxes}</div>
                </div>

                <div className='cardTimes'>
                  <Tooltip title='Time Required'>
                    <QueryBuilderRoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                  </Tooltip>{' '}
                  <h3> Time Required (Choose One): </h3>
                  <div id='lengths' className='cardTimes'>
                    {lengthCheckboxes}
                  </div>
                </div>
              </div>
              <TextField
                id='textInput'
                label='Supplies (i.e. rocks, papers, scissors)'
                variant='outlined'
                size='small'
                fullWidth
                value={editSupplies}
                onChange={setEditSupplies}
                sx={{ my: 1 }}
              />
              <TextField
                id='textInput'
                label='Set Up'
                variant='outlined'
                size='small'
                fullWidth
                value={editSetup}
                onChange={setEditSetup}
                sx={{ my: 1 }}
              />
              <div className='cardTimes'>
                <Tooltip title='Audience'>
                  <FaceIcon sx={{ fontSize: 20, mr: 1 }} />
                </Tooltip>{' '}
                <h3>Audience:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                {audienceCheckboxes}
              </div>
              <div className='cardTimes'>
                <Tooltip title='Group Size'>
                  <Groups2RoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                </Tooltip>{' '}
                <h3>Group Size:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                {groupsCheckboxes}
              </div>
            </div>
            <TextField
              id='outlined-multiline-flexible'
              label='How To Play'
              multiline
              minRows={3}
              value={editHowTo}
              onChange={setEditHowTo}
              fullWidth
              required
              sx={{ my: 1 }}
            />
            {/* <IconButton aria-label='tags'>
                <LocalOfferIcon />
              </IconButton> */}
            <TextField
              id='textInput'
              label='Tags (i.e. fun, active, casual)'
              variant='outlined'
              size='small'
              fullWidth
              value={editTags}
              onChange={setEditTags}
              sx={{ my: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <IconButton>
                      <LocalOfferIcon
                        sx={{ ml: -1.5, mr: -1.5, fontSize: 17 }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardActions disableSpacing sx={{ mt: 'auto' }}>
            {/* <IconButton aria-label='add to favorites'>
        <FavoriteIcon />
      </IconButton> */}
            {/* <IconButton aria-label='share'>
        <ShareIcon />
      </IconButton> */}
            {/* <IconButton aria-label='tags'>
        <LocalOfferIcon /> {tagElements}
      </IconButton> */}
            <Button
              id='createSubmit'
              variant='outlined'
              size='medium'
              onClick={() => {
                editGame();
              }}
              sx={{ m: 1 }}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}