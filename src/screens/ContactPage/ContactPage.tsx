import { ArrowLeftIcon, MailIcon, PhoneIcon, MapPinIcon, ClockIcon, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const ContactPage = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <MailIcon className="w-6 h-6" />,
      title: "Email Us",
      details: "info@arcfunmi.com",
      subDetails: "support@arcfunmi.com"
    },
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      subDetails: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Visit Us",
      details: "123 Architecture Street",
      subDetails: "Design City, DC 12345"
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "Business Hours",
      details: "Monday - Friday",
      subDetails: "9:00 AM - 6:00 PM EST"
    }
  ];

  const faqs = [
    {
      question: "How do I submit an article?",
      answer: "You can submit articles through your user dashboard after creating an account. Our editorial team reviews all submissions within 3-5 business days."
    },
    {
      question: "Is Arcfunmi free to use?",
      answer: "Yes, basic access to read articles and join discussions is completely free. We also offer premium memberships with additional features."
    },
    {
      question: "Can I collaborate with other professionals?",
      answer: "Absolutely! Our platform is designed to foster collaboration between architects, engineers, and construction professionals."
    },
    {
      question: "How do I become a featured contributor?",
      answer: "Featured contributors are selected based on the quality and engagement of their content. Consistently publishing high-quality articles increases your chances."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#ffb000] relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-black/10 rounded-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon className="h-6 w-6 text-black" />
              </Button>
              <img
                className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
                alt="Arcfunmi Logo"
                src="/asset-43-700x-1.png"
              />
            </div>
            
            <Button className="bg-black text-[#ffb000] rounded-lg px-6 py-3 h-auto hover:bg-gray-800 transition-colors">
              <span className="font-semibold text-sm xl:text-base">Join Community</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Have questions, suggestions, or want to collaborate? We'd love to hear from you. 
            Reach out to our team and let's build something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#ffb000] rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-black">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-black text-xl mb-4">
                    {info.title}
                  </h3>
                  <p className="text-gray-700 text-lg font-semibold mb-2">
                    {info.details}
                  </p>
                  <p className="text-gray-600 text-base">
                    {info.subDetails}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb000] focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffb000] focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#ffb000] text-black hover:bg-[#e6a000] rounded-lg px-8 py-4 h-auto text-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <SendIcon className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map/Location */}
            <div>
              <h2 className="font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Find Our Office
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Visit us at our headquarters or schedule a virtual meeting with our team.
              </p>

              <div className="bg-gray-200 rounded-2xl h-96 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Interactive Map</p>
                  <p className="text-gray-500 text-sm">Map integration would go here</p>
                </div>
              </div>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-black text-xl mb-4">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monday - Friday</span>
                      <span className="font-semibold text-black">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Saturday</span>
                      <span className="font-semibold text-black">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sunday</span>
                      <span className="font-semibold text-black">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto">
              Quick answers to common questions about Arcfunmi and our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-[#ffb000] border-none">
                <CardContent className="p-8">
                  <h3 className="font-bold text-black text-xl lg:text-2xl mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-black/80 text-base lg:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#ffb000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-black/80 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            Join thousands of professionals already sharing knowledge and building the future together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-6">
            <Button className="h-12 sm:h-14 lg:h-16 w-full sm:w-auto px-6 lg:px-8 bg-black text-white rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-800 transition-colors">
              Join the Community
            </Button>
            <Button className="h-12 sm:h-14 lg:h-16 w-full sm:w-auto px-6 lg:px-8 bg-white text-black rounded-lg text-base sm:text-lg lg:text-xl font-semibold hover:bg-gray-100 transition-colors">
              Explore Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <img
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain mb-6 lg:mb-8"
                alt="Arcfunmi Logo"
                src="/asset-43-700x-1.png"
              />
              
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                A Knowledge hub for architects, engineers and construction professionals.
              </p>

              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="w-10 h-10 p-0 hover:bg-white/10 rounded-full">
                  <img className="w-5 h-5" alt="Social Icon" src="/icon-1.svg" />
                </Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-0 hover:bg-white/10 rounded-full">
                  <img className="w-5 h-5" alt="Social Icon" src="/icon-3.svg" />
                </Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-0 hover:bg-white/10 rounded-full">
                  <img className="w-5 h-4" alt="Social Icon" src="/icon.svg" />
                </Button>
                <Button variant="ghost" size="icon" className="w-10 h-10 p-0 hover:bg-white/10 rounded-full">
                  <img className="w-5 h-5" alt="Social Icon" src="/icon-2.svg" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Quick Links</h3>
              <div className="space-y-3 lg:space-y-4">
                <a href="/" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Home</a>
                <a href="/about" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">About</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Articles</a>
                <a href="/contact" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Contact</a>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Categories</h3>
              <div className="space-y-3 lg:space-y-4">
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Architecture</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Engineering</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Construction</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Design</a>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Contact</h3>
              <div className="space-y-3 lg:space-y-4">
                <p className="text-gray-300 text-base lg:text-lg">info@arcfunmi.com</p>
                <p className="text-gray-300 text-base lg:text-lg">+1 (555) 123-4567</p>
                <p className="text-gray-300 text-base lg:text-lg">123 Architecture St.<br />Design City, DC 12345</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 lg:mt-16 pt-8 lg:pt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm lg:text-base">
                © 2024 Arcfunmi. All rights reserved.
              </p>
              <div className="flex gap-6 lg:gap-8">
                <a href="#" className="text-gray-400 hover:text-[#ffb000] transition-colors text-sm lg:text-base">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-[#ffb000] transition-colors text-sm lg:text-base">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};