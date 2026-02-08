import React from 'react';
import { Truck, Globe, Package, Banknote, Building2, RotateCcw } from 'lucide-react';

const OurServices = () => {
  const services = [
    {
      icon: Truck,
      title: "Express & Standard Delivery",
      description: "We deliver parcels within 24-72 hours in Dhaka city and 3-5 days in outside Dhaka. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
      highlighted: false
    },
    {
      icon: Globe,
      title: "Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district. Your products reach customers within 48-72 hours.",
      highlighted: true
    },
    {
      icon: Package,
      title: "Fulfillment Solution",
      description: "We also offer customized service with inventory management support, online order processing, packaging and other admin support.",
      highlighted: false
    },
    {
      icon: Banknote,
      title: "Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      highlighted: false
    },
    {
      icon: Building2,
      title: "Corporate Service / Contract in Logistics",
      description: "Customized corporate services which includes warehouse and inventory management support.",
      highlighted: false
    },
    {
      icon: RotateCcw,
      title: "Parcel Return",
      description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      highlighted: false
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-20 rounded-xl my-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and lean logistics from personal packages to business shipments — on time, every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  
  return (
    <div
      className={`group relative rounded-2xl p-8 transition-all duration-500 cursor-pointer overflow-hidden ${
        service.highlighted
          ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400'
          : 'bg-white/95 hover:bg-white'
      } hover:shadow-2xl hover:-translate-y-2 hover:scale-105`}
    >
      {/* Background decoration */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        service.highlighted ? 'bg-emerald-300/20' : 'bg-gradient-to-br from-emerald-400/10 to-teal-400/10'
      }`} />
      
      {/* Animated circle background */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${
          service.highlighted
            ? 'bg-white/30 backdrop-blur-sm'
            : 'bg-gradient-to-br from-emerald-400 to-teal-500'
        }`}>
          <Icon 
            className={`w-8 h-8 ${
              service.highlighted ? 'text-white' : 'text-white'
            }`} 
            strokeWidth={2}
          />
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
          service.highlighted
            ? 'text-white'
            : 'text-slate-800 group-hover:text-emerald-600'
        }`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
          service.highlighted
            ? 'text-white/90'
            : 'text-slate-600 group-hover:text-slate-700'
        }`}>
          {service.description}
        </p>

        {/* Decorative bottom line */}
        <div className={`mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full ${
          service.highlighted ? 'bg-white/40' : 'bg-gradient-to-r from-emerald-400 to-teal-500'
        }`} />
      </div>
    </div>
  );
};

export default OurServices;