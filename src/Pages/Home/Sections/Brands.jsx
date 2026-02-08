// PartnerEcosystem.jsx
import { motion } from "framer-motion";
import { CheckCircle, Lock } from "lucide-react";
import { useEffect, useRef } from "react";

const Brands = () => {
  const scrollRef = useRef(null);

  // Financial Partners (NBFCs, Banks)
  const financialPartners = [
    {
      name: "HDFC Bank",
      logo: "https://logo.clearbit.com/hdfcbank.com",
      category: "Banking",
    },
    {
      name: "ICICI Bank",
      logo: "https://logo.clearbit.com/icicibank.com",
      category: "Banking",
    },
    {
      name: "Axis Bank",
      logo: "https://logo.clearbit.com/axisbank.com",
      category: "Banking",
    },
    {
      name: "Bajaj Finserv",
      logo: "https://logo.clearbit.com/bajajfinserv.in",
      category: "NBFC",
    },
    {
      name: "Tata Capital",
      logo: "https://logo.clearbit.com/tatacapital.com",
      category: "NBFC",
    },
    {
      name: "Mahindra Finance",
      logo: "https://logo.clearbit.com/mahindrafinance.com",
      category: "NBFC",
    },
    {
      name: "Kotak Mahindra",
      logo: "https://logo.clearbit.com/kotak.com",
      category: "Banking",
    },
    {
      name: "IndusInd Bank",
      logo: "https://logo.clearbit.com/indusind.com",
      category: "Banking",
    },
  ];

  // Merchant Partners
  const merchantPartners = [
    {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
      category: "E-commerce",
    },
    {
      name: "Flipkart",
      logo: "https://logo.clearbit.com/flipkart.com",
      category: "E-commerce",
    },
    {
      name: "Apple",
      logo: "https://logo.clearbit.com/apple.com",
      category: "Electronics",
    },
    {
      name: "Samsung",
      logo: "https://logo.clearbit.com/samsung.com",
      category: "Electronics",
    },
    {
      name: "Walmart",
      logo: "https://logo.clearbit.com/walmart.com",
      category: "Retail",
    },
    {
      name: "Home Depot",
      logo: "https://logo.clearbit.com/homedepot.com",
      category: "Home Improvement",
    },
    {
      name: "Best Buy",
      logo: "https://logo.clearbit.com/bestbuy.com",
      category: "Electronics",
    },
    {
      name: "Target",
      logo: "https://logo.clearbit.com/target.com",
      category: "Retail",
    },
  ];

  // Technology Partners
  const technologyPartners = [
    {
      name: "Stripe",
      logo: "https://logo.clearbit.com/stripe.com",
      category: "Payment",
    },
    {
      name: "PayPal",
      logo: "https://logo.clearbit.com/paypal.com",
      category: "Payment",
    },
    {
      name: "Razorpay",
      logo: "https://logo.clearbit.com/razorpay.com",
      category: "Payment",
    },
    {
      name: "AWS",
      logo: "https://logo.clearbit.com/aws.amazon.com",
      category: "Cloud",
    },
    {
      name: "Google Cloud",
      logo: "https://logo.clearbit.com/cloud.google.com",
      category: "Cloud",
    },
    {
      name: "Cloudflare",
      logo: "https://logo.clearbit.com/cloudflare.com",
      category: "Security",
    },
    {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
      category: "Technology",
    },
    {
      name: "Plaid",
      logo: "https://logo.clearbit.com/plaid.com",
      category: "FinTech",
    },
  ];

  const cobrands = [
    {
      title: "Amazon Shopping Card",
      offer: "5% Cashback + No Interest for 6 months",
      logo: "https://logo.clearbit.com/amazon.com",
      gradient: "from-blue-300 to-indigo-500",
    },
    {
      title: "Apple Finance Program",
      offer: "0% APR for 12 months on Apple Products",
      logo: "https://logo.clearbit.com/apple.com",
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      title: "HDFC Co-branded Loan",
      offer: "8% Interest Rate + Zero Processing Fee",
      logo: "https://logo.clearbit.com/hdfcbank.com",
      gradient: "from-blue-600 to-indigo-700",
    },
  ];

  // Auto-scroll animation for infinite carousel
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section
      className="py-14 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Infinite Scrolling Logo Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3
            className="text-2xl font-bold text-center mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            Trusted By Global Leaders
          </h3>

          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[var(--bg)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[var(--bg)] to-transparent z-10" />

            {/* Scrolling Container */}
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-hidden py-6"
              style={{ scrollBehavior: "auto" }}
            >
              {/* Duplicate logos for infinite scroll */}
              {[
                ...financialPartners,
                ...merchantPartners,
                ...technologyPartners,
                ...financialPartners,
                ...merchantPartners,
                ...technologyPartners,
              ].map((partner, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.01, y: -5 }}
                  className="shrink-0 cursor-pointer w-32 h-20 rounded-xl p-4 flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full rounded-3xl  max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${partner.name}&background=random`;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Co-branded Offers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-3xl font-bold text-center mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Exclusive Co-branded Offers
          </h3>
          <p
            className="text-center mb-12 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Special financing programs designed in partnership with leading
            brands
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {cobrands.map((cobrand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${cobrand.gradient}`}
                />

                {/* Content */}
                <div className="relative z-10 p-8 text-white">
                  <div className="w-16 h-16 bg-white rounded-xl p-3 mb-4 flex items-center justify-center">
                    <img
                      src={cobrand.logo}
                      alt={cobrand.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${cobrand.title}&background=random`;
                      }}
                    />
                  </div>

                  <h4 className="text-xl font-bold mb-3">{cobrand.title}</h4>

                  <div className="flex items-start gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold">{cobrand.offer}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 px-4 bg-white text-gray-900 rounded-xl font-bold hover:shadow-lg transition-shadow"
                  >
                    Learn More
                  </motion.button>
                </div>

                {/* Shine Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          <Lock
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--primary)" }}
          />
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Protected By The Best
          </h3>
          <p
            className="mb-6 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Our partnerships ensure your data is secure, payments are seamless,
            and you get the best rates in the market.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Explore Partnership Benefits
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
