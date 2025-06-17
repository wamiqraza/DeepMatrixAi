import React from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import blog1 from '../assets/images/blog1.png'
import blog2 from '../assets/images/blog2.png'
import blog3 from '../assets/images/blog3.png'


const BlogSection = () => {

  const blogs = [
    {
      title: 'Demystifying Deep Learning Networks',
      description:
        'Delve into the world of deep learning as we unravel the complexities of neural networks. In this blog...',
      image: blog1,
      time: '7 Min Added',
    },
    {
      title: 'The Evolution Of Natural Language Processing',
      description:
        'Join us on a journey through the evolution of natural language processing (NLP) as we trace its development.',
      image: blog2,
      time: '7 Min Added',
    },
    {
      title: 'Unleashing The Power Of Computer Vision',
      description:
        'Unlock the potential of computer vision as we explore its applications and discuss emerging that are shaping its future.',
      image: blog3,
      time: '7 Min Added',
    },
  ];

  return (

    <section className="lg:mt-24 mt-18 lg:px-20 px-6">

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto py-10">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              time={blog.time}
            />
          ))}
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