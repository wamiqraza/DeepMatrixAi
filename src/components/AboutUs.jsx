import React from 'react';
import aboutus from '../assets/images/about-us.png'; // Ensure you have the correct path to your image
import aboutstar from '../assets/images/about-star.png'; // Ensure you have the correct path to your image

const AboutUs = () => {
    return (
        <div className="about-main container flex justify-center items-center gap-12 mt-24 px-20">
            <div className='w-1/2'>
                <img src={aboutus} alt="about main" className="w-[500px]" />
            </div>
            <div className="w-1/2">
                <div className="flex flex-col items-start justify-between h-full">
                    <img src={aboutstar} alt="about star" className="ml-30" />
                    <h3 className="font-medium text-3xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">About Us</h3>
                </div>

                <h1 className="font-bold text-5xl text-gray-800 mt-4 mb-6">AI developers are the future of technology</h1>
                <p className="text-sm text-gray-800">
                    Our dedicated team of AI experts, data scientists, and engineers collaborates to solve complex problems and deliver cutting-edge applications that automate processes and provide profound insights. We are committed to continuous learning, ethical AI practices, and maintaining the highest standards of quality in our work. Whether you seek to leverage AI to enhance your business or wish to join a dynamic team passionate about making a difference, we are here to lead the way. Join us in shaping a smarter, more connected world.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;