import Link from 'next/link';
import Card from '@mui/material/Card';
import { Poppins } from 'next/font/google';
import FaceIcon from '@mui/icons-material/Face';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Chip, Divider, Tooltip } from '@mui/material';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600'],
});

type Info = {
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
};

interface GameCardProps {
  info: Info;
}

const GameCard: React.FC<GameCardProps> = ({ info }) => {
  const {
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
    featured,
  } = info;

  const ageElements = forAges.map((age: string, i: number) => {
    return (
      <Chip
        size='small'
        icon={<FaceIcon color='inherit' />}
        key={age + i}
        label={age}
        id='chip'
      />
    );
  });

  const getGroupLabel = (group: string) => {
    if (group === 'under 10 people') {
      return '< 10';
    } else if (group === '10-20 people') {
      return '10-20';
    } else {
      return '20+';
    }
  };

  const groupElements = forGroupSize.map((group: string, i: number) => {
    return (
      <Chip
        size='small'
        avatar={
          <span
            style={{ color: 'white', display: 'flex', alignItems: 'center' }}
          >
            <Groups2RoundedIcon
              style={{
                marginLeft: '0.3em',
                marginRight: '0.3em',
                fontSize: '1.5em',
              }}
            />
          </span>
        }
        key={group + i}
        label={getGroupLabel(group)}
        id='groupChip'
      />
    );
  });

  const tagElements = tags.map((tag: string, i: number) => {
    if (tag) {
      return <Chip size='small' key={tag + i} label={tag} id='tagChip' />;
    }
  });

  return (
    <div className='cardStyle'>
      <Card
        variant='outlined'
        sx={{
          borderRadius: '15px',
          boxShadow: 5,
          margin: 2,
          height: '55vh',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 600,
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
            </div>
          }
          title={
            <Link href={`/${_id}`} className={poppins.className}>
              {name}
            </Link>
          }
          subheader={
            //   <div>
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
          }
        />
        <div className='cardContent'>
          <div className='cardSetup'>
            <p>Supplies: {!suppliesReq.length ? 'none' : suppliesReq}</p>
            <p>Setup: {!setup ? 'none' : setup}</p>
          </div>
          <div>{ageElements}</div>
          <div>{groupElements}</div>
        </div>

        <Divider sx={{ my: '1em' }} />

        <CardContent
          sx={{
            color: 'gray',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <p color='gray'>{howToPlay}</p>
        </CardContent>

        <CardActions disableSpacing sx={{ flexGrow: 1, alignItems: 'end' }}>
          <div>
            <Tooltip title='Tags'>
              <IconButton aria-label='tags'>
                <LocalOfferIcon />
              </IconButton>
            </Tooltip>
            {tagElements}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default GameCard;
