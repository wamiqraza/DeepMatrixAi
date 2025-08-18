import servicesStar  from '../assets/images/services-star.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Services = () => {


  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/services`);
      setServices(res.data);
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 lg:px-20 px-6 bg-gray-50 min-h-screen lg:mt-24 mt-18">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <img src={servicesStar} alt="services" className='w-55'/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className='group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-600 hover:text-white'>
              <div className='w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 bg-[var(--primary-color)] group-hover:bg-white/9 group-hover:text-[var(--primary-color)] group-hover:shadow-lg'>
                <img src={`${service.iconFile}`} alt={service.title} className="w-8 h-8 object-contain transition-all duration-500" />
              </div>
              <div className="space-y-4">
                <h3 className='text-xl font-bold'>{service.title}</h3>
                <p className='text-sm leading-relaxed'>{service.description}</p>
                <Link to={`/services/${service.slug}`} className='text-sm text-[var(--primary-color)] font-semibold hover:underline group-hover:text-white cursor-pointer'>Read More</Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-600/0 group-hover:from-purple-500 group-hover:to-blue-600 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-purple-400/20 to-blue-500/20 blur-xl -z-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
