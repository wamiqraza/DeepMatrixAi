import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../components/Banner'
import Header from '../components/Header';
import Marqee from '../components/Marqee';
import Footer from '../components/Footer';

const ServiceDetail = () => {

  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/${slug}`);
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service details:", err);
      }
    };
    fetchService();
  }, [slug]);

  if (!service) return <div className="p-10">Loading...</div>;


  return (
    <div>
      <Header />
      <Banner/>
      <Marqee/>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-6">{service.title}</h1>

        {service.imageFile && (
          <img
            src={`http://localhost:5000${service.imageFile}`}
            alt={service.title}
            className="w-full h-auto rounded-lg mb-6"
          />
        )}


        <div
          className="text-gray-700 text-md leading-relaxed"
          dangerouslySetInnerHTML={{ __html: service.detailDescription }}
        />
      </div>
      <Footer/>
    </div>
  )
}

export default ServiceDetail