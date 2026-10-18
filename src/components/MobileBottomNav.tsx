import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Heart, Calendar, Grid } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { wishlist, bookings, currentUser } = useApp();

  const userPendingCount = bookings.filter((b) => {
    if (!currentUser) return b.status === 'Pending';
    return (b.userId === currentUser.id || b.customerEmail === currentUser.email) && b.status === 'Pending';
  }).length;

  // Don't show bottom nav inside admin panel
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const isHome = location.pathname === '/';
  const isServices = location.pathname.startsWith('/services') || location.pathname.startsWith('/category');
  const isWishlist = location.pathname === '/profile' && location.search.includes('wishlist');
  const isBookings = location.pathname === '/my-bookings';
  const isBookNow = location.pathname === '/inquiry';

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-t border-[#F8E7EC] shadow-[0_-4px_25px_rgba(112,31,61,0.08)] px-2 pt-2 pb-[max(0.65rem,env(safe-area-inset-bottom))] transition-all"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-end justify-items-center relative">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-1 w-full rounded-xl transition-all ${
            isHome ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5] text-[#701F3D]' : 'stroke-[1.75]'}`} />
          <span className={`text-[11px] mt-1 leading-none ${isHome ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Home
          </span>
        </Link>

        {/* 2. Services */}
        <Link
          to="/services"
          className={`flex flex-col items-center justify-center py-1 px-1 w-full rounded-xl transition-all ${
            isServices ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <Grid className={`w-5 h-5 ${isServices ? 'stroke-[2.5] text-[#701F3D]' : 'stroke-[1.75]'}`} />
          <span className={`text-[11px] mt-1 leading-none ${isServices ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Services
          </span>
        </Link>

        {/* 3. Center Floating "Book Event" Button */}
        <Link
          to="/inquiry"
          className="flex flex-col items-center justify-center -translate-y-2 group w-full"
          title="Book Your Celebration"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#701F3D] to-[#8A264B] text-white flex items-center justify-center shadow-md border-2 border-[#D6B36A] group-hover:scale-105 group-active:scale-95 transition-all">
            <Sparkles className="w-5 h-5 text-[#D6B36A] animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-[#701F3D] mt-0.5 tracking-tight whitespace-nowrap">
            Book Event
          </span>
        </Link>

        {/* 4. Likes / Wishlist */}
        <Link
          to="/profile?tab=wishlist"
          className={`flex flex-col items-center justify-center py-1 px-1 w-full rounded-xl transition-all relative ${
            isWishlist ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
          title="Likes & Wishlist"
        >
          <div className="relative flex items-center justify-center">
            <Heart className={`w-5 h-5 ${isWishlist ? 'stroke-[2.5] fill-[#701F3D] text-[#701F3D]' : 'stroke-[1.75]'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#701F3D] text-white text-[9px] font-bold px-1 rounded-full min-w-[15px] h-[15px] flex items-center justify-center border border-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className={`text-[11px] mt-1 leading-none ${isWishlist ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Likes
          </span>
        </Link>

        {/* 5. My Bookings */}
        <Link
          to="/my-bookings"
          className={`flex flex-col items-center justify-center py-1 px-1 w-full rounded-xl transition-all relative ${
            isBookings ? 'text-[#701F3D]' : 'text-gray-500 hover:text-[#701F3D]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Calendar className={`w-5 h-5 ${isBookings ? 'stroke-[2.5] text-[#701F3D]' : 'stroke-[1.75]'}`} />
            {userPendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
            )}
          </div>
          <span className={`text-[11px] mt-1 leading-none ${isBookings ? 'font-bold text-[#701F3D]' : 'font-medium'}`}>
            Bookings
          </span>
        </Link>
      </div>
    </nav>
  );
};
