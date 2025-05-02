// BlogRouter.js
import { Routes, Route } from 'react-router-dom';
import BlogGallery from './BlogGallery';
import BlogPost from './BlogPost';

const BlogRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogGallery />} />
      <Route path="/:id" element={<BlogPost />} /> {/* This must match your links */}
    </Routes>
  );
};

export default BlogRouter;