import { useState } from "react";
import Image from "next/image";
import Header from "../components/common/Header";
import LiveMatchCard from "../components/matches/LiveMatchCard";
import PointsTable from "../components/tables/PointsTable";
import { useIPLData } from "../hooks/useIPLData";

export default function Home() {
  const { data, loading, error } = useIPLData(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  function getCurrentDate() {
    const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy}`;
}

  const heroSlides = [
    {
      title: "Learnings, ambitions and conquering dreams with...",
      date: getCurrentDate(),
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop"
    },
    {
      title: "TATA IPL 2025: The Ultimate Cricket Experience",
      date: "15 Mar, 2025",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop"
    }
  ];

  const popularPlayers = [
    { name: "Kohli", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop" },
    { name: "Gill", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" },
    { name: "Pandya", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop" },
    { name: "Jaiswal", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop" },
    { name: "Rohit", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop" },
    { name: "Dhoni", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&random=1" },
    { name: "Shreyas", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&random=2" },
    { name: "Chahal", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=100&h=100&fit=crop&random=3" },
    { name: "Samson", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&random=4" },
    { name: "Rahul", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop&random=5" }
  ];

  const quickActions = [
    { title: "Fixtures & Results", icon: "📅", color: "bg-blue-500" },
    { title: "Points Table", icon: "🏆", color: "bg-yellow-500" },
    { title: "Overall Stats", icon: "📊", color: "bg-green-500" },
    { title: "All Teams", icon: "🛡️", color: "bg-purple-500" }
  ];

  const magicMoments = [
    { title: "All Direct Hits from TATA IPL 2023", date: "2 days ago", views: "1.2M views" },
    { title: "Tears, joy, elation: KKR lift their maiden IPL title", date: "1 week ago", views: "890K views" },
    { title: "The emotions. The fight. The victory. The final over...", date: "3 days ago", views: "567K views" },
    { title: "Rishabh Pant's fighting knock of 67*(38)", date: "5 days ago", views: "445K views" }
  ];

  const topPerformers = [
    { name: "Sai Sudharsan", runs: 759, team: "GT", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=200&fit=crop" },
    { name: "Virat Kohli", runs: 741, team: "RCB", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop" },
    { name: "Ruturaj Gaikwad", runs: 689, team: "CSK", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200&h=200&fit=crop" }
  ];

  const latestVideos = [
    { title: "All Direct Hits from TATA IPL 2023", date: "2 days ago", views: "1.2M views" },
    { title: "Learnings, ambitions and conquering dreams with...", date: "1 week ago", views: "890K views" },
    { title: "IPL 2023 Final: RCB vs PBKS - Amazing Moments", date: "3 days ago", views: "567K views" },
    { title: "Rajat Patidar & Krunal Pandya: A story of Trust &...", date: "5 days ago", views: "445K views" }
  ];

  const latestNews = [
    { title: "TATA IPL 2023, Final: RCB vs PBKS - Match Report", date: "2 hours ago" },
    { title: "Code of Conduct Breach - Qualifier 2: PBKS vs MI", date: "1 day ago" },
    { title: "TATA IPL 2023, Qualifier 2: PBKS vs MI - Match Report", date: "2 days ago" },
    { title: "TATA IPL 2023, Eliminator: KKR vs MI - Match Report", date: "3 days ago" }
  ];

  const results = [
    { team1: "SRH", score1: "188/8", team2: "RCB", score2: "231/8", result: "SUNRISERS HYDERABAD WON BY 42 RUNS", venue: "Rajiv Gandhi Stadium", potm: "Krunal Pandya" },
    { team1: "RCB", score1: "190/9", team2: "MI", score2: "184/7", result: "ROYAL CHALLENGERS BENGALURU WON BY 6 RUNS", venue: "M. Chinnaswamy Stadium", potm: "Krunal Pandya" },
    { team1: "PBKS", score1: "207/5", team2: "KKR", score2: "203/6", result: "PUNJAB KINGS WON BY 5 WICKETS", venue: "IS Bindra Stadium", potm: "Krunal Pandya" }
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 sm:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={heroSlides[currentSlide].image}
            alt="Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-md">
                <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-white text-lg mb-6">{heroSlides[currentSlide].date}</p>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition"
          onClick={() => setCurrentSlide(currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1)}
        >
          ←
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition"
          onClick={() => setCurrentSlide(currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1)}
        >
          →
        </button>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Good Evening Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Good Evening!</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {popularPlayers.map((player, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={player.image}
                    alt={player.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white text-sm font-medium">{player.name}</p>
              </div>
            ))}
          </div>
        </section>

      

        {/* Magic Moments Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Magic Moments</h2>
           
          </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {magicMoments.map((moment, index) => (
               <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
                 <div className="h-40 bg-gray-700 relative">
                   <Image
                     src={`https://images.unsplash.com/photo-${index === 0 ? '1544551763-46a013bb70d5' : index === 1 ? '1571019613454-1cb2f99b2d8b' : index === 2 ? '1540747913346-19e32dc3e97e' : '1578662996442-48f60103fc96'}?w=300&h=160&fit=crop`}
                     alt={moment.title}
                     width={300}
                     height={160}
                     className="w-full h-full object-cover"
                   />
                 </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{moment.title}</h3>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>{moment.date}</span>
                    <span>{moment.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Points Table Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Points Table</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data?.pointsTable?.slice(0, 5).map((team, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2">{team.name}</h3>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>P: {team.played} W: {team.won} L: {team.lost}</div>
                  <div>NRR: {team.nrr}</div>
                </div>
                <div className="mt-3">
                  <div className="text-gray-400 text-xs mb-1">Recent Form</div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < 3 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </section>

  


        {/* Latest Videos Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Latest Videos</h2>
            
          </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {latestVideos.map((video, index) => (
               <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition">
                 <div className="h-40 bg-gray-700 relative">
                   <Image
                     src={`https://images.unsplash.com/photo-${index === 0 ? '1551698618-1dfe5d97d256' : index === 1 ? '1578662996442-48f60103fc96' : index === 2 ? '1544551763-46a013bb70d5' : '1571019613454-1cb2f99b2d8b'}?w=300&h=160&fit=crop`}
                     alt={video.title}
                     width={300}
                     height={160}
                     className="w-full h-full object-cover"
                   />
                 </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>{video.date}</span>
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement Zone Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                🏆
              </div>
              <h3 className="text-white font-bold text-lg mb-2">VIEWERS CHOICE</h3>
              <p className="text-white text-sm">Choose your favourite player and create your dream XI. The choice is yours!</p>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                📊
              </div>
              <h3 className="text-white font-bold text-lg mb-2">FAN POLL</h3>
              <p className="text-white text-sm">Who will win the title?</p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                🎮
              </div>
              <h3 className="text-white font-bold text-lg mb-2">DON'T JUST WATCH IPL, PLAY IT!</h3>
              <p className="text-white text-sm">Don't just watch IPL, be a part of it. Create your dream XI and win exciting prizes.</p>
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Latest News</h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
                <h3 className="text-white font-semibold mb-2 line-clamp-3">{news.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{news.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">RESULTS</h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-white font-bold text-lg mb-2">
                    {result.team1} {result.score1} vs {result.team2} {result.score2}
                  </div>
                  <div className="text-green-400 font-semibold text-sm">{result.result}</div>
                </div>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>Venue: {result.venue}</div>
                  <div>Player of the Match: {result.potm}</div>
                </div>
              </div>
            ))}
          </div>
          
        </section>

        {/* App Download Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get the official IPL App</h2>
          <p className="text-white text-lg mb-6">Download the official IPL app for live scores, highlights, and exclusive content.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Google Play
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              App Store
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Team</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Current Teams</li>
                <li>Squads</li>
                <li>Player Stats</li>
                <li>Player Auction</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Anti Corruption Unit</li>
                <li>Anti Doping Team</li>
                <li>Code of Conduct</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Guidelines</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>IPL Code of Conduct</li>
                <li>Media Guidelines</li>
                <li>Anti Racism Policy</li>
                <li>Player Regulations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">Copyright © 2007-2025 All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
