import React from 'react';

const BlogCard = ({ title, description, image, time }) => {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="bg-white bg-cover bg-center rounded-lg overflow-hidden shadow-md flex flex-col justify-between min-h-100">
      <div className="image-wrapper relative">
        {/* <img src={`${image}`} alt={title} className="w-full h-auto rounded-lg" /> */}
        <span className="time absolute top-2 right-2 bg-black text-white py-1 px-2 rounded-full text-sm">{time}</span>
      </div>
      <div className='bg-gradient-to-b from-gray-700/2 to-black p-6 pt-14'>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white text-sm mt-2">{description}</p>
        <button className='bg-white text-black mt-5 px-6 py-1 rounded-full cursor-pointer'>Read Now</button>
      </div>
    </div>
  );
};

export default BlogCard;