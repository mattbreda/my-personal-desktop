import { WindowState } from '../window/Window';
import { TechStack } from './tech-stack/TechStack';
import { AboutMe } from './about-me/AboutMe';
import { SpaceInvaders } from './space-invaders/SpaceInvaders';
import { FreelanceWorks } from './freelance-works/FreellanceWorks';
import { Contacts } from './contacts/Contacts';
import { DigitalClock } from '../../digital-clock/DigitalClock';

export const initialWindowsState: WindowState[] = [
  {
    id: 'welcome',
    title: 'Welcome.txt',
    icon: 'dither_it_tumblr_5a04c3a4158ba2189f2c2b9407dcd8e7_d23424ec_540.png',
    content: (
      <div className="p-4">
        <p>Welcome to my personal desktop environment!</p>
        <p>Feel free to look and play around.</p>
        <br></br>
        <div className="font-mono text-xl font-bold">MATT</div>
      </div>
    ),
    x: 100,
    y: 100,
    isOpen: true,
    zIndex: 1,
  },
  {
    id: 'about',
    title: 'About_me',
    icon: 'dither_it_tumblr_7f53a0392223eb5d7af9132d6df62fa0_efab77b1_540.png',
    content: <AboutMe />,
    x: 150,
    y: 150,
    isOpen: false,
    zIndex: 1,
  },
  {
    id: 'stack',
    title: 'My_Tech_Stack',
    icon: 'dither_it_tumblr_62b3062291c4f1f567d6fd8c1ba79e51_52125228_540.png',
    content: <TechStack />,
    x: 200,
    y: 180,
    isOpen: false,
    zIndex: 1,
  },
  {
    id: 'space-invaders',
    title: 'Bug_Invaders.exe',
    icon: 'dither_it_tumblr_ddb8339fed22dd22ae60bf4de93e76d6_2fbc0868_540.png',
    content: <SpaceInvaders />,
    x: 220,
    y: 200,
    isOpen: false,
    zIndex: 2,
  },
  {
    id: 'freelance',
    title: 'Freelance_Works',
    content: <FreelanceWorks />,
    icon: 'dither_it_tumblr_027467750d1449a1f3f744637c70fd74_30a2ce8c_540.png',
    x: 250,
    y: 300,
    isOpen: false,
    zIndex: 2,
  },
  {
    id: 'contact',
    title: 'Contacts',
    icon: 'dither_it_tumblr_f8e0d27a66160712fa0bf4b567d26507_50e70357_540.png',
    content: <Contacts />,
    x: 300,
    y: 260,
    isOpen: false,
    zIndex: 2,
  },
];
