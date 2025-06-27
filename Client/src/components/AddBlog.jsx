import { useState, useEffect, useRef } from "react";
import axios from "axios";
import JoditEditor from 'jodit-react';
import DashHeader from "./DashHeader";

const AddBlog = ({ editingBlogId, onBackToBlogs }) => {
  
  const isEditMode = Boolean(editingBlogId);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null
  });

  const [existingFiles, setExistingFiles] = useState({imageUrl: ""});

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch service data when in edit mode
  useEffect(() => {
    if (isEditMode && editingBlogId) {
      fetchBlogData();
    } else {
      resetForm();
    }
  }, [editingBlogId, isEditMode]);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      imageFile: null
    });
    setContent('');
    setExistingFiles({
      imageUrl: ""
    });
  };

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/blogs/by-id/${editingBlogId}`);
      const service = response.data;
      
      setFormData({
        title: service.title || "",
        content: service.content || "",
        imageFile: null
      });

      setContent(service.content || "");
      
      setExistingFiles({
        imageUrl: service.imageFile || ""
      });

    } catch (error) {
      console.error("Error fetching service:", error);
      alert("Failed to load service data");
    } finally {
      setLoading(false);
    }
  };

  // Sync Jodit editor content with formData.content
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));  
  }, [content]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }

    try {
      let response;
      if (isEditMode) {
          response = await axios.put(`http://localhost:5000/api/blogs/${editingBlogId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog updated successfully!");
      } else {
          response = await axios.post("http://localhost:5000/api/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog added successfully!");
      }
      
      resetForm();

      if (isEditMode && onBackToBlogs) {
        onBackToBlogs();
      }
      
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} blog:`, error.response?.data || error.message);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} blog. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
        <DashHeader title="Loading..." />
        <div className="flex justify-center items-center flex-1">
          <div className="text-gray-600">Loading blog data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
      <DashHeader title={isEditMode ? "Edit Blog" : "Add new Blog"} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 pb-10" encType="multipart/form-data">
        
        <div>
          <label htmlFor="Blog Title">Blog Title: </label>
          <input
            type="text"
            placeholder="The Evolution Of Natural Language.."
            className="w-full h-10 p-6 border mt-2 border-gray-500 focus:outline-purple-600 rounded-md"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="Blog Description">Blog Description: </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)} 
            className="mt-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Upload Blog Cover Image: </label>
          {isEditMode && existingFiles.imageUrl && (
            <div className="mb-2">
              <span className="text-sm text-gray-600">Current image:</span>
              <img 
                src={`http://localhost:5000${existingFiles.imageUrl}`} 
                alt="Current image" 
                className="w-32 h-20 object-cover border rounded mt-1"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setFormData({ ...formData, imageFile: e.target.files[0] })}
            className="border border-gray-400 mt-2 rounded-lg p-2 w-100"
            required={!isEditMode}
          />
          {isEditMode && <span className="text-sm text-gray-500 mt-1">Leave empty to keep current image</span>}
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isEditMode ? 'Update Blog' : 'Add Blog')}
          </button>
          
          {isEditMode && onBackToBlogs && (
            <button 
              type="button" 
              onClick={onBackToBlogs}
              className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBlog;