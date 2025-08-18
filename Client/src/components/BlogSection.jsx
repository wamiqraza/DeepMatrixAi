import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogSection = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/blogs`);
      setBlogs(res.data);
    };
    fetchBlogs();
  }, []);

  return (

    <section className="lg:mt-24 mt-18 lg:px-20 px-6 mb-12">

      <div className="flex lg:flex-row flex-col items-center justify-between">
          <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Blog about <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Developement</span>
            </h2>
            <p className="text-sm">
              Explore the latest insights, trends, and developments in artificial
              intelligence with our informative and engaging blogs. Our team of AI
              experts regularly publishes articles on various topics.
            </p>
          </div>
          <button className='hidden lg:block bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full hover:from-[#A55EEA] hover:to-[#648DFD] transition duration-300 ease-in-out'>
            <Link to="/blog">
              Explore Now!
            </Link>
          </button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-10">
            {blogs.map((blog, index) => {

              const plainText = blog.content?.replace(/<[^>]+>/g, '');
              const trimmedText = plainText?.split(' ').slice(0, 15).join(' ') + '...';

              return (
                <div key={blog._id || index} style={{ backgroundImage: `url(${blog.coverImage})` }} className="bg-white bg-cover bg-center rounded-lg overflow-hidden shadow-md flex flex-col justify-between min-h-100">
                  <div className="relative">
                    <span className="time absolute top-2 right-2 bg-black text-white py-1 px-2 rounded-full text-sm">5 min read</span>
                  </div>
                  <div className="bg-gradient-to-b from-gray-700/2 to-black p-4 lg:p-6 pt-14">
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <p className="text-gray-200 text-sm mb-4 leading-relaxed">{trimmedText}</p>
                    <Link to={`/blogs/${blog.slug}`} className="bg-white text-black mt-5 px-6 py-1 rounded-full cursor-pointer">
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          <button className='lg:hidden block bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full hover:from-[#A55EEA] hover:to-[#648DFD] transition duration-300 ease-in-out'>
            <Link to="/blog">
              Explore Now!
            </Link>
          </button>
      </div>

    </section>
  );
};

export default BlogSection;