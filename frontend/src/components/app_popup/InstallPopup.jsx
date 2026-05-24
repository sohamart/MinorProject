import React, { useEffect, useState } from "react";

const InstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    // ✅ Detect Median / WebView / Installed App
    const isInApp =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      navigator.userAgent.includes("wv") ||
      navigator.userAgent.includes("Median");

    // ❌ যদি app হয় তাহলে return
    if (isInApp) return;

    // ✅ শুধু web এ popup show
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);

  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111] p-6 shadow-2xl">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-3xl bg-yellow-400 flex items-center justify-center text-3xl font-bold text-black">
            A
          </div>
        </div>

        {/* Text */}
        <div className="mt-5 text-center">
          <h1 className="text-2xl font-bold text-white">
            Download App
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Install our Android app for better experience
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">

          <a
            href="https://sohamart.github.io/C.R-Time-Pro/"
            target="_blank"
            className="w-full rounded-2xl bg-yellow-400 py-3 text-center font-semibold text-black transition hover:scale-[1.02]"
          >
            Download Now
          </a>

          <button
            onClick={() => setShowPopup(false)}
            className="w-full rounded-2xl bg-white/10 py-3 text-white transition hover:bg-white/20"
          >
            Maybe Later
          </button>

        </div>
      </div>
    </div>
  );
};

export default InstallPopup;