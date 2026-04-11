import Image from "next/image";
import logo from "./favicon.ico";

export default function Home() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="h-[80vh] flex flex-col sm:flex-row items-center justify-around">
        <div>
          <h1 className="font-bold text-7xl py-5">HI !</h1>
          <h1 className="font-bold text-5xl py-5">I am Netipong</h1>
          <p className="text-3xl py-5">Future Fullstack Developer</p>
        </div>
        <div>
          <Image src={logo} alt="Picture of the author" className="w-56 hover:scale-105 transition-all" />
        </div>
      </div>
      {/* Hero Section */}
    </div>
  );
}
