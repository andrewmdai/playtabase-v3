import {
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  CardContent,
  CardActions,
  TextField,
  Checkbox,
  Button,
  InputAdornment,
} from '@mui/material';
import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import FaceIcon from '@mui/icons-material/Face';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import { Chip } from '@mui/material';

const GameCreator = props => {
  const navigate = useNavigate();
  const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    };
    return [value, onChange];
  };

  // States for Filter
  const [name, nameOnChange] = useInput('');
  const audiences = ['Children', 'Teenagers', 'Young Adults', 'Adults'];
  const [audienceSet, setAudienceSet] = useState([false, false, false, false]);
  const groups = ['under 10 people', '10-20 people', '20+ people'];
  const [groupSet, setGroupSet] = useState([false, false, false]);
  const setupTimes = [
    '0-15 min',
    '15-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
  ];
  const [setupTimeSet, setSetupTimeSet] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const lengths = [
    '0-15 min',
    '15-30 min',
    '30-45 min',
    '45-60 min',
    '60+ min',
  ];
  const [lengthSet, setLengthSet] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [supplies, suppliesOnChange] = useInput('');
  const [settingSet, setSettingSet] = useState({});
  const [setup, setupOnChange] = useInput('');
  const [howto, howtoOnChange] = useInput('');
  const [tagsInput, tagsOnChange] = useInput('');

  // Save Functionality
  const saveGame = () => {
    // check if name is empty
    if (name === '') {
      // setNameError('required');
    } else {
      // Converting States to MongoDB Schema Format
      const forAges = [];
      for (let i = 0; i < audienceSet.length; i++) {
        if (audienceSet[i] === true) {
          forAges.push(audiences[i]);
        }
      }

      const forGroupSize = [];
      for (let i = 0; i < groupSet.length; i++) {
        if (groupSet[i] === true) {
          forGroupSize.push(groups[i]);
        }
      }

      const setupTimeArray = [];
      for (let i = 0; i < setupTimeSet.length; i++) {
        if (setupTimeSet[i] === true) {
          setupTimeArray.push(setupTimes[i]);
        }
      }
      const setupTimeReq = setupTimeArray[0];

      const lengthArray = [];
      for (let i = 0; i < lengthSet.length; i++) {
        if (lengthSet[i] === true) {
          lengthArray.push(lengths[i]);
        }
      }
      const timeReq = lengthArray[0];

      const suppliesReq = supplies.split(',');

      const settingArray = [];
      for (const idx in settingSet) {
        settingArray.push(settings[idx]);
      }
      const setting = settingArray[0];

      const howToPlay = howto;

      const tags = tagsInput.split(',');

      const body = {
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

      fetch('/api/creategame', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body),
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('Data: ', data);
          window.location.reload();
        })
        .then(() => {
          props.history.push('/');
        })
        .catch(err =>
          console.log('CreateGame fetch /api/creategame: ERROR: ', err),
        );
      navigate('/');
    }
  };

  // Audience Block
  const handleAudienceCheck = e => {
    const idx = e.target.value;
    const newAudienceSet = audienceSet;
    if (newAudienceSet[idx]) newAudienceSet[idx] = false;
    else newAudienceSet[idx] = true;
    setAudienceSet(newAudienceSet);
  };
  const audienceCheckboxes = audiences.map((audience, index) => {
    return (
      <Chip
        size='medium'
        icon={
          <Checkbox
            size='small'
            style={{ color: 'white' }}
            value={index}
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
  const handleGroupCheck = e => {
    const idx = e.target.value;
    const newGroupSet = groupSet;
    if (newGroupSet[idx]) newGroupSet[idx] = false;
    else newGroupSet[idx] = true;
    setGroupSet(newGroupSet);
  };
  const groupsCheckboxes = groups.map((group, index) => {
    return (
      <Chip
        size='medium'
        icon={
          <Checkbox
            size='small'
            style={{ color: 'white' }}
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
  const handleSetupTimeCheck = e => {
    const idx = e.target.value;
    const newSetupTimeSet = setupTimeSet;
    if (newSetupTimeSet[idx]) newSetupTimeSet[idx] = false;
    else newSetupTimeSet[idx] = true;
    setSetupTimeSet(newSetupTimeSet);
  };
  const setupCheckboxes = setupTimes.map((time, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          className='setupTimeCheckbox'
          value={index}
          onChange={handleSetupTimeCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  // Length Block
  const handleLengthCheck = e => {
    const idx = e.target.value;
    const newLengthSet = lengthSet;
    if (newLengthSet[idx]) newLengthSet[idx] = false;
    else newLengthSet[idx] = true;
    setLengthSet(newLengthSet);
  };
  const lengthCheckboxes = lengths.map((time, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Checkbox
          size='small'
          className='lengthCheckbox'
          value={index}
          onChange={handleLengthCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  // Setting Block
  const handleSettingCheck = e => {
    const idx = e.target.value;
    const newSettingSet = settingSet;
    if (newSettingSet[idx]) newSettingSet[idx] = false;
    else newSettingSet[idx] = true;
    setSettingSet(newSettingSet);
  };
  const settings = ['in-person', 'virtual'];
  const settingsCheckboxes = settings.map((setting, index) => {
    return (
      <div key={index} className='horizontalBoxes'>
        <Chip
          size='medium'
          icon={
            <Checkbox
              size='small'
              className='settingsCheckbox'
              value={index}
              checked={settingSet[index]}
              style={{ color: 'white' }}
              onChange={handleSettingCheck}
            />
          }
          key={setting + index}
          label={
            setting === 'in-person' ? (
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

  return (
    <div className='createGameCardContainer' style={{ marginRight: 35 }}>
      <Card
        className='createGameCard'
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
            <div className='cardTimes'>
              <h3>Setting (Choose One): </h3>{' '}
              {settingsCheckboxes}
              {/* <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton> */}
              {/* <IconButton aria-label='edit'>
                <Tooltip title='Edit'>
                  <EditIcon />
                </Tooltip>
              </IconButton> */}
              <IconButton aria-label='close'>
                <Tooltip title='Close'>
                  <CloseIcon onClick={() => navigate('/')} />
                </Tooltip>
              </IconButton>
            </div>
          }
          title=<strong>Create a Game</strong>
          subheader={
            <div>
              <div>
                <div>
                  <TextField
                    id='textInput'
                    label='Game Name'
                    variant='outlined'
                    size='small'
                    value={name}
                    onChange={nameOnChange}
                    required
                    sx={{ width: 850, mb: 1, mt: 1 }}
                  />
                </div>
                <div className='cardTimes'>
                  <Tooltip title='Set-Up Time Required'>
                    <BuildRoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                  </Tooltip>{' '}
                  <h3 color='black'> Set-up Time Required (Choose One): </h3>
                  <div id='setupTimes' className='cardTimes'>
                    {setupCheckboxes}
                  </div>
                </div>
                <div className='cardTimes'>
                  <Tooltip title='Time Required'>
                    <QueryBuilderRoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                  </Tooltip>
                  <h3> Time Required (Choose One): </h3>
                  <div id='lengths' className='cardTimes'>
                    {lengthCheckboxes}
                  </div>
                </div>
              </div>
              <Typography variant='body2' color='text.secondary'>
                <TextField
                  id='textInput'
                  label='Supplies (i.e. rocks, papers, scissors)'
                  variant='outlined'
                  size='small'
                  value={supplies}
                  onChange={suppliesOnChange}
                  sx={{ width: 850, my: 1 }}
                />
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <TextField
                  id='textInput'
                  label='Set Up'
                  variant='outlined'
                  size='small'
                  value={setup}
                  onChange={setupOnChange}
                  sx={{ width: 850, my: 1 }}
                />
              </Typography>
              <div className='horizontalBoxes'>
                <Tooltip title='Audience'>
                  <FaceIcon sx={{ fontSize: 20, mr: 1 }} />
                </Tooltip>{' '}
                <h3>Audience: </h3>
                {audienceCheckboxes}
              </div>
              <div className='horizontalBoxes'>
                <Tooltip title='Group Size'>
                  <Groups2RoundedIcon sx={{ fontSize: 20, mr: 1 }} />
                </Tooltip>{' '}
                <h3>
                  Group Size:{' '}
                </h3>
                {groupsCheckboxes}
              </div>
            </div>
          }
        />
        <Divider />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            <TextField
              id='outlined-multiline-flexible'
              label='How To Play'
              multiline
              minRows={8}
              value={howto}
              onChange={howtoOnChange}
              fullWidth
              required
            />
          </Typography>
          <div style={{ marginTop: 20 }}>
            {/* <IconButton aria-label='tags'>
              <LocalOfferIcon />
            </IconButton> */}
            <TextField
              id='textInput'
              label='Tags (i.e. fun, active, casual)'
              variant='outlined'
              size='small'
              value={tagsInput}
              onChange={tagsOnChange}
              sx={{ width: 850 }}
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
          </div>
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
            onClick={() => saveGame()}
            sx={{ m: 1 }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default GameCreator;
