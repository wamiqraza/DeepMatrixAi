import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, SquarePen } from 'lucide-react';
import DashHeader from './DashHeader';

const ViewServices = ({ onEditService }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get('${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/services');
      setServices(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/services/${id}`);
      setServices(services.filter(service => service._id !== id));
      alert('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  const handleEditService = (id) => {
    // Call the parent function to handle editing
    if (onEditService) {
      onEditService(id);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
        <DashHeader title="View Services" />
        <div className="flex justify-center items-center flex-1">
          <div className="text-gray-600">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
      <DashHeader title="View Services" />
      
      <div className='flex justify-between mx-6 border-b border-gray-700 pb-2 text-black'>
        <span>No.&nbsp; Service Name</span>
        <span>Actions</span>
      </div>
      
      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <span className="text-gray-500 mb-4">No services added yet</span>
        </div>
      ) : (
        <div className="mx-6">
          {services.map((service, idx) => (
            <div key={service._id} className="flex justify-between items-center mb-3 border-b border-gray-400 pb-2">
              <div className="flex items-center flex-1">
                <div className="w-8 text-gray-500">{idx + 1}.</div>
                <div className="flex-1 font-light text-gray-600">{service.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditService(service._id)} 
                  className="text-green-600 hover:text-green-800 cursor-pointer p-1 rounded"
                  title="Edit Service"
                >
                  <SquarePen size={20} />
                </button>
                <button 
                  onClick={() => deleteService(service._id)}  
                  className="text-red-600 hover:text-red-800 cursor-pointer p-1 rounded"
                  title="Delete Service"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewServices;