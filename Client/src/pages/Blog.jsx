import BlogSection from '../components/BlogSection';
import Banner from '../components/Banner';
import Marqee from '../components/Marqee'
import Header from '../components/Header';
import Footer from '../components/Footer';

const Blog = () => {
    return (
        <div>
            <Header />
            <Banner/>
            <Marqee/>
            <BlogSection />
            <Footer />
        </div>
    );
};

export default Blog;