'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const partners = [
  { name: 'World Food Programme', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'IFAD', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'InsuResilience Solutions Fund', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'The World Bank', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'Mastercard Foundation', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'Blue Orchard', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'Bill & Melinda Gates Foundation', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'UK Aid', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'USAID', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'AGRA', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'African Development Bank Group', src: '/images/svgs/google.png?height=100&width=100' },
  { name: 'Shell Foundation', src: '/images/svgs/google.png?height=100&width=100' },
];

const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, inView] as const;
};

const PartnerLogo = ({
  partner,
  index,
}: {
  partner: { name: string; src: string };
  index: number;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src={partner.src}
        alt={partner.name}
        width={100}
        height={100}
        className="object-contain"
      />
    </motion.div>
  );
};

export default function Partners() {
  const controls = useAnimation();
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="p-8 bg-white min-h-screen">
      <motion.h1
        ref={ref}
        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-16 max-w-5xl mx-auto leading-tight"
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        We&apos;re constantly building impact with{' '}
        <span className="text-green-500">our partners...</span>
      </motion.h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 max-w-7xl mx-auto">
        {partners.map((partner, index) => (
          <PartnerLogo key={partner.name} partner={partner} index={index} />
        ))}
      </div>
      <img
        src="/images/landingpage/world-map.png"
        alt="Agricultural Insights"
        style={{ marginTop: '60px' }}
        className="mx-auto"
      />
    </div>
  );
}
