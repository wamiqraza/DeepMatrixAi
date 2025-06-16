import React from 'react';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Banner from '../components/Banner';
import Marqee from '../components/Marqee';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Marqee/>
            <AboutUs />
            <Services />
            <BlogSection />
            <Contact />
        </div>
    );
};

export default Home;