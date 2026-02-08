// CustomerFeedback.jsx
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, MapPin, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const CustomerFeedback = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment:
        "GrameenLoan made it incredibly easy to get funding for my bakery expansion. The process was smooth, transparent, and the support team was amazing!",
      loanAmount: "$5,000",
      purpose: "Business Expansion",
      location: "New York, USA",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Freelance Designer",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      comment:
        "I needed quick funds for new equipment. GrameenLoan approved my loan within hours and the money was in my account the next day. Highly recommended!",
      loanAmount: "$3,500",
      purpose: "Equipment Purchase",
      location: "California, USA",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Student",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      comment:
        "As a student, I was worried about getting a loan. GrameenLoan's flexible repayment options made it possible for me to pursue my education without stress.",
      loanAmount: "$2,000",
      purpose: "Education",
      location: "Texas, USA",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      id: 4,
      name: "David Patel",
      role: "Restaurant Owner",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 5,
      comment:
        "Outstanding service! The interest rates were fair, and the entire process was transparent. GrameenLoan helped me renovate my restaurant during tough times.",
      loanAmount: "$8,000",
      purpose: "Renovation",
      location: "Florida, USA",
      gradient: "from-orange-500 to-amber-600",
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Marketing Consultant",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment:
        "The customer support at GrameenLoan is exceptional. They answered all my questions and made sure I understood every detail of my loan agreement.",
      loanAmount: "$4,200",
      purpose: "Working Capital",
      location: "Illinois, USA",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      id: 6,
      name: "Robert Anderson",
      role: "Farmer",
      image: "https://i.pravatar.cc/150?img=6",
      rating: 5,
      comment:
        "GrameenLoan understands the needs of small farmers. Their microloan helped me buy seeds and equipment for the season. Forever grateful!",
      loanAmount: "$6,500",
      purpose: "Agricultural Supplies",
      location: "Iowa, USA",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Show 3 cards at a time (active card in center)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (activeIndex + i + testimonials.length) % testimonials.length;
      cards.push({ ...testimonials[index], offset: i });
    }
    return cards;
  };

  return (
    <section
      className="py-14 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Star className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "white" }}
            >
              Rated 4.9/5 by Our Customers
            </span>
          </motion.div>

          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Trusted by Thousands
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Real stories from real people who achieved their financial goals
            with GrameenLoan
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative h-[450px] mb-12">
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map((testimonial, idx) => {
              const isActive = testimonial.offset === 0;
              const position = testimonial.offset;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{
                    x: position * 400,
                    scale: isActive ? 1 : 0.8,
                    opacity: 0,
                    zIndex: isActive ? 10 : 1,
                  }}
                  animate={{
                    x: position * 380,
                    scale: isActive ? 1 : 0.85,
                    opacity: Math.abs(position) > 1 ? 0 : isActive ? 1 : 0.4,
                    zIndex: isActive ? 10 : 1,
                  }}
                  exit={{
                    x: position * 400,
                    scale: 0.8,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 cursor-pointer"
                  onClick={() =>
                    !isActive &&
                    setActiveIndex(
                      testimonials.findIndex((t) => t.id === testimonial.id)
                    )
                  }
                  style={{
                    pointerEvents: Math.abs(position) > 1 ? "none" : "auto",
                  }}
                >
                  <motion.div
                    whileHover={isActive ? { y: -5 } : {}}
                    className="rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: isActive
                        ? "3px solid var(--primary)"
                        : "2px solid var(--border)",
                    }}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5`}
                    />

                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-6 right-6 opacity-10"
                    >
                      <Quote
                        className="w-20 h-20"
                        style={{ color: "var(--primary)" }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Customer Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="relative"
                        >
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover ring-4 ring-offset-2"
                            style={{
                              ringColor: "var(--primary)",
                              ringOffsetColor: "var(--surface)",
                            }}
                          />
                          <div
                            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "var(--success)" }}
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <h4
                            className="font-bold text-lg"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {testimonial.name}
                          </h4>
                          <p
                            className="text-sm flex items-center gap-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <Briefcase className="w-3 h-3" />
                            {testimonial.role}
                          </p>
                          <p
                            className="text-xs flex items-center gap-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <Star
                              className="w-5 h-5 fill-current"
                              style={{ color: "var(--accent)" }}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Comment */}
                      <p
                        className="text-base leading-relaxed mb-6 line-clamp-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        "{testimonial.comment}"
                      </p>

                      {/* Loan Info */}
                      <div
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{
                          backgroundColor: "var(--bg)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div>
                          <p
                            className="text-xs mb-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Loan Amount
                          </p>
                          <p
                            className="text-xl font-black"
                            style={{ color: "var(--primary)" }}
                          >
                            {testimonial.loanAmount}
                          </p>
                        </div>
                        <div
                          className="h-10 w-px"
                          style={{ backgroundColor: "var(--border)" }}
                        />
                        <div className="text-right">
                          <p
                            className="text-xs mb-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            Purpose
                          </p>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {testimonial.purpose}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? "40px" : "10px",
                height: "10px",
                backgroundColor:
                  index === activeIndex ? "var(--primary)" : "var(--border)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg font-bold"
          >
            Start Your Success Story
          </motion.button>
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Join 10,000+ satisfied customers • No hidden fees • Quick approval
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
