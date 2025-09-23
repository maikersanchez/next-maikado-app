"use client"; // Mark as Client Component

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { motion } from "framer-motion"; // Import motion for animations

const NavBar = () => {
  const pathname = usePathname(); // Get current pathname

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const brandVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const getLinkClasses = (href: string) => {
    const baseClasses = "text-lg font-medium transition-colors duration-200";

    return pathname === href
      ? `${baseClasses} text-blue-600 border-b-2 border-blue-600` // Active link style
      : `${baseClasses} text-gray-700 hover:text-blue-500`; // Inactive link style
  };

  return (
    <motion.nav
      animate="visible"
      className="bg-white shadow-lg py-4 px-8 flex justify-between items-center"
      initial="hidden"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div className="flex items-center" variants={brandVariants}>
        <Link
          className="font-extrabold text-2xl text-gray-800 hover:text-blue-600 transition-colors"
          href="/"
        >
          WF Makiado
        </Link>
      </motion.div>
      <ul className="flex gap-8">
        <motion.li variants={navItemVariants}>
          <Link
            className={getLinkClasses("/dashboard/jobs")}
            href="/dashboard/jobs"
          >
            Jobs
          </Link>
        </motion.li>
        <motion.li variants={navItemVariants}>
          <Link
            className={getLinkClasses("/dashboard/new-job")}
            href="/dashboard/new-job"
          >
            New Job
          </Link>
        </motion.li>
        <motion.li variants={navItemVariants}>
          <Link
            className={getLinkClasses("/dashboard/analytics")}
            href="/dashboard/analytics"
          >
            Analytics
          </Link>
        </motion.li>
      </ul>
      <div>{/* You can add login/signup buttons or user avatars here */}</div>
    </motion.nav>
  );
};

export default NavBar;
