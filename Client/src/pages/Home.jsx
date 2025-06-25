import React from 'react';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Banner from '../components/Banner';
import Marqee from '../components/Marqee';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Marqee/>
            <AboutUs />
            <Services />
            <BlogSection />
            <Contact />
            <Footer/>
        </div>
    );
};

export default Home;