import { ArrowLeftIcon, CheckCircleIcon, UsersIcon, BookOpenIcon, TrendingUpIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const AboutPage = (): JSX.Element => {
  const stats = [
    { number: "10K+", label: "Active Members" },
    { number: "5K+", label: "Articles Published" },
    { number: "50+", label: "Countries Represented" },
    { number: "100+", label: "Expert Contributors" },
  ];

  const values = [
    {
      icon: <BookOpenIcon className="w-8 h-8" />,
      title: "Knowledge Sharing",
      description: "We believe in the power of shared knowledge to advance the built environment industry."
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Community First",
      description: "Our platform is built by professionals, for professionals, fostering genuine connections."
    },
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: "Innovation",
      description: "We embrace new technologies and methodologies that push our industry forward."
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Quality",
      description: "Every piece of content is curated to ensure it meets the highest professional standards."
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      background: "Licensed Architect with 15+ years experience",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Engineering",
      background: "Structural Engineer & Tech Innovator",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Amara Okafor",
      role: "Content Director",
      background: "Construction Management PhD & Industry Expert",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
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
            About Arcfunmi
          </h1>
          <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            We're building the world's premier knowledge-sharing platform for architects, engineers, 
            and construction professionals. Our mission is to connect the brightest minds in the built environment.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#ffb000] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg sm:text-xl font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Arcfunmi was born from a simple observation: the built environment industry had incredible 
                  knowledge scattered across countless professionals, but no central place to share, learn, 
                  and grow together.
                </p>
                <p>
                  Founded in 2023 by a team of architects, engineers, and construction professionals, 
                  we set out to create more than just another platform. We wanted to build a community 
                  where expertise flows freely and innovation thrives.
                </p>
                <p>
                  Today, we're proud to host thousands of professionals from around the world, sharing 
                  insights that shape the future of how we design and build our world.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team collaboration"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Our Values
            </h2>
            <p className="text-white/80 text-lg sm:text-xl max-w-3xl mx-auto">
              These principles guide everything we do and shape the community we're building together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-[#ffb000] border-none hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="text-black mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-black text-xl lg:text-2xl mb-4">
                    {value.title}
                  </h3>
                  <p className="text-black/80 text-base lg:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              The passionate professionals behind Arcfunmi, bringing decades of industry experience 
              and a shared vision for the future of knowledge sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-black text-xl mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[#ffb000] font-semibold text-lg mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {member.background}
                    </p>
                  </div>
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
            Ready to Join Our Community?
          </h2>
          <p className="text-black/80 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            Connect with thousands of professionals, share your expertise, and help shape the future 
            of the built environment industry.
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
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Contact</a>
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