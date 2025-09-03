import { useState } from "react";
import Link from "next/link";
import React from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-3 sm:p-4">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
          <div className="text-white font-bold text-xl sm:text-2xl">TATA IPL</div>
        </Link>

        <nav className="hidden md:flex space-x-6 lg:space-x-8 text-white font-semibold">
          {['Matches', 'News', 'Teams', 'Stats', 'Points Table'].map((item) => (
            <Link key={item} href={item === 'Points Table' ? '/points-table' : item === 'Teams' ? '/teams' : item === 'Stats' ? '/stats' : item === 'News' ? '/news' : item === 'Matches' ? '/matches' : '#'} className="hover:text-yellow-400 transition text-sm lg:text-base">
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4 text-white">
          <button className="hover:text-yellow-400 transition">Follow Us</button>
          
        </div>

        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className={`${open ? 'block' : 'hidden'} md:hidden absolute top-full left-0 bg-blue-900 w-full p-4 shadow-lg`}> 
          <nav className="flex flex-col space-y-3 text-white font-semibold">
            {['Matches', 'News', 'Teams', 'Stats', 'Points Table',].map((item) => (
              <Link 
                key={item} 
                href={item === 'Points Table' ? '/points-table' : item === 'Teams' ? '/teams' : item === 'Stats' ? '/stats' : item === 'News' ? '/news' : item === 'Matches' ? '/matches' : '#'} 
                className="hover:text-yellow-400 transition py-2 border-b border-blue-800 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
