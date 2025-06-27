import { useState } from "react";
import AddService from "../components/AddService";
import AddBlog from "../components/AddBlog";
import { useNavigate } from "react-router-dom"; 
import ViewServices from "../components/ViewServices";
import { Plus } from 'lucide-react';
import { Eye } from 'lucide-react';
import ViewBlogs from "../components/ViewBlogs";

const Dashboard = () => {
  
  const [activeTab, setActiveTab] = useState("addService");
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const navigate = useNavigate();

  if (!localStorage.getItem("isLoggedIn")) {
    navigate("/login");
    return null;
  }

  // Function to handle edit service - called from ViewServices
  const handleEditService = (serviceId) => {
    setEditingServiceId(serviceId);
    setActiveTab("addService");
  };

  // Function to handle edit blog - called from ViewBlogs
  const handleEditBlog = (blogId) => {
    setEditingBlogId(blogId);
    setActiveTab("addBlog");
  };

  // Function to handle back to view services after edit
  const handleBackToServices = () => {
    setEditingServiceId(null);
    setActiveTab("viewServices");
  };

   // Function to handle back to view blogs after edit
  const handleBackToBlog = (blogId) => {
    setEditingBlogId(blogId);
    setActiveTab("viewBlogs");
  };

  return (
    <div className="min-h-screen flex bg-gray-200 mx-auto">
      <div className="flex flex-col bg-gray-800 shadow-lg py-4 px-8 w-74 sticky top-0 h-screen">
        <h3 className="text-xl text-center text-white mb-16">DeepMatrix</h3>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setActiveTab("addService");
                setEditingServiceId(null); // Reset editing when clicking Add Service
              }}
              className={`flex gap-2 py-2 items-center px-2 text-gray-300 hover:text-white cursor-pointer rounded ${
                activeTab === "addService" ? "bg-gray-100/7 text-gray-300" : ""
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingServiceId ? "Edit Service" : "Add Service"}
            </button>
            <button
              onClick={() => {
                setActiveTab("viewServices");
                setEditingServiceId(null); // Reset editing when viewing services
              }}
              className={`flex gap-2 py-2 items-center px-2 text-gray-300 hover:text-white cursor-pointer rounded ${
                activeTab === "viewServices" ? "bg-gray-100/7 text-gray-300" : ""
              }`}
            >
              <Eye className="w-4 h-4" />
              View Services
            </button>
            <button
              onClick={() => {
                setActiveTab("addBlog");
                setEditingBlogId(null); // Reset editing when switching tabs
              }}
              className={`flex gap-2 py-2 items-center px-2 text-gray-300 hover:text-white cursor-pointer rounded ${
                activeTab === "addBlog" ? "bg-gray-100/7 text-gray-300" : ""
              }`}
            >
              <Plus className="w-4 h-4" />
              {editingBlogId ? "Edit Blog" : "Add Blog"}
            </button>
            <button
              onClick={() => {
                setActiveTab("viewBlogs");
                setEditingBlogId(null); // Reset editing when switching tabs
              }}
              className={`flex gap-2 py-2 items-center px-2 text-gray-300 hover:text-white cursor-pointer rounded ${
                activeTab === "viewBlogs" ? "bg-gray-100/7 text-gray-300" : ""
              }`}
            >
              <Eye className="w-4 h-4" />
              View Blog
            </button>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {activeTab === "addService" && (<AddService editingServiceId={editingServiceId} onBackToServices={handleBackToServices} />)}
      {activeTab === "viewServices" && (<ViewServices onEditService={handleEditService} />)}
      {activeTab === "addBlog" && (<AddBlog editingBlogId={editingBlogId} onBackToBlogs={handleBackToBlog} />)}
      {activeTab === "viewBlogs" && (<ViewBlogs onEditBlog={handleEditBlog} />)}
    
    </div>
  );
}

export default Dashboard;