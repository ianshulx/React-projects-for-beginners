import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// import alpha from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import { format } from 'date-fns';
import { fetchBlogPost } from '@/store/apps/blog/BlogSlice';
import BlankCard from '../../shared/BlankCard';

const CoverImgStyle = styled(CardContent)({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 1,
  width: '100%',
  height: '100%',
  color: 'white',
});
const CoverBox = styled(Box)({
  top: 0,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
});

const BlogFeaturedCard = ({ post, index }) => {
  const dispatch = useDispatch();
  const { coverImg, title, view, comments, category, author, createdAt } = post;
  const linkTo = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  const mainPost = index === 0;

  const CoverImgBg = styled(BlankCard)({
    p: 0,
    height: '400px',
    position: 'relative',
    background: `url(${coverImg}) no-repeat center`,
    backgroundSize: 'cover',
  });

  return (
    <>
      {post ? (
        <Grid
          item
          xs={12}
          lg={mainPost ? 8 : 4}
          md={12}
          sm={12}
          display="flex"
          alignItems="stretch"
        >
          <CoverImgBg className="hoverCard">
            <>
              <Typography
                component={Link}
                href={`/apps/blog/detail/${linkTo}`}
                onClick={() => dispatch(fetchBlogPost(linkTo))}
              >
                <CoverBox
                  sx={{ backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6) }}
                />
              </Typography>
              <CoverImgStyle>
                <Box
                  height={'100%'}
                  display={'flex'}
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <Box>
                    <Stack direction="row">
                      <Tooltip title={author?.name} placement="top">
                        <Avatar aria-label="recipe" src={author?.avatar}></Avatar>
                      </Tooltip>
                      <Chip
                        sx={{ marginLeft: 'auto' }}
                        label={category}
                        size="small"
                        color="primary"
                      ></Chip>
                    </Stack>
                  </Box>
                  <Box>
                    <Box my={3}>
                      <Typography
                        gutterBottom
                        variant="h3"
                        color="inherit"
                        sx={{ textDecoration: 'none' }}
                        component={Link}
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
                  </Box>
                </Box>
              </CoverImgStyle>
            </>
          </CoverImgBg>
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};

export default BlogFeaturedCard;
