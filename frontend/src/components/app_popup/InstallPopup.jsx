import React, { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

const InstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    // ✅ Detect Median App
    const isMedianApp =
      navigator.userAgent.includes("C.R");

    // ❌ Hide in Median App
    if (isMedianApp) return;

    // ✅ Show only on website
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  if (!showPopup) return null;

  return (
    <div
      className="
      fixed z-[999999]
      bottom-4 right-4
      w-[92%] sm:w-[340px]
      animate-[slideUp_.4s_ease]
      "
    >

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111]/95 backdrop-blur-xl shadow-2xl p-5">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Close */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          title="Close"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">

          {/* Icon */}
          <div className="min-w-[55px] h-[55px] rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg">
            <Download className="text-black" size={26} />
          </div>

          {/* Text */}
          <div className="flex-1">

            <h1 className="text-white text-lg font-bold">
              Download App
            </h1>

            <p className="text-gray-400 text-sm mt-1 leading-relaxed">
              Install our Android App for a faster and better experience.
            </p>

            {/* Button */}
            <a
              href="https://sohamart.github.io/C.R-Time-Pro/"
              target="_blank"
              rel="noreferrer"
              className="
              mt-4 inline-flex items-center justify-center gap-2
              bg-yellow-400 hover:bg-yellow-300
              text-black font-semibold
              px-5 py-2.5 rounded-xl
              transition-all duration-300
              "
              title="Download App"
            >
              <Download size={18} />
              Download
            </a>

          </div>

        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
};

export default InstallPopup;