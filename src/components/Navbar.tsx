
import React from 'react';
import { Search, Bell, User} from 'lucide-react';
import Link from 'next/link';




const Navbar= () => {


  return (
    <nav className="bg-[#030303]/95 backdrop-blur-sm border-b border-white/[0.08] px-4 lg:px-6 py-2.5 sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          {/* {onSidebarToggle && (
            <button
              onClick={onSidebarToggle}
              className="p-2 mr-2 text-white/60 rounded cursor-pointer lg:hidden hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <Menu size={20} />
            </button>
          )} */}
          
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-rose-500 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              LearnHub
            </span>
          </div>
        </div>

        <div className="flex items-center lg:order-2 space-x-2">
          <div className="hidden lg:flex relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-white/40" />
            </div>
            <input
              type="text"
              className="bg-white/[0.03] border border-white/[0.08] text-white text-sm rounded-lg focus:ring-indigo-500/50 focus:border-indigo-500/50 block w-80 pl-10 p-2.5 placeholder:text-white/40"
              placeholder="Search courses, topics..."
            />
          </div>

          <div className='text-white mx-3 ' >
              <Link href={'/dashboard'} >Dashboard</Link>
          </div>

         

          <button className="p-2 text-white/60 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-rose-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-white/40 capitalize">{"user"}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
