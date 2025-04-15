import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { name, email, message } = formData;

        if (!name || !email || !message) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Success
        setSuccess('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="min-h-screen bg-[#0f172a] text-white py-28 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
                    <p className="text-gray-400">We'd love to hear from you!</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#1e293b] p-8 rounded-2xl shadow-lg space-y-6"
                >
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <div>
                        <label className="block mb-2 text-sm text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#334155] text-white border border-[#475569] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#334155] text-white border border-[#475569] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-300">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-[#334155] text-white border border-[#475569] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
