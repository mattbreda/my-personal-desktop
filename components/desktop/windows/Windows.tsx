import Image from "next/image";
import { WindowState } from "../window/Window";
import { TechStack } from "./tech-stack/TechStack";
import TextType from "@/components/text-type/TextType";
import { AboutMe } from "./about-me/AboutMe";
import { SpaceInvaders } from "./space-invaders/SpaceInvaders";
import { FreelanceWorks } from "./freelance-works/FreellanceWorks";
import { Contacts } from "./contacts/Contacts";

export const initialWindowsState: WindowState[] = [
  {
    id: "welcome",
    title: "Welcome.txt",
    content: (
      <div className="p-4">
        <p>Welcom to my personal desktop environment!</p>
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
    id: "about",
    title: "About_me",
    content: <AboutMe />,
    x: 150,
    y: 150,
    isOpen: false,
    zIndex: 1,
  },
  {
    id: "stack",
    title: "My_Tech_Stack",
    content: <TechStack />,
    x: 200,
    y: 180,
    isOpen: false,
    zIndex: 1,
  },
  {
    id: "space-invaders",
    title: "Bug_Invaders.exe",
    content: <SpaceInvaders />,
    x: 220,
    y: 200,
    isOpen: false,
    zIndex: 2,
  },
  {
    id: "freelance",
    title: "Freelance_Works",
    content: <FreelanceWorks />,
    x: 250,
    y: 300,
    isOpen: false,
    zIndex: 2,
  },
  {
    id: "contact",
    title: "Contacts",
    content: <Contacts />,
    x: 300,
    y: 260,
    isOpen: false,
    zIndex: 2,
  },
];
