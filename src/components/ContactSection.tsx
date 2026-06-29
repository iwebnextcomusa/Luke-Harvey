import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-sedona-charcoal/30 relative overflow-hidden">
      {/* Decorative ambient glowing Sedona light */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-sedona-orange/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-sedona-orange">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-sedona-sand mt-3 mb-6">
            Contact Luke Harvey
          </h2>
          <div className="w-16 h-0.5 bg-sedona-red mx-auto"></div>
        </div>

        {/* Contact Page Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Contact Details & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-8" id="contact-details-col">
            <div className="bg-sedona-charcoal border border-sedona-clay/20 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="font-serif text-xl text-sedona-sand mb-6">
                Booking & Press Coordinates
              </h3>

              <div className="space-y-6">
                {/* Phone Contact */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-sedona-clay/15 rounded-lg border border-sedona-orange/20 text-sedona-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-sedona-copper">
                      Phone Number
                    </span>
                    <a
                      href="tel:928-300-7747"
                      className="text-base font-serif text-sedona-sand hover:text-sedona-orange transition-colors mt-1 block"
                      id="link-contact-phone"
                    >
                      928-300-7747
                    </a>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-sedona-clay/15 rounded-lg border border-sedona-orange/20 text-sedona-orange flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-sedona-copper">
                      Email Address
                    </span>
                    <a
                      href="mailto:davidrrfd@yahoo.com"
                      className="text-base font-serif text-sedona-sand hover:text-sedona-orange transition-colors mt-1 block break-all"
                      id="link-contact-email"
                    >
                      davidrrfd@yahoo.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-sedona-clay/15 rounded-lg border border-sedona-orange/20 text-sedona-orange flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-sedona-copper">
                      Based In
                    </span>
                    <span className="text-base font-serif text-sedona-sand block mt-1">
                      Sedona, Arizona, USA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps centered on Sedona, AZ */}
            <div className="relative rounded-2xl overflow-hidden border border-sedona-clay/20 bg-sedona-charcoal h-64 shadow-lg group" id="contact-map">
              <iframe
                title="Sedona Arizona Map"
                className="absolute inset-0 w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-95 transition-all duration-500"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105267.87325785933!2d-111.87413695279621!3d34.85437340058988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872da132f940b595%3A0x67badcf44d111287!2sSedona%2C%20AZ!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                allowFullScreen={false}
                loading="lazy"
                frameBorder="0"
                referrerPolicy="no-referrer"
              ></iframe>
              <div className="absolute top-3 left-3 bg-sedona-dark/90 backdrop-blur-sm px-3 py-1 rounded border border-sedona-orange/20 text-[10px] font-mono uppercase tracking-widest text-sedona-sand">
                Sedona, AZ
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-sedona-charcoal/50 border border-sedona-clay/25 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm" id="contact-form-col">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4" id="contact-success-block">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500 text-green-500 flex items-center justify-center rounded-full mx-auto shadow-lg animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-sedona-sand">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-sedona-sand/85 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Luke or his booking coordinator will get back to you 
                  within 24-48 hours. Let's make something beautiful in Sedona!
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2.5 bg-sedona-clay hover:bg-sedona-red text-sedona-sand text-xs font-mono uppercase tracking-widest rounded transition-all duration-300"
                  id="btn-send-another"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                <h3 className="font-serif text-xl text-sedona-sand mb-4">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-sedona-copper mb-2">
                      Your Name <span className="text-sedona-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="px-4 py-3 bg-sedona-dark/60 hover:bg-sedona-dark text-sedona-sand border border-sedona-clay/20 focus:border-sedona-orange rounded-lg focus:outline-none transition-colors text-sm font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-sedona-copper mb-2">
                      Email Address <span className="text-sedona-red">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. sarah@example.com"
                      className="px-4 py-3 bg-sedona-dark/60 hover:bg-sedona-dark text-sedona-sand border border-sedona-clay/20 focus:border-sedona-orange rounded-lg focus:outline-none transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-wider text-sedona-copper mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 928-555-0199"
                    className="px-4 py-3 bg-sedona-dark/60 hover:bg-sedona-dark text-sedona-sand border border-sedona-clay/20 focus:border-sedona-orange rounded-lg focus:outline-none transition-colors text-sm font-sans"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-sedona-copper mb-2">
                    Your Message <span className="text-sedona-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event, wedding or booking inquiry in Sedona..."
                    className="px-4 py-3 bg-sedona-dark/60 hover:bg-sedona-dark text-sedona-sand border border-sedona-clay/20 focus:border-sedona-orange rounded-lg focus:outline-none transition-colors text-sm font-sans resize-y"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-sedona-red hover:bg-sedona-orange text-sedona-sand font-mono text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-sedona-red/20 border border-sedona-orange/10 cursor-pointer disabled:opacity-55"
                  id="btn-submit-contact"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-sedona-sand border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
