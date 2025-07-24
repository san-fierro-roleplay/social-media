import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center pt-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Sidebar (Profile/Shortcuts) */}
        <aside className="hidden md:block w-1/4">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <img src="https://placehold.co/48x48" alt="Profile" className="rounded-full w-12 h-12 border-2 border-blue-400" />
              <div>
                <div className="font-bold text-blue-700">Your Name</div>
                <div className="text-sm text-gray-500">View your profile</div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-sm text-gray-700 font-semibold mb-1">Shortcuts</div>
            <ul className="space-y-1">
              <li><a href="#" className="text-blue-600 hover:underline">Friends</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Groups</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Marketplace</a></li>
            </ul>
          </div>
        </aside>
        {/* Feed */}
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-xl">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold text-blue-700 mb-2">Welcome to MyFierro</h1>
              <p className="text-gray-700">Share what's new and connect with friends!</p>
            </div>
          </div>
        </main>
        <aside className="hidden md:block w-1/4"></aside>
      </div>
    </div>
  );
}

export default Home;