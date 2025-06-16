import React, { useState } from 'react';

const ContactUs = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', form);
        // Add form submission logic here
    };

    return (
        <div className="contact-form container">
            <div className="form-container">
                <div className="image-container">
                    <img src="/images/contact-us.png" alt="Contact Us" />
                </div>
                <div className="form-content">
                    <h2>Contact Us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group message-area">
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Message"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;