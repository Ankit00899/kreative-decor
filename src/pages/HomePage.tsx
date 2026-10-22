import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Heart,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Palette,
  Phone,
  MessageCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_LIST, TESTIMONIALS, FAQS } from '../data/initialData';
import { ServiceCard } from '../components/ServiceCard';
import { BookingModal } from '../components/BookingModal';
import { LightboxModal } from '../components/LightboxModal';
import { ServiceItem } from '../types';

export const HomePage: React.FC = () => {
  const { services, gallery, settings, formatPrice } = useApp();
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Copied code feedback
  const [copiedCode, setCopiedCode] = useState(false);
  const [homeGalleryTab, setHomeGalleryTab] = useState<'all' | 'wedding' | 'baby-shower' | 'anniversary' | 'balloon' | 'birthday'>('all');

  const bestSellers = services.filter((s) => s.isBestSeller && s.isPublished);
  const trendingServices = services.filter((s) => s.isTrending && s.isPublished);
  const anniversaryServices = services.filter((s) => s.category === 'anniversary' && s.isPublished);
  const balloonServices = services.filter((s) => s.category === 'balloon' && s.isPublished);
  const babyShowerServices = services.filter((s) => s.category === 'baby-shower' && s.isPublished);
  const weddingServices = services.filter((s) => s.category === 'wedding' && s.isPublished);

  const displayedHomeGallery = React.useMemo(() => {
    if (homeGalleryTab === 'all') {
      const wed = gallery.filter((g) => g.category === 'wedding');
      const baby = gallery.filter((g) => g.category === 'baby-shower');
      const anniv = gallery.filter((g) => g.category === 'anniversary');
      const balloon = gallery.filter((g) => g.category === 'balloon');
      return [
        ...wed.slice(0, 2),
        ...baby.slice(0, 2),
        ...anniv.slice(0, 2),
        ...balloon.slice(0, 2),
      ];
    }
    return gallery.filter((g) => g.category === homeGalleryTab);
  }, [gallery, homeGalleryTab]);

  const openBookingWithService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#29252A]">
        {/* Background image with cinematic gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={
              settings.heroBackgroundImage ||
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85'
            }
            alt="Luxury Event Decoration Setup"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#29252A] via-[#29252A]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#701F3D]/20 to-[#29252A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D6B36A]/50 text-[#D6B36A] text-xs font-semibold mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-[#D6B36A]" />
            <span>
              {settings.heroBadgeText ||
                `Curated by ${settings.ownerName || 'Kamal Kumar'} • Sector 7, Sector 51, Sector 12, Noida`}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            {settings.heroTitle || 'We Make Every Celebration Unforgettable.'}
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            {settings.heroSubtitle ||
              'From dreamy birthdays to romantic anniversaries, we transform your special moments into beautiful memories with bespoke balloon arches, fresh florals, and fairy lighting.'}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D6B36A] hover:bg-[#B9944A] text-[#29252A] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Explore Decorations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                setSelectedServiceForBooking(null);
                setIsBookingModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#701F3D] hover:bg-[#8A264B] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all border border-[#D6B36A]/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D6B36A]" />
              <span>Book Your Event</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">
                {settings.completedEventsCount ? `${settings.completedEventsCount.toLocaleString('en-IN')}+` : '1,450+'}
              </p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Events Styled</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">
                {settings.experienceYears ? `${settings.experienceYears}+ Yrs` : '7+ Yrs'}
              </p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Experience</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">100%</p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">On-Time Setup</p>
            </div>
            <div>
              <p className="font-serif text-2xl md:text-3xl font-bold text-[#D6B36A]">
                100%
              </p>
              <p className="text-[11px] text-gray-300 uppercase tracking-wider mt-0.5">Custom Themes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            Tailored For Every Milestone
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
            Featured Event Categories
          </h2>
          <p className="text-sm text-gray-600">
            Browse our signature decoration collections tailored specifically for birthdays, anniversaries, intimate romantic setups, and grand weddings.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col bg-white border border-[#F8E7EC]"
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-gray-100 relative">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallbackApplied) {
                      target.dataset.fallbackApplied = 'true';
                      if (category.slug === 'wedding') {
                        target.src = '/wedding/wedding_mandap_stage.jpg';
                      } else if (category.slug === 'baby-shower') {
                        target.src = '/babyshower/baby_24x7_18.png';
                      } else if (category.slug === 'anniversary') {
                        target.src = '/anniversary/anniversary1.jpeg';
                      } else if (category.slug === 'balloon') {
                        target.src = '/balloon/balloon_restaurant_hall.jpg';
                      } else {
                        target.src = '/birthday/birthday15.jpeg';
                      }
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-semibold text-[#D6B36A] uppercase tracking-wider block">
                    Bespoke Decor
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-[#D6B36A] transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-3 bg-white flex items-center justify-between text-xs text-gray-600">
                <span className="truncate">{category.tagline}</span>
                <ChevronRight className="w-4 h-4 text-[#701F3D] group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Best-Selling Decoration Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Signature Decoration Packages
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Hand-picked packages styled and booked most frequently across Delhi NCR and Lucknow.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 3B. Dedicated Romantic Anniversary & Milestone Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Romantic Milestones & Celebrations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Anniversary Decoration Collections
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              From intimate candlelit master suite surprises to 50th Golden Jubilee arches and beachfront fairy canopies.
            </p>
          </div>

          <Link
            to="/category/anniversary"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>View All {anniversaryServices.length} Anniversary Setups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anniversaryServices.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 3C. Dedicated Baby Shower & Welcome Baby Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Welcoming Your Little Miracle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Baby Shower & Welcome Baby Decor
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Cute teddy bear on the moon, marquee letter blocks, royal mom-to-be sequin stages, and pastel cloud arches.
            </p>
          </div>

          <Link
            to="/category/baby-shower"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>View All {babyShowerServices.length} Baby Shower Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {babyShowerServices.slice(0, 6).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 3D. Dedicated Royal Wedding & Reception Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Opulent Matrimonial Grandeur
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Wedding & Reception Stage Decor
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Royal mandap setups, enchanted fresh floral arches, ceremonial bridal walkways, and luxury banquet guest dining.
            </p>
          </div>

          <Link
            to="/category/wedding"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>View All {weddingServices.length} Wedding Setups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weddingServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 4. Direct WhatsApp Booking Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#701F3D] via-[#52132A] to-[#29252A] text-white p-8 sm:p-12 shadow-2xl border border-[#D6B36A]/30">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B36A] text-[#29252A] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Booking</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Plan Your Celebration with Kamal Kumar
            </h3>

            <p className="text-sm text-white/80 leading-relaxed">
              Planning a birthday, anniversary, wedding, or haldi celebration? Share your required details directly on WhatsApp to get tailored styling suggestions and instant date confirmation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedServiceForBooking(null);
                  setIsBookingModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Book on WhatsApp Now</span>
              </button>

              <a
                href={`tel:${settings.phoneNumber.replace(/[^0-9]/g, '')}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>Call Kamal Kumar: {settings.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trending Decoration Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Viral & Aesthetic
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Trending Celebrations
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Unique photo-worthy setups including romantic cabanas, floral arches, and milestone marquee numbers.
            </p>
          </div>

          <Link
            to="/services?sort=popularity"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>See Trending Setups</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingServices.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onQuickBook={openBookingWithService}
            />
          ))}
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section className="bg-[#F8E7EC]/40 py-16 border-y border-[#F8E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-xs">
              Simple 4-Step Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
              How Booking Works
            </h2>
            <p className="text-sm text-gray-600">
              We eliminate stress so you can simply arrive and immerse yourself in the celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Choose Theme</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore our catalog of balloon rings, rose canopies, baby showers, or custom themes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Customize & Add-ons</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pick your favorite color palette, personalized name foil, cakes, or marquee lighting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Submit Booking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Receive instant reference ID. Founder Kamal Kumar contacts you to lock timings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#F8E7EC] text-center space-y-3 relative">
              <div className="w-12 h-12 rounded-full bg-[#701F3D] text-[#D6B36A] font-serif font-bold text-xl flex items-center justify-center mx-auto">
                4
              </div>
              <h3 className="font-serif text-lg font-bold text-[#29252A]">Flawless Setup</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our professional crew sets up on-site with clean equipment, leaving your venue spotless after.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real Event Gallery Preview with Lightbox */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Visual Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A] mt-2">
              Recent Event Setups
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Click on any photograph to view high-resolution details and location.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#701F3D] hover:text-[#52132A] uppercase tracking-wider"
          >
            <span>Explore Full Gallery ({gallery.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2">
          {[
            { id: 'all', label: 'Featured Highlights' },
            { id: 'wedding', label: `Wedding Stages (${gallery.filter((g) => g.category === 'wedding').length})` },
            { id: 'baby-shower', label: `Baby Shower (${gallery.filter((g) => g.category === 'baby-shower').length})` },
            { id: 'anniversary', label: `Anniversary Special (${gallery.filter((g) => g.category === 'anniversary').length})` },
            { id: 'balloon', label: `Balloon Decor (${gallery.filter((g) => g.category === 'balloon').length})` },
            { id: 'birthday', label: `Birthday Setups (${gallery.filter((g) => g.category === 'birthday').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setHomeGalleryTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                homeGalleryTab === tab.id
                  ? 'bg-[#701F3D] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-[#F8E7EC] border border-[#F8E7EC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayedHomeGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setLightboxIndex(index);
                setLightboxOpen(true);
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackApplied) {
                    target.dataset.fallbackApplied = 'true';
                    if (item.category === 'wedding') {
                      target.src = '/wedding/wedding_mandap_stage.jpg';
                    } else if (item.category === 'baby-shower') {
                      target.src = '/babyshower/baby_24x7_18.png';
                    } else if (item.category === 'anniversary') {
                      target.src = '/anniversary/anniversary1.jpeg';
                    } else if (item.category === 'balloon') {
                      target.src = '/balloon/balloon_restaurant_hall.jpg';
                    } else {
                      target.src = '/birthday15.jpeg';
                    }
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] text-[#D6B36A] font-semibold">{item.categoryLabel}</span>
                <p className="text-xs font-bold font-serif line-clamp-1">{item.title}</p>
                {item.eventLocation && (
                  <p className="text-[10px] text-gray-300">{item.eventLocation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="bg-white py-16 border-t border-[#F8E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
              Real Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
              What Our Happy Clients Say
            </h2>
            <p className="text-sm text-gray-600">
              Verified feedback from families and couples who trusted Kreative Decor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FFFCFA] p-6 rounded-2xl border border-[#F8E7EC] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D6B36A]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F8E7EC] space-y-0.5">
                  <p className="text-xs font-bold text-[#29252A]">{t.name}</p>
                  <p className="text-[11px] text-[#701F3D] font-medium">{t.event}</p>
                  <p className="text-[10px] text-gray-400">{t.location} • {t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-[#701F3D] uppercase tracking-widest bg-[#F8E7EC] px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29252A]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-600">
            Everything you need to know about setup timelines, customizations, and booking.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-[#F8E7EC] p-5 [&_summary::-webkit-details-marker]:hidden shadow-xs"
            >
              <summary className="flex items-center justify-between cursor-pointer font-serif text-base font-bold text-[#29252A] group-open:text-[#701F3D]">
                <span>{faq.q}</span>
                <span className="text-lg font-mono text-[#701F3D] group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-[#F8E7EC] pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Direct Connect Callout for Kamal Kumar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#29252A] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-[#D6B36A]">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6B36A]">
              Have a Custom Request or Date in Mind?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Speak Directly with Kamal Kumar
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Get an instant quote, check availability, or discuss custom color themes for your birthday, anniversary, wedding, or haldi decor.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${settings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hi Kamal Kumar, I would like to discuss a customized event decoration package.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20b857] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Kamal Kumar</span>
            </a>

            <a
              href={`tel:${settings.phoneNumber.replace(/[^0-9]/g, '')}`}
              className="px-6 py-3 rounded-xl bg-[#701F3D] hover:bg-[#8A264B] text-white text-xs font-bold shadow-md transition-all border border-[#D6B36A]/40 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D6B36A]" />
              <span>Call: {settings.phoneNumber}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={selectedServiceForBooking}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={displayedHomeGallery}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onBookStyle={(item) => {
          setLightboxOpen(false);
          setIsBookingModalOpen(true);
        }}
      />
    </div>
  );
};
