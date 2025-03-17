import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} PassOP. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              Built with ❤️ by{" "}
              <a
                href="https://dhruvin-code89.github.io/CodSoft-t2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline">
                Dhruvin Kadivar
              </a>
              .
            </p>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <p className="text-sm mt-2">
              Disclaimer: This is a personal project. Use at your own risk.
            </p>
            <p className="text-sm mt-2">
              Contact me at{" "}
              <a
                href="mailto:dhruvinzyx1@gmail.com"
                className="text-blue-400 hover:underline"
              >
                dhruvinzyx1@gmail.com
              </a>
              .
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;