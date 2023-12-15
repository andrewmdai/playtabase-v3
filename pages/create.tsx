import {
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  CardContent,
  CardActions,
  TextField,
  Checkbox,
  Button,
  InputAdornment,
} from '@mui/material';
import { Chip } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FaceIcon from '@mui/icons-material/Face';
import CloseIcon from '@mui/icons-material/Close';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

const Create = (props: any) => {
  const router = useRouter();

  const useInput = (init: any) => {
    const [value, setValue] = useState(init);
    const onChange = (e: any) => {
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
  const [settingSet, setSettingSet] = useState([false, false]);

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
      for (let i = 0; i < settings.length; i++) {
        if (settingSet[i] === true) {
          settingArray.push(settings[i]);
        }
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
      router.push('/');
    }
  };

  // Audience Block
  const handleAudienceCheck = (e: any) => {
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
            style={{ color: 'white', marginRight: '-1.5em' }}
            value={index}
            onChange={handleAudienceCheck}
          />
        }
        key={audience + index}
        label={audience}
        id='createChip'
        sx={{
          '& .MuiChip-label': {
            fontSize: '1.1em',
          },
          my: 0.5,
        }}
      />
    );
  });

  // Group Size Block
  const handleGroupCheck = (e: any) => {
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
            style={{ color: 'white', marginRight: '-1.5em' }}
            value={index}
            onChange={handleGroupCheck}
          />
        }
        key={group + index}
        label={group}
        id='groupChip'
        sx={{
          '& .MuiChip-label': {
            fontSize: '1.1em',
          },
          my: 0.5,
        }}
      />
    );
  });

  // Setup Time Block
  const handleSetupTimeCheck = (e: any) => {
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
          value={index}
          onChange={handleSetupTimeCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  // Length Block
  const handleLengthCheck = (e: any) => {
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
          value={index}
          onChange={handleLengthCheck}
        />
        <h4 className='checkboxLabel'>{time}</h4>
      </div>
    );
  });

  // Setting Block
  const handleSettingCheck = (e: any) => {
    const idx = e.target.value;
    const newSettingSet = [...settingSet];
    newSettingSet[idx] = !newSettingSet[idx];
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
                <PeopleAltRoundedIcon
                  sx={{ verticalAlign: 'middle', marginLeft: '-0.25em' }}
                />
              </Tooltip>
            ) : (
              <Tooltip title='Virtual'>
                <PhonelinkIcon
                  sx={{ verticalAlign: 'middle', marginLeft: '-0.25em' }}
                />
              </Tooltip>
            )
          }
          id='createChip'
        />
      </div>
    );
  });

  return (
    <div className='gameCardContainer2'>
    <Card
      variant='outlined'
      sx={{
        borderRadius: '15px',
        boxShadow: 5,
        margin: 2,
        padding: 2,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <CardHeader
        action={
          <div className='cardTimes' style={{ marginTop: '0.35em' }}>
            <h3>Setting (Choose One):&nbsp;&nbsp;</h3> {settingsCheckboxes}
            <IconButton aria-label='close' sx={{ marginLeft: '0.25em' }}>
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
        title=<a>Create a Game</a>
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
                value={name}
                onChange={nameOnChange}
                required
                sx={{ marginBottom: 2 }}
              />
            </div>
            <div className='cardTimes'>
              <Tooltip title='Set-Up Time Required'>
                <BuildRoundedIcon sx={{ fontSize: 20, mr: 1 }} />
              </Tooltip>{' '}
              <h3 color='black'> Set-up Time Required (Choose One): </h3>
              <div className='cardTimes'>{setupCheckboxes}</div>
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
          <TextField
            id='textInput'
            label='Supplies (i.e. rocks, papers, scissors)'
            variant='outlined'
            size='small'
            fullWidth
            value={supplies}
            onChange={suppliesOnChange}
            sx={{ my: 1 }}
          />
          <TextField
            id='textInput'
            label='Set Up'
            variant='outlined'
            size='small'
            fullWidth
            value={setup}
            onChange={setupOnChange}
            sx={{ my: 1 }}
          />
          <div className='cardTimes'>
            <Tooltip title='Audience'>
              <FaceIcon sx={{ fontSize: 20, mr: 1 }} />
            </Tooltip>{' '}
            <h3>Audience:&nbsp;&nbsp;</h3>
            {audienceCheckboxes}
          </div>
          <div className='cardTimes'>
            <Tooltip title='Group Size'>
              <Groups2RoundedIcon sx={{ fontSize: 20, mr: 1 }} />
            </Tooltip>{' '}
            <h3>Group Size:&nbsp;&nbsp;</h3>
            {groupsCheckboxes}
          </div>
        </div>

        <TextField
          id='outlined-multiline-flexible'
          label='How To Play'
          multiline
          minRows={3}
          value={howto}
          onChange={howtoOnChange}
          fullWidth
          required
          sx={{ my: 1 }}
        />
        <TextField
          id='textInput'
          label='Tags (i.e. fun, active, casual)'
          variant='outlined'
          size='small'
          fullWidth
          value={tagsInput}
          onChange={tagsOnChange}
          sx={{ my: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <IconButton>
                  <LocalOfferIcon sx={{ ml: -1.5, mr: -1.5, fontSize: 17 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
      <CardActions disableSpacing sx={{ mt: 'auto' }}>
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

export default Create;
