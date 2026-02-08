import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="20" y="40" width="160" height="120" rx="8" fill="#f0fdf4" stroke="#34d399" strokeWidth="2"/>
          <circle cx="60" cy="80" r="8" fill="#34d399"/>
          <line x1="80" y1="80" x2="160" y2="80" stroke="#34d399" strokeWidth="2"/>
          <circle cx="60" cy="110" r="8" fill="#34d399"/>
          <line x1="80" y1="110" x2="140" y2="110" stroke="#34d399" strokeWidth="2"/>
          <circle cx="100" cy="70" r="25" fill="#34d399" opacity="0.2"/>
          <path d="M 90 70 L 95 75 L 110 60" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M 40 20 L 100 50 L 160 20" stroke="#34d399" strokeWidth="2" fill="none" strokeDasharray="4"/>
        </svg>
      ),
      title: "Live Parcel Tracking",
      description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="40" y="60" width="80" height="80" rx="8" fill="#f0fdf4" stroke="#34d399" strokeWidth="2"/>
          <circle cx="80" cy="100" r="15" fill="none" stroke="#34d399" strokeWidth="2"/>
          <path d="M 75 100 L 78 103 L 85 96" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M 100 50 L 140 80 L 140 140 L 100 170 L 60 140 L 60 80 Z" fill="none" stroke="#34d399" strokeWidth="3"/>
          <circle cx="100" cy="95" r="20" fill="#34d399" opacity="0.2"/>
          <path d="M 95 95 L 98 100 L 107 88" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      title: "100% Safe Delivery",
      description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    },
    {
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="80" r="30" fill="#f0fdf4" stroke="#34d399" strokeWidth="2"/>
          <circle cx="100" cy="70" r="12" fill="#34d399" opacity="0.3"/>
          <path d="M 80 95 Q 80 110, 100 120 Q 120 110, 120 95" fill="#34d399" opacity="0.3"/>
          <path d="M 50 120 Q 50 140, 60 150 L 60 170 L 140 170 L 140 150 Q 150 140, 150 120" fill="none" stroke="#34d399" strokeWidth="2"/>
          <rect x="65" y="130" width="70" height="40" rx="4" fill="#f0fdf4" stroke="#34d399" strokeWidth="2"/>
          <circle cx="85" cy="145" r="4" fill="#34d399"/>
          <circle cx="100" cy="145" r="4" fill="#34d399"/>
          <circle cx="115" cy="145" r="4" fill="#34d399"/>
          <path d="M 140 100 Q 160 100, 170 110 L 175 115" stroke="#34d399" strokeWidth="2" fill="none"/>
          <circle cx="178" cy="118" r="3" fill="#34d399"/>
        </svg>
      ),
      title: "24/7 Call Center Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
    }
  ];

  return (
    <div className="">
       <div className='my-14 text-gray-400'>
              --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       </div>
      <div className="max-w-7xl mx-auto space-y-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      <div className='my-10 text-gray-400'>
              --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       </div>
    </div>
  );
};

const FeatureCard = ({ feature }) => {
  return (
       <>
       
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-6">
        {/* Illustration */}
        <div className="flex-shrink-0 w-32 h-32 group-hover:scale-105 transition-transform duration-300">
          {feature.illustration}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default FeaturesSection;