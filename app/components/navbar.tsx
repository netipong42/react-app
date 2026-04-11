"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../favicon.ico";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";
const listMenu = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Customer",
    href: "/customer",
  },
  {
    name: "Order",
    href: "/order",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUser(name);
    }
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  return (
    <nav className="fixed w-full flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
      {/* icon */}
      <a href="">
        <Image src={logo} alt="Picture of the author" className="w-12 hover:scale-105 transition-all" />
      </a>
      {/* icon */}

      {/* menu */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        {listMenu.map((item, index) => (
          <li key={index} className="p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer transition-all duration-300">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
        {user && (
          <>
            <li className="p-3">Hello, {user}</li>

            <li onClick={handleLogout} className="p-3 bg-red-500 text-white rounded-md cursor-pointer">
              Logout
            </li>
          </>
        )}
      </ul>
      {/* menu */}

      {/* menu icon */}
      <i className="xl:hidden block text-5xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} className="" />
      </i>
      {/* menu icon */}

      {/* menu mobile */}
      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
        style={{ transform: "tranform 0.3s ease, opacity 0.3s ease" }}
      >
        {listMenu.map((item, index) => (
          <li
            key={index}
            className="list-none p-3 text-center hover:bg-primary w-full hover:text-white rounded-md cursor-pointer transition-all duration-300"
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </div>
      {/* menu mobile */}
    </nav>
  );
}
