import { useState } from "react";
import { FaHome, FaUserFriends, FaComments, FaBell } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 shadow-md border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Site Name */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight font-sans">
              MyFierro
            </Link>
            <div className="hidden md:flex gap-4 ml-6">
              <Link to="/" className="flex items-center gap-1 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaHome /> Home</Link>
              <a href="#" className="flex items-center gap-1 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaUserFriends /> Friends</a>
              <a href="#" className="flex items-center gap-1 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaComments /> Messages</a>
            </div>
          </div>
          {/* Center: Search */}
          <div className="flex-1 mx-2 max-w-xs hidden md:block">
            <input
              type="text"
              placeholder="Search MyFierro..."
              className="w-full px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
            />
          </div>
          {/* Right: Icons/Profile */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-blue-700 transition">
              <FaBell className="text-white text-lg" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <img
              src="https://placehold.co/40x40"
              alt="Profile"
              className="rounded-full w-8 h-8 border-2 border-white shadow-sm"
            />
            <button className="md:hidden ml-2 text-white" onClick={toggleMenu} aria-label="Toggle menu">
              {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out bg-blue-600 shadow ${menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          <Link to="/" className="flex items-center gap-2 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaHome /> Home</Link>
          <a href="#" className="flex items-center gap-2 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaUserFriends /> Friends</a>
          <a href="#" className="flex items-center gap-2 text-white/90 hover:bg-blue-700 px-3 py-1 rounded transition"><FaComments /> Messages</a>
          <input
            type="text"
            placeholder="Search MyFierro..."
            className="w-full px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-400"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;