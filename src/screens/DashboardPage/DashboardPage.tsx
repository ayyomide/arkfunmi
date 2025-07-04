import React, { useState, useEffect } from "react";
import { 
  BookOpenIcon, 
  PlusIcon, 
  SearchIcon, 
  BellIcon, 
  UserIcon,
  TrendingUpIcon,
  EyeIcon,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
  FilterIcon,
  ChevronDownIcon,
  SettingsIcon,
  LogOutIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../contexts/AuthContext";
import { supabase, Article } from "../../lib/supabase";

export const DashboardPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  // Mock user stats (will be replaced with real data)
  const userStats = {
    articlesCount: 12,
    followersCount: 1250,
    followingCount: 340
  };

  useEffect(() => {
    fetchArticles();
  }, [activeTab]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:users(*)
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (activeTab === 'trending') {
        query = query.order('views_count', { ascending: false });
      } else if (activeTab === 'following') {
        // For now, show all articles. In a real app, you'd filter by followed users
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query.limit(10);

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const categories = ["All", "Architecture", "Engineering", "Construction", "Design", "Planning"];

  const tabs = [
    { id: "feed", label: "Feed", icon: <BookOpenIcon className="w-5 h-5" /> },
    { id: "trending", label: "Trending", icon: <TrendingUpIcon className="w-5 h-5" /> },
    { id: "following", label: "Following", icon: <UserIcon className="w-5 h-5" /> }
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffb000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#ffb000] shadow-lg border-b border-[#e6a000] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 sm:h-12 w-auto object-contain"
                alt="Arcfunmi Logo"
                src="/asset-43-700x-1.png"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 bg-white border-none rounded-full focus:ring-2 focus:ring-black/20 text-black placeholder:text-gray-600"
                  placeholder="Search articles, authors, topics..."
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button className="bg-black text-[#ffb000] hover:bg-gray-800 rounded-lg px-4 py-2 h-auto font-semibold">
                <PlusIcon className="w-4 h-4 mr-2" />
                Write Article
              </Button>
              
              <Button variant="ghost" size="icon" className="relative hover:bg-black/10">
                <BellIcon className="h-6 w-6 text-black" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <div className="relative">
                <div 
                  className="flex items-center gap-3 cursor-pointer hover:bg-black/10 rounded-lg p-2 transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-black">
                      {userProfile.first_name} {userProfile.last_name}
                    </p>
                    <p className="text-xs text-gray-700">{userProfile.profession}</p>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-black" />
                </div>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <UserIcon className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <SettingsIcon className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                    <hr className="my-2" />
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOutIcon className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-10 bg-white border-none rounded-full focus:ring-2 focus:ring-black/20 text-black placeholder:text-gray-600"
                placeholder="Search articles, authors, topics..."
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6 bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    {userProfile.first_name} {userProfile.last_name}
                  </h3>
                  <p className="text-gray-400 mb-4">{userProfile.profession}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-bold text-lg text-[#ffb000]">{userStats.articlesCount}</p>
                      <p className="text-xs text-gray-400">Articles</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#ffb000]">{userStats.followersCount}</p>
                      <p className="text-xs text-gray-400">Followers</p>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-[#ffb000]">{userStats.followingCount}</p>
                      <p className="text-xs text-gray-400">Following</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800">
                    <PlusIcon className="w-4 h-4 mr-3" />
                    Write New Article
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800">
                    <BookOpenIcon className="w-4 h-4 mr-3" />
                    My Articles
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800">
                    <UserIcon className="w-4 h-4 mr-3" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#ffb000] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <Button variant="outline" className="flex items-center gap-2 bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                <FilterIcon className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "secondary"}
                  className={`cursor-pointer hover:bg-[#ffb000] hover:text-black transition-colors ${
                    category === "All" ? 'bg-[#ffb000] text-black' : 'bg-gray-800 text-gray-300 hover:bg-[#ffb000] hover:text-black'
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Articles Feed */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-[#ffb000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpenIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-gray-400 mb-6">Be the first to share your knowledge with the community!</p>
                <Button className="bg-[#ffb000] text-black hover:bg-[#e6a000]">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Write Your First Article
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {articles.map((article) => (
                  <Card key={article.id} className="hover:shadow-xl transition-shadow duration-300 bg-gray-900 border-gray-800">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {article.featured_image_url && (
                          <img
                            src={article.featured_image_url}
                            alt={article.title}
                            className="w-full md:w-48 h-48 md:h-32 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        )}
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-white">
                                {article.author?.first_name} {article.author?.last_name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {article.created_at ? formatTimeAgo(article.created_at) : 'Recently'}
                              </p>
                            </div>
                            <Badge variant="secondary" className="ml-auto bg-[#ffb000] text-black">
                              {article.category}
                            </Badge>
                          </div>

                          <h3 className="font-bold text-lg text-white mb-2 hover:text-[#ffb000] cursor-pointer transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{article.read_time} min read</span>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                                <HeartIcon className="w-4 h-4" />
                                <span className="text-xs">{article.likes_count || 0}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors">
                                <MessageCircleIcon className="w-4 h-4" />
                                <span className="text-xs">{article.comments_count || 0}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 text-gray-400">
                                <EyeIcon className="w-4 h-4" />
                                <span className="text-xs">{article.views_count || 0}</span>
                              </div>
                              
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                <ShareIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {articles.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8 py-3 bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};