import React, { useState } from 'react';
import contactUs from '../assets/images/contact-us.png';
import { Loader } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch((`${import.meta.env.VITE_REACT_APP_BACKEND_URL}api/contact`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert('Message sent!');
        setForm({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      alert('Error sending message.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:p-20 px-6 py-18 lg:mt-24 mt-18 bg-gray-50 mx-auto flex lg:flex-row flex-col-reverse md:flex-row items-top justify-center gap-10">
        <div className="lg:w-1/2 w-full">
          <img src={contactUs} alt="Contact Us" className='w-[450px]' />
        </div>
        <div className='lg:w-3/4 w-full'>
          <h2 className='lg:text-5xl text-4xl font-bold'>Let's Talk</h2>
          <p className='mt-2 lg:text-lg text-sm'>Have a question in mind? </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-6'>
              <input
                type="text"
                className='w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md'
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                type="email"
                className='w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md'
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <textarea
                name="message"
                className='w-full p-6 border border-gray-300 focus:outline-purple-600 rounded-md'
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                required
              ></textarea>
            <button type="submit" className='bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full hover:from-[#A55EEA] hover:to-[#648DFD] transition duration-300 ease-in-out cursor-pointer flex items-center justify-center' disabled={loading}>
              {loading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
    </div>
  );
};

export default Contact;