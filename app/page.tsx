import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import { Loader } from "../components/loader/Loader";
import Dither from "@/components/dither/Dither";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-screen w-screen h-screen font-mono! items-center justify-center bg-background relative">
      <Dither
        waveColor={[0.8, 0.5, 0]}
        disableAnimation={false}
        enableMouseInteraction={false}
        colorNum={4}
        waveAmplitude={0.15}
        waveFrequency={3}
        waveSpeed={0.05}
      />
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="bg-background w-fit p-5 border-orange-500 border-2">
          <Loader />
        </div>
      </div>
      <div className="absolute top-5 right-5 z-index-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
