// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'For order & rental inquiries',
      contact: 'support@rentaleco.com',
      link: 'mailto:support@rentaleco.com',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Mon-Sat, 9 AM - 7 PM IST',
      contact: '+91 1800-123-4567',
      link: 'tel:+911800123456',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: '🏢',
      title: 'Vendor Relations',
      description: 'For listing & partnership',
      contact: 'partners@rentaleco.com',
      link: 'mailto:partners@rentaleco.com',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Instant support available',
      contact: 'Start Chat',
      link: '#chat',
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'We are available Monday to Saturday, 9:00 AM - 7:00 PM IST. Email support is available 24/7.'
    },
    {
      question: 'How quickly do you respond?',
      answer: 'We typically respond to emails within 4-6 hours during business hours. Phone support is immediate.'
    },
    {
      question: 'Where is your office located?',
      answer: 'Our headquarters is located in Cyber City, Gurugram, Haryana, India. We serve customers across 5 major cities.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-light text-[#0d131c] font-display antialiased flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-16 px-6 hero-gradient flex flex-col items-center text-center overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              We're Online & Ready to Help 24/7
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
            Get in <span className="text-gradient bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Touch.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200">
            Have questions about renting, listing your gear, or partnership opportunities? 
            <span className="font-bold text-slate-900"> We'd love to hear from you.</span>
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Multiple Ways to Reach Us</h2>
            <p className="text-slate-600">Choose the method that works best for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a 
                key={index}
                href={method.link}
                className="group p-6 rounded-2xl bg-gradient-to-br bg-white border-2 border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${method.bgColor} rounded-2xl flex items-center justify-center text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  {method.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{method.title}</h3>
                <p className="text-sm text-slate-500 mb-3 text-center">{method.description}</p>
                <p className={`text-sm font-bold text-center bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                  {method.contact}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column: Contact Info (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Office Location Card */}
            <div className="glass-panel p-8 rounded-3xl border border-white/50 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                    📍
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Headquarters</h3>
                </div>
                <div className="space-y-4 text-slate-600">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900 mb-2">RentalEco Pvt. Ltd.</p>
                    <p className="text-sm leading-relaxed">
                      123 Innovation Drive, Tech Park<br/>
                      Cyber City, Gurugram - 122003<br/>
                      Haryana, India
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Phone</p>
                        <p className="font-bold text-slate-900">+91 1800-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">Hours</p>
                        <p className="font-bold text-slate-900">Mon-Sat, 9 AM - 7 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="glass-panel p-8 rounded-3xl border border-white/50 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Connect With Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all text-center group">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">📘</div>
                  <p className="text-sm font-semibold text-slate-700">Facebook</p>
                </a>
                <a href="#" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all text-center group">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">🐦</div>
                  <p className="text-sm font-semibold text-slate-700">Twitter</p>
                </a>
                <a href="#" className="p-4 bg-pink-50 hover:bg-pink-100 rounded-xl border border-pink-100 hover:border-pink-200 transition-all text-center group">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">📸</div>
                  <p className="text-sm font-semibold text-slate-700">Instagram</p>
                </a>
                <a href="#" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all text-center group">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">💼</div>
                  <p className="text-sm font-semibold text-slate-700">LinkedIn</p>
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass-panel p-8 rounded-3xl border border-white/50 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Why Customers Trust Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">4.9/5</p>
                    <p className="text-sm text-slate-600">Customer Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                    👥
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">10k+</p>
                    <p className="text-sm text-slate-600">Happy Users</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">{'<'}4hrs</p>
                    <p className="text-sm text-slate-600">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (3 columns) */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 mb-3">Send us a Message</h2>
                  <p className="text-slate-600">Fill out the form below and we'll get back to you within 4-6 hours</p>
                </div>
                
                {submitted ? (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-10 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-5xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      Thank you for contacting RentalEco. Our team will review your message and get back to you shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-lg transition-all"
                      >
                        Send Another Message
                      </button>
                      <a 
                        href="/products"
                        className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                      >
                        Browse Products
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-2">
                          <span>👤</span> Full Name *
                        </label>
                        <input 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          type="text" 
                          className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-2">
                          <span>📧</span> Email Address *
                        </label>
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          type="email" 
                          className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-2">
                          <span>📱</span> Phone Number
                        </label>
                        <input 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel" 
                          className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-2">
                          <span>📝</span> Subject *
                        </label>
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 font-medium"
                        >
                          <option value="" disabled>Select a topic</option>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order Issue</option>
                          <option value="vendor">Vendor Partnership</option>
                          <option value="billing">Billing & Refunds</option>
                          <option value="technical">Technical Support</option>
                          <option value="feedback">Feedback & Suggestions</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1 flex items-center gap-2">
                        <span>💬</span> Your Message *
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-slate-900 font-medium"
                        placeholder="Tell us how we can help you today..."
                      ></textarea>
                      <p className="text-xs text-slate-500 ml-1">Please provide as much detail as possible</p>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <span className="text-2xl mt-1">💡</span>
                      <p className="text-sm text-slate-600">
                        <strong className="text-slate-900">Quick Tip:</strong> Include your order number if you're inquiring about an existing rental.
                      </p>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-black py-5 rounded-xl shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] text-lg group"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="text-2xl transform group-hover:translate-x-1 transition-transform">→</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl border border-white/50 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-3">
                  <span className="text-primary mt-1">❓</span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 ml-8">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Didn't find what you're looking for?</p>
            <a href="#form" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all">
              Contact Us Directly
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;