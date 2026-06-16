import { useState, useEffect, useRef } from 'react';
import gsap from "gsap";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const formRef = useRef(null);
    const elementsRef = useRef([]);

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

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
          .fromTo(elementsRef.current.filter(Boolean), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.5");
    }, []);

    return (
        <section className="min-h-screen bg-[#0b0f19] text-white py-36 px-6 flex items-center justify-center">
            <div ref={formRef} className="max-w-2xl w-full mx-auto space-y-10">
                <div ref={(el) => (elementsRef.current[0] = el)} className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">Contact <span className="text-blue-500">Us</span></h1>
                    <p className="text-slate-400 text-sm md:text-base">Have a question or feedback? We'd love to hear from you!</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#101626]/50 border border-slate-800/80 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl space-y-6"
                >
                    {error && (
                        <div ref={(el) => (elementsRef.current[1] = el)} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div ref={(el) => (elementsRef.current[2] = el)} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl text-sm font-medium">
                            {success}
                        </div>
                    )}

                    <div ref={(el) => (elementsRef.current[3] = el)}>
                        <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-slate-950/80 text-white border border-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600"
                        />
                    </div>
                    <div ref={(el) => (elementsRef.current[4] = el)}>
                        <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-slate-950/80 text-white border border-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600"
                        />
                    </div>
                    <div ref={(el) => (elementsRef.current[5] = el)}>
                        <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Message</label>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-4 rounded-xl bg-slate-950/80 text-white border border-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-slate-600 resize-none"
                        ></textarea>
                    </div>
                    <button
                        ref={(el) => (elementsRef.current[6] = el)}
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25 hover:scale-[1.01]"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
