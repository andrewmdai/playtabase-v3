import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
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
import { Chip, Divider, Tooltip } from '@mui/material';
import Link from 'next/link';

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

  // const navigate = useNavigate();

  const ageElements = forAges.map((age: string, i: number) => {
    return (
      <Chip
        size='small'
        icon={<FaceIcon color='disabled' />}
        key={age + i}
        // label={getAgeLabel(age)}
        label={age}
        id='chip'
        // sx={{ mt: 0.5, mr: 0.5 }}
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
        icon={<Groups2RoundedIcon color='disabled' />}
        key={group + i}
        // label={group}
        label={getGroupLabel(group)}
        id='chip'
        // sx={{ mt: 0.5, mr: 0.5 }}
      />
    );
  });

  const tagElements = tags.map((tag: string, i: number) => {
    if (tag) {
      return (
        <Chip
          size='small'
          key={tag + i}
          label={tag}
          id='chip'
          // sx={{ mr: 0.5 }}
        />
      );
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
          // minWidth: 400,
          maxHeight: 600,
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
            </div>
          }
          title={<Link href={`/games/${_id}`}>{name}</Link>}
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
              {/* <Divider textAlign="left" sx={{fontSize: '.6em', color: 'gray'}}>Audience</Divider> */}

              <div>{ageElements}</div>
              {/* <Divider textAlign="left" sx={{fontSize: '.6em', color: 'gray'}}>Group Size</Divider> */}

              <div>{groupElements}</div>
            </div>
          }
        />

        <Divider />

        <CardContent
          sx={{
            color: 'gray',
            // maxHeight: 200,
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
    </div>
  );
};

export default GameCard;
