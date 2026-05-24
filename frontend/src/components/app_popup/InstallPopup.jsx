import React, { useEffect, useState } from "react";

const InstallPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    // ✅ ONLY Median App block
    const isMedianApp =
      navigator.userAgent.includes("Median");

    // ❌ Median app হলে popup না
    if (isMedianApp) return;

    // ✅ Web এ show
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);

  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60">

      <div className="bg-[#111] p-6 rounded-3xl w-[90%] max-w-sm border border-white/10">

        <h1 className="text-white text-2xl font-bold text-center">
          Download App
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Install our Android app
        </p>

        <a
          href="https://sohamart.github.io/C.R-Time-Pro/"
          target="_blank"
          className="block mt-5 bg-yellow-400 text-center py-3 rounded-2xl font-bold text-black"
        >
          Download
        </a>

        <button
          onClick={() => setShowPopup(false)}
          className="w-full mt-3 bg-white/10 text-white py-3 rounded-2xl"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default InstallPopup;

// https://sohamart.github.io/C.R-Time-Pro/