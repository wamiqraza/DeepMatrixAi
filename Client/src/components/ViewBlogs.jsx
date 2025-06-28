import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, SquarePen } from 'lucide-react';
import DashHeader from './DashHeader';

const ViewBlogs = ({ onEditBlog }) => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

    const deleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
        return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  const handleEditBlog = (id) => {
    if (onEditBlog) {
      onEditBlog(id);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
        <DashHeader title="View Blogs" />
        <div className="flex justify-center items-center flex-1">
          <div className="text-gray-600">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
      <DashHeader title="View Blogs" />
      
      <div className='flex justify-between mx-6 border-b border-gray-700 pb-2 text-black'>
        <span>No.&nbsp; Blog Name</span>
        <span>Actions</span>
      </div>
      
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <span className="text-gray-500 mb-4">No blog added yet</span>
        </div>
      ) : (
        <div className="mx-6">
          {blogs.map((blog, idx) => (
            <div key={blog._id} className="flex justify-between items-center mb-3 border-b border-gray-400 pb-2">
              <div className="flex items-center flex-1">
                <div className="w-8 text-gray-500">{idx + 1}.</div>
                <div className="flex-1 font-light text-gray-600">{blog.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEditBlog(blog._id)} 
                  className="text-green-600 hover:text-green-800 cursor-pointer p-1 rounded"
                  title="Edit Service"
                >
                  <SquarePen size={20} />
                </button>
                <button 
                  onClick={() => deleteBlog(blog._id)}  
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

export default ViewBlogs;