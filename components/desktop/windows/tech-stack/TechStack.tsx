'use client';
import { url } from 'inspector';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const TechCard = ({
  logoSource,
  name,
  url,
  invertOnDark,
}: {
  logoSource: string;
  name: string;
  url: string;
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
        src={logoSource}
        alt={name}
        width={80}
        height={80}
        className={`${invertOnDark ? 'dark:invert' : ''} aspect-square object-contain`}
      />
      <div className="group-hover:text-orange-400">{name}</div>
    </Link>
  );
};

export const TechStack = () => {
  const stack = [
    {
      logoSource: '/dither_it_icone-github-noir.png',
      name: 'Github',
      invertOnDark: true,
      url: 'https://github.com/',
    },
    {
      logoSource: '/dither_it_netlify-logo-png-transparent.png',
      name: 'Netlify',
      url: 'https://www.netlify.com/',
    },
    {
      logoSource: '/dither_it_next_js_logo_icon_145038.png',
      name: 'Next.js',
      url: 'https://nextjs.org/',
      invertOnDark: true,
    },

    {
      logoSource: '/dither_it_Node.js_logo.png',
      name: 'Node.js',
      url: 'https://nodejs.org/',
      invertOnDark: true,
    },
    {
      logoSource: '/dither_it_React-icon.png',
      name: 'React',
      url: 'https://react.dev/',
      invertOnDark: false,
    },
    {
      logoSource: '/dither_it_Vue.js_Logo_2.png',
      name: 'Vue.js',
      url: 'https://vuejs.org/',
      invertOnDark: true,
    },
    {
      logoSource: '/dither_it_Redux.png',
      name: 'Redux',
      url: 'https://redux.js.org/',
      invertOnDark: true,
    },
    {
      logoSource: '/dither_it_Typescript_logo_2020.png',
      name: 'TypeScript',
      url: 'https://www.typescriptlang.org/',
      invertOnDark: true,
    },
    {
      logoSource: '/dither_it_Tailwind_CSS_Logo.svg.png',
      name: 'Tailwind CSS',
      url: 'https://tailwindcss.com/',
      invertOnDark: false,
    },
  ];
  return (
    <div className="p-4 gap-4 w-[50vw] max-w-[580px]">
      <div className="w-full grid grid-cols-3 gap-4 items-center ju">
        {stack.map((tech) => (
          <TechCard
            key={tech.name}
            logoSource={tech.logoSource}
            name={tech.name}
            url={tech.url}
            invertOnDark={tech.invertOnDark}
          />
        ))}
      </div>
    </div>
  );
};
