'use client';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import github from '@/assets/github.png';
import netlify from '@/assets/netlify.png';
import nextjs from '@/assets/next.png';
import nodejs from '@/assets/node.png';
import react from '@/assets/react.png';
import vuejs from '@/assets/vue.png';
import redux from '@/assets/redux.png';
import tailwindcss from '@/assets/tw.png';
import typescript from '@/assets/ts.png';

const TechCard = ({
  name,
  url,
  image,
  invertOnDark,
}: {
  name: string;
  url: string;
  image: StaticImageData;
  invertOnDark?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={url}
      target="_blank"
      className={`mx-auto px-5 py-1 flex flex-col items-center w-fit border-2 cursor-pointer border-transparent gap-1 group ${
        isHovered ? 'hovered-element' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        placeholder="blur"
        className={`${invertOnDark ? 'dark:invert' : ''} aspect-square object-contain`}
      />
      <div className="group-hover:text-orange-400">{name}</div>
    </Link>
  );
};

export const TechStack = () => {
  const stack = [
    {
      name: 'Github',
      invertOnDark: true,
      image: github,
      url: 'https://github.com/',
    },
    {
      name: 'Netlify',
      url: 'https://www.netlify.com/',
      image: netlify,
    },
    {
      name: 'Next.js',
      url: 'https://nextjs.org/',
      image: nextjs,
      invertOnDark: true,
    },

    {
      name: 'Node.js',
      url: 'https://nodejs.org/',
      image: nodejs,
      invertOnDark: true,
    },
    {
      name: 'React',
      image: react,
      url: 'https://react.dev/',
      invertOnDark: false,
    },
    {
      name: 'Vue.js',
      url: 'https://vuejs.org/',
      image: vuejs,
      invertOnDark: true,
    },
    {
      name: 'Redux',
      url: 'https://redux.js.org/',
      image: redux,
      invertOnDark: true,
    },
    {
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org/',
      image: typescript,
      invertOnDark: true,
    },
    {
      name: 'Tailwind CSS',
      url: 'https://tailwindcss.com/',
      image: tailwindcss,
      invertOnDark: false,
    },
  ];

  return (
    <div className="p-4 gap-4 w-[50vw] max-w-[580px]">
      <div className="w-full grid grid-cols-3 gap-4 items-center ju">
        {stack.map((tech) => (
          <TechCard
            key={tech.name}
            image={tech.image}
            name={tech.name}
            url={tech.url}
            invertOnDark={tech.invertOnDark}
          />
        ))}
      </div>
    </div>
  );
};
