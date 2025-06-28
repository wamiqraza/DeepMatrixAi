import { useState, useEffect, useRef } from "react";
import axios from "axios";
import JoditEditor from 'jodit-react';
import DashHeader from "./DashHeader";

const AddService = ({ editingServiceId, onBackToServices }) => {
  
  const isEditMode = Boolean(editingServiceId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailDescription: "",
    iconFile: null,
    imageFile: null
  });

  const [existingFiles, setExistingFiles] = useState({
    iconUrl: "",
    imageUrl: ""
  });

  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch service data when in edit mode
  useEffect(() => {
    if (isEditMode && editingServiceId) {
      fetchServiceData();
    } else {
      // Reset form when switching to add mode
      resetForm();
    }
  }, [editingServiceId, isEditMode]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      detailDescription: "",
      iconFile: null,
      imageFile: null
    });
    setContent('');
    setExistingFiles({
      iconUrl: "",
      imageUrl: ""
    });
  };

  const fetchServiceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/services/by-id/${editingServiceId}`);
      const service = response.data;
      
      setFormData({
        title: service.title || "",
        description: service.description || "",
        detailDescription: service.detailDescription || "",
        iconFile: null,
        imageFile: null
      });

      setContent(service.detailDescription || "");
      
      setExistingFiles({
        iconUrl: service.iconFile || "",
        imageUrl: service.imageFile || ""
      });

    } catch (error) {
      console.error("Error fetching service:", error);
      alert("Failed to load service data");
    } finally {
      setLoading(false);
    }
  };

  // Sync Jodit editor content with formData.detailDescription
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      detailDescription: content
    }));  
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("detailDescription", formData.detailDescription);
    
    if (formData.iconFile) {
      data.append("iconFile", formData.iconFile);
    }
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/services/${editingServiceId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Service updated successfully!");
      } else {
        response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/services`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Service added successfully!");
      }

      console.log(response.data);
      
      // Reset form after successful submission
      resetForm();

      // If we were editing, go back to services view
      if (isEditMode && onBackToServices) {
        onBackToServices();
      }
      
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} service:`, error.response?.data || error.message);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} service. Check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
        <DashHeader title="Loading..." />
        <div className="flex justify-center items-center flex-1">
          <div className="text-gray-600">Loading service data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 w-full gap-10">   
      <DashHeader title={isEditMode ? "Edit Service" : "Add new Service"} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 pb-10" encType="multipart/form-data">
        
        <div>
          <label htmlFor="">Service Title: </label>
          <input
            type="text"
            placeholder="Generative Ai Service"
            className="w-full h-10 p-6 border border-gray-500 focus:outline-purple-600 rounded-md"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="">About Service: </label>
          <textarea
            placeholder="Generative AI is a fascinating branch of artificial intelligence that focuses on creating new content."
            className="w-full p-6 border border-gray-500 focus:outline-purple-600 rounded-md"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="">Detail Description: </label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)} 
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Upload Service Icon: </label>
          {isEditMode && existingFiles.iconUrl && (
            <div className="mb-2">
              <span className="text-sm text-gray-600">Current icon:</span>
              <img 
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}${existingFiles.iconUrl}`} 
                alt="Current icon" 
                className="w-16 h-16 object-cover border rounded mt-1"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setFormData({ ...formData, iconFile: e.target.files[0] })}
            className="border border-gray-400 rounded-lg p-2 w-100 me-6"
            required={!isEditMode}
          />
          {isEditMode && <span className="text-sm text-gray-500 mt-1">Leave empty to keep current icon</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Upload Service Image: </label>
          {isEditMode && existingFiles.imageUrl && (
            <div className="mb-2">
              <span className="text-sm text-gray-600">Current image:</span>
              <img 
                src={`${import.meta.env.VITE_REACT_APP_BACKEND_URL}${existingFiles.imageUrl}`} 
                alt="Current image" 
                className="w-32 h-20 object-cover border rounded mt-1"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setFormData({ ...formData, imageFile: e.target.files[0] })}
            className="border border-gray-400 rounded-lg p-2 w-100"
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
            {loading ? 'Processing...' : (isEditMode ? 'Update Service' : 'Add Service')}
          </button>
          
          {isEditMode && onBackToServices && (
            <button 
              type="button" 
              onClick={onBackToServices}
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

export default AddService;