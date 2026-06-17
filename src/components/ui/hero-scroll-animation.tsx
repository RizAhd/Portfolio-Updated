'use client';

import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion';
import React, { useRef, forwardRef } from 'react';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const IMAGES = [
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70&auto=format&fit=crop',
];

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky top-0 flex h-screen flex-col items-center justify-center bg-gradient-to-t from-[#ebebeb] to-[#dadada] font-semibold text-black'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <h1 className='px-6 text-center text-4xl font-semibold leading-[120%] tracking-tight sm:text-5xl md:text-6xl 2xl:text-7xl'>
        Scalable apps. Intelligent AI.
        <br />
        Real-time systems. <span className='text-yellow-500'>Scroll</span> 👇
      </h1>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t from-[#06060e] to-[#1a1919] text-white'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container relative z-10 mx-auto px-4 sm:px-6'>
        <h1 className='py-8 text-3xl font-semibold leading-[110%] tracking-tight sm:text-5xl sm:py-10 md:text-6xl'>
          Full-stack engineering,
          <br />
          meets applied AI.
        </h1>
        <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4'>
          {IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt='Riflan Mohamed — work'
              loading='lazy'
              className='h-40 w-full rounded-md object-cover sm:h-full'
            />
          ))}
        </div>
      </article>
    </motion.section>
  );
};

const Component = forwardRef<HTMLElement>((_props, _ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className='relative h-[200vh] bg-black'>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <footer className='group bg-[#06060e]'>
        <h1 className='translate-y-16 bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-center text-[16vw] font-semibold uppercase leading-[100%] text-transparent transition-all ease-linear sm:translate-y-20'>
          Riflan
        </h1>
        <div className='relative z-10 grid h-32 place-content-center rounded-tl-full rounded-tr-full bg-black text-2xl text-white sm:h-40'></div>
      </footer>
    </main>
  );
});

Component.displayName = 'Component';

export default Component;
