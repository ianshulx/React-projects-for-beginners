import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import BlogCard from './BlogCard';
import { orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogPosts } from '@/store/apps/blog/BlogSlice';
import BlogFeaturedCard from './BlogFeaturedCard';

const BlogListing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  
  const filterBlogs = (posts, sortBy, _cSearch) => {
    // SORT BY

    if (sortBy === 'newest') {
      posts = orderBy(posts, ['createdAt'], ['desc']);
    }
    if (sortBy === 'oldest') {
      posts = orderBy(posts, ['createdAt'], ['asc']);
    }
    if (sortBy === 'popular') {
      posts = orderBy(posts, ['view'], ['desc']);
    }
    if (posts) {
      return (posts = posts.filter((t) => t.featured === false));
    }

    return posts;
  };

  const filterFeaturedpost = (posts) => {
    return (posts = posts.filter((t) => t.featured));
  }; 

  const blogPosts = useSelector((state) =>
    filterBlogs(
      state.blogReducer.blogposts,
      state.blogReducer.sortBy,
      state.blogReducer.blogSearch,
    ),
  );
  const featuredPost = useSelector((state) => filterFeaturedpost(state.blogReducer.blogposts));

  return (
    <Grid container spacing={3}>
      {featuredPost.map((post, index) => {
        return <BlogFeaturedCard index={index} post={post} key={post.title} />;
      })}
      {blogPosts.map((post) => {
        return <BlogCard post={post} key={post.id} />;
      })}
      <Grid item lg={12} sm={12} mt={3}>
        <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
      </Grid>
    </Grid>
  );
};

export default BlogListing;
