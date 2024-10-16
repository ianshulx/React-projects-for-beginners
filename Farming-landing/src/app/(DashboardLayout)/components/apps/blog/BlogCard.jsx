// third-party
import { format } from 'date-fns';
import NextLink  from 'next/link';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import { fetchBlogPost } from '@/store/apps/blog/BlogSlice';
import BlankCard from '../../shared/BlankCard';


const BlogCard = ({ post }) => {
  const dispatch = useDispatch();
  const { coverImg, title, view, comments, category, author, createdAt } = post;

  const linkTo = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');

  return (
    <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch">
      <BlankCard className="hoverCard">
        <>
          <Typography
            component={NextLink}
            href={`/apps/blog/detail/${linkTo}`}
            onClick={() => dispatch(fetchBlogPost(linkTo))}
          >
            <CardMedia component="img" height="240" image={coverImg} alt="green iguana" />
          </Typography>
          <CardContent>
            <Stack direction="row" sx={{ marginTop: '-45px' }}>
              <Tooltip title={author?.name} placement="top">
                <Avatar aria-label="recipe" src={author?.avatar}></Avatar>
              </Tooltip>
              <Chip
                sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: 'white' }}
                label="2 min Read"
                size="small"
              ></Chip>
            </Stack>
            <Chip label={category} size="small" sx={{ marginTop: 2 }}></Chip>
            <Box my={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="inherit"
                sx={{ textDecoration: 'none' }}
                component={NextLink}
                href={`/apps/blog/detail/${linkTo}`}
                onClick={() => dispatch(fetchBlogPost(linkTo))}
              >
                {title}
              </Typography>
            </Box>
            <Stack direction="row" gap={3} alignItems="center">
              <Stack direction="row" gap={1} alignItems="center">
                <IconEye size="18" /> {view}
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <IconMessage2 size="18" /> {comments?.length}
              </Stack>

              <Stack direction="row" ml="auto" alignItems="center">
                <IconPoint size="16" />
                <small>{format(new Date(createdAt), 'E, MMM d')}</small>
              </Stack>
            </Stack>
          </CardContent>
        </>
      </BlankCard>
    </Grid>
  );
};

export default BlogCard;
