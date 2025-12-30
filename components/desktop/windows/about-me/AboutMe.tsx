import TextType from '@/components/text-type/TextType';
import Image from 'next/image';

export const AboutMe = () => {
  return (
    <div className="p-4 flex flex-row gap-4 w-[50vw]">
      <div className="w-2/3">
        <TextType
          text={[
            "Hi! I'm Matteo! I am a full stack developer. My main focus is on the frontend, but I also love to play with data and the backend. I'm building stuff in the web since 2017.",
            " When I'm not getting mad with the coding agents I'm probably somewhere in the wild.  I'm also a big fan of retro gaming and music, loud noisy music. 👾",
          ]}
          typingSpeed={55}
          pauseDuration={900}
          showCursor={true}
          cursorCharacter="_"
        />
      </div>
      <div className="w-1/3 relative h-[250px]">
        <Image
          src="/dither_matteo.jpg"
          alt="Matteo"
          placeholder="blur"
          className="w-full h-full object-cover"
          fill
        />
      </div>
    </div>
  );
};
