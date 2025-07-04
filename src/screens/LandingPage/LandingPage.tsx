import { ChevronDownIcon, ChevronRightIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const LandingPage = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items
  const navItems = [
    { label: "Explore", hasDropdown: true, href: "#" },
    { label: "About", hasDropdown: false, href: "/about" },
    { label: "Contact", hasDropdown: false, href: "/contact" },
  ];

  // Feature cards data
  const featureCards = [
    {
      icon: "/hand-with-pen.png",
      title: "Write and Publish Your Expertise",
      description:
        "Share your Knowledge and insights with the built word community. Create articles, case studies and guidelines that help the coming builders",
    },
    {
      icon: "/idea.png",
      title: "Learn From Professionals in Your Field",
      description:
        "Connect with experienced Architects, Construction Professionals and Engineers. Learn from their expertise and best practices",
    },
    {
      icon: "/brick-wall.png",
      title: "Bridge Architecture, Engineering and Construction",
      description:
        "Share your Knowledge and insights with the built word community. Create articles, case studies and guidelines that help the coming builders",
    },
    {
      icon: "/trophy.png",
      title: "Grow Your Professional Voice",
      description:
        "Share your Knowledge and insights with the built word community. Create articles, case studies and guidelines that help the coming builders",
    },
  ];

  // Featured articles data
  const featuredArticles = [
    {
      image: "/rectangle-8.svg",
      title: "Subheading",
      description:
        "Body text for whatever you'd like to expand on the main point",
    },
    {
      image: "/rectangle-8.svg",
      title: "Subheading",
      description:
        "Body text for whatever you'd like to expand on the main point",
    },
  ];

  // Hot topics articles data
  const hotTopicsArticles = [
    {
      image: "/mask-group-1.png",
      title: "Subheading",
      description:
        "Body text for whatever you'd like to expand on the main point",
    },
    {
      image: "/mask-group-2.png",
      title: "Subheading",
      description:
        "Body text for whatever you'd like to expand on the main point",
    },
  ];

  // Topic categories
  const topicCategories = ["Architecture", "Engineering", "Construction"];

  return (
    <div className="bg-white min-h-screen">
      {/* Header/Navigation */}
      <header className="w-full bg-[#ffb000] relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
                  alt="Arcfunmi Logo"
                  src="/asset-43-700x-1.png"
                />
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Input
                  className="w-80 xl:w-96 h-12 xl:h-14 bg-white rounded-full pl-16 pr-6 border-none text-lg font-medium placeholder:text-[#828282] focus:ring-2 focus:ring-black/20"
                  placeholder="Search articles"
                />
                <img
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-4"
                  alt="Search"
                  src="/rectangle.png"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                  {item.href.startsWith('#') ? (
                    <span className="font-medium text-black text-lg xl:text-xl">
                      {item.label}
                    </span>
                  ) : (
                    <Link to={item.href} className="font-medium text-black text-lg xl:text-xl">
                      {item.label}
                    </Link>
                  )}
                  {item.hasDropdown && (
                    <ChevronDownIcon className="ml-2 h-5 w-5 xl:h-6 xl:w-6" />
                  )}
                </div>
              ))}

              <Button className="bg-black text-[#ffb000] rounded-lg px-6 py-3 h-auto hover:bg-gray-800 transition-colors">
                <span className="font-semibold text-sm xl:text-base">Login/Signup</span>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6 text-black" />
              ) : (
                <MenuIcon className="h-6 w-6 text-black" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-black/10">
              {/* Mobile Search */}
              <div className="mt-4 mb-6">
                <Input
                  className="w-full h-12 bg-white rounded-full px-4 border border-black/20 text-base placeholder:text-[#828282]"
                  placeholder="Search articles"
                />
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    {item.href.startsWith('#') ? (
                      <span className="font-medium text-black text-lg">
                        {item.label}
                      </span>
                    ) : (
                      <Link to={item.href} className="font-medium text-black text-lg">
                        {item.label}
                      </Link>
                    )}
                    {item.hasDropdown && (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </div>
                ))}
                
                <Button className="w-full bg-black text-[#ffb000] rounded-lg py-3 mt-4">
                  <span className="font-semibold text-base">Login/Signup</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - No gap between header and hero */}
      <main className="w-full bg-black">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url(/mask-group.png)" }}
            >
              <div className="absolute inset-0 bg-black/30 lg:bg-transparent"></div>
              <div className="relative z-10 p-6 sm:p-8 lg:pl-16 xl:pl-20 lg:pt-16 xl:pt-20 h-full flex flex-col justify-center lg:justify-start">
                <h1 className="w-full max-w-2xl font-bold text-white lg:text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-tight">
                  Where Built World Share Ideas
                </h1>

                <p className="w-full max-w-2xl mt-4 lg:mt-6 font-normal text-white/90 lg:text-black/75 text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                  A Knowledge hub for architects, engineers and construction pros
                  to read, write and share insights.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 mt-6 lg:mt-8">
                  <Button className="h-12 sm:h-14 lg:h-16 xl:h-20 w-full sm:w-auto px-6 lg:px-8 xl:px-10 bg-black text-white rounded-lg text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-gray-800 transition-colors">
                    Explore Articles
                  </Button>

                  <Button className="h-12 sm:h-14 lg:h-16 xl:h-20 w-full sm:w-auto px-6 lg:px-8 xl:px-10 bg-[#ffb000] text-black rounded-lg text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-[#e6a000] transition-colors">
                    Join the Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Arcfunmi Section */}
        <section className="text-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              Why Arcfunmi?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mt-12 lg:mt-16">
              {featureCards.map((card, index) => (
                <Card
                  key={index}
                  className="bg-[#ffb000] rounded-3xl min-h-[400px] lg:h-[500px] hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-8 lg:p-10">
                    <img
                      className="w-16 h-16 lg:w-20 lg:h-20"
                      alt={card.title}
                      src={card.icon}
                    />

                    <h3 className="max-w-xs mt-8 lg:mt-12 font-bold text-black text-xl lg:text-2xl text-center leading-tight">
                      {card.title}
                    </h3>

                    <p className="max-w-xs mt-4 lg:mt-6 font-normal text-black text-base lg:text-lg text-center leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Badge className="bg-[#ffb000] text-black rounded-lg w-full sm:w-auto max-w-xs h-16 lg:h-20 flex items-center justify-center mb-12 lg:mb-16">
              <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight">
                Featured
              </span>
            </Badge>

            <div className="space-y-12 lg:space-y-16">
              {featuredArticles.map((article, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  <img
                    className="w-full lg:w-[500px] xl:w-[600px] h-48 sm:h-56 lg:h-64 xl:h-72 object-cover rounded-lg"
                    alt="Featured article"
                    src={article.image}
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-tight">
                        {article.title}
                      </h3>

                      <p className="mt-3 lg:mt-4 font-normal text-[#828282] text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 lg:mt-8">
                      <Badge className="bg-[#ffb000] text-black rounded-2xl h-10 lg:h-12 px-6 lg:px-8 flex items-center justify-center">
                        <span className="font-semibold text-base lg:text-lg xl:text-xl">
                          Article
                        </span>
                      </Badge>

                      <div className="flex gap-3 lg:gap-4">
                        <img
                          className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                          alt="Eye"
                          src="/eye-3.png"
                        />
                        <img
                          className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                          alt="Topic"
                          src="/topic-3.png"
                        />
                        <img
                          className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                          alt="Heart"
                          src="/heart-3.png"
                        />
                        <img
                          className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                          alt="Forward arrow"
                          src="/forward-arrow-3.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Topics Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#ffb000] rounded-2xl h-20 sm:h-24 lg:h-28 flex items-center justify-center mb-12 lg:mb-16">
              <h2 className="font-bold text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-black">
                Hot Topics
              </h2>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-8 xl:gap-12 mb-12 lg:mb-16">
              {topicCategories.map((category, index) => (
                <Badge
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl h-12 lg:h-16 px-6 lg:px-8 xl:px-12 flex items-center cursor-pointer hover:bg-white/90 transition-all"
                >
                  <span className="font-semibold text-black text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                    {category}
                  </span>
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              {hotTopicsArticles.map((article, index) => (
                <Card key={index} className="bg-transparent border-none group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        className="w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                        alt="Article thumbnail"
                        src={article.image}
                      />
                    </div>

                    <div className="mt-4 lg:mt-6">
                      <h3 className="font-semibold text-white text-xl sm:text-2xl lg:text-3xl leading-tight">
                        {article.title}
                      </h3>

                      <p className="font-normal text-[#828282] text-base sm:text-lg lg:text-xl leading-relaxed mt-3 lg:mt-4">
                        {article.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-4 lg:mt-6 gap-3 lg:gap-4">
                      <img
                        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                        alt="Eye"
                        src="/eye-3.png"
                      />
                      <img
                        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                        alt="Topic"
                        src="/topic-3.png"
                      />
                      <img
                        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                        alt="Heart"
                        src="/heart-3.png"
                      />
                      <img
                        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer hover:opacity-80 transition-opacity"
                        alt="Forward arrow"
                        src="/forward-arrow-3.png"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center lg:justify-end mt-12 lg:mt-16">
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <span className="font-light text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
                  see all articles
                </span>
                <ChevronRightIcon className="w-8 h-8 sm:w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 text-white ml-2 lg:ml-4" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 text-center px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-semibold text-white text-2xl sm:text-4xl lg:text-5xl xl:text-6xl max-w-5xl mx-auto leading-tight">
              Ready to build with the best minds?
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4 lg:gap-8 mt-8 lg:mt-12">
              <Button className="h-12 sm:h-14 lg:h-16 xl:h-20 w-full sm:w-auto px-6 lg:px-8 xl:px-10 bg-[#ffb000] text-black rounded-lg text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-[#e6a000] transition-colors">
                Explore Articles
              </Button>

              <Button className="h-12 sm:h-14 lg:h-16 xl:h-20 w-full sm:w-auto px-6 lg:px-8 xl:px-10 bg-white text-black rounded-lg text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold hover:bg-gray-100 transition-colors">
                Join the Community
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Newsletter Section */}
      <section className="w-full bg-[#ffb000] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6">
          <h2 className="font-bold text-black text-2xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight">
            Subscribe to our newsletter
          </h2>

          <p className="font-medium text-[#585555] text-base sm:text-lg lg:text-xl xl:text-2xl mt-4 lg:mt-6 max-w-3xl mx-auto leading-relaxed">
            Subscribe to our newsletter to get updates on your favorite topics
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-0 mt-8 lg:mt-12 max-w-3xl mx-auto">
            <div className="relative flex w-full">
              <Input
                className="w-full h-12 sm:h-14 lg:h-16 xl:h-18 bg-white rounded-full px-6 lg:px-8 py-3 lg:py-4 text-base sm:text-lg lg:text-xl font-medium text-[#9a9a9a] pr-32 sm:pr-36 lg:pr-40"
                placeholder="Enter your email"
              />

              <Button className="absolute right-1 top-1 h-10 sm:h-12 lg:h-14 xl:h-16 bg-black text-white rounded-full px-4 sm:px-6 lg:px-8 py-2 lg:py-3 text-sm sm:text-base lg:text-lg xl:text-xl font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <img
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain mb-6 lg:mb-8"
                alt="Arcfunmi Logo"
                src="/asset-43-700x-1.png"
              />
              
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                A Knowledge hub for architects, engineers and construction professionals to read, write and share insights.
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

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Quick Links</h3>
              <div className="space-y-3 lg:space-y-4">
                <Link to="/" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Home</Link>
                <Link to="/about" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">About</Link>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Articles</a>
                <Link to="/contact" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Contact</Link>
              </div>
            </div>

            {/* Categories */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Categories</h3>
              <div className="space-y-3 lg:space-y-4">
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Architecture</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Engineering</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Construction</a>
                <a href="#" className="block text-gray-300 hover:text-[#ffb000] transition-colors text-base lg:text-lg">Design</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-white text-lg lg:text-xl mb-4 lg:mb-6">Contact</h3>
              <div className="space-y-3 lg:space-y-4">
                <p className="text-gray-300 text-base lg:text-lg">info@arcfunmi.com</p>
                <p className="text-gray-300 text-base lg:text-lg">+1 (555) 123-4567</p>
                <p className="text-gray-300 text-base lg:text-lg">123 Architecture St.<br />Design City, DC 12345</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
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