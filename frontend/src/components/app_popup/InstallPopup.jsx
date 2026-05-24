import React, { useEffect, useState } from "react";

const InstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    // ✅ Detect REAL browser only
    const isBrowser =
      window.location.href.startsWith("http");

    // ✅ Detect Android WebView / Median
    const isWebView =
      /wv/.test(navigator.userAgent) ||
      /Android.*Version\/[\d.]+/.test(navigator.userAgent);

    // ❌ App/WebView হলে popup না
    if (!isBrowser || isWebView) return;

    // ✅ Only website
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="w-full max-w-sm rounded-3xl bg-[#111] border border-white/10 p-6">

        <h1 className="text-2xl font-bold text-white text-center">
          Download App
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Install our Android App for better experience
        </p>

        <a
          href="https://sohamart.github.io/C.R-Time-Pro/"
          target="_blank"
          className="block w-full text-center bg-yellow-400 text-black font-bold py-3 rounded-2xl mt-5"
        >
          Download Now
        </a>

        <button
          onClick={() => setShowPopup(false)}
          className="w-full mt-3 py-3 rounded-2xl bg-white/10 text-white"
        >
          Maybe Later
        </button>

      </div>
    </div>
  );
};

export default InstallPopup;

// https://sohamart.github.io/C.R-Time-Pro/