import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../components/Banner'
import Header from '../components/Header';
import Marqee from '../components/Marqee';
import Footer from '../components/Footer';

const BlogDetail = () => {

  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) return <div className="p-10">Loading...</div>;


  return (
    <div>
      <Header />
      <Banner/>
      <Marqee/>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

        {blog.imageFile && (
          <img
            src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}${blog.imageFile}`}
            alt={blog.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}


        <div
          className="text-gray-700 text-md leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <Footer/>
    </div>
  )
}

export default BlogDetail