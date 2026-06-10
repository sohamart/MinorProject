import React from "react";
import { X, BellRing, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { useNotification } from "../../context/Notifications";

const Notificationbox = ({
  setShowNotification,
  showNotification,
}) => {

  const { notifications } =
    useNotification();
    console.log(notifications);



  const openbox = () => {
    setShowNotification(
      !showNotification
    );
  };

  return (

    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center p-3">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="relative w-full max-w-2xl h-[85vh]
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(59,130,246,0.2)]"
      >

        {/* Header */}

        <div
          className="
          h-20
          border-b
          border-white/10
          px-6
          flex
          items-center
          justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
              w-12
              h-12
              rounded-2xl
              bg-blue-500/20
              flex
              items-center
              justify-center
              "
            >
              <BellRing size={24} />
            </div>

            <div>

              <h1
                className="
                text-2xl
                font-bold
                text-white
                "
              >
                Notifications
              </h1>

              <p
                className="
                text-xs
                text-gray-400
                "
              >
                Recent updates
              </p>

            </div>

          </div>

          <button
            onClick={openbox}
            className="
            w-11
            h-11
            rounded-xl
            bg-white/10
            hover:bg-red-500/20
            transition-all
            flex
            items-center
            justify-center
            text-white
            "
          >
            <X />
          </button>

        </div>

        {/* Notification List */}

        <div
          className="
          h-[calc(100%-80px)]
          overflow-y-auto
          p-5
          space-y-4
          no-scrollbar
          "
        >

          {notifications?.length > 0 ? (

            notifications.slice().reverse().map(
              (item, index) => (

                <motion.div
                  key={
                    item._id || index
                  }
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.05,
                  }}
                  className="
                  group
                  relative
                  p-5
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  hover:border-blue-500/30
                  hover:bg-white/10
                  transition-all
                  "
                >

                  {/* unread dot */}

                  <div
                    className="
                    absolute
                    top-5
                    right-5
                    w-3
                    h-3
                    rounded-full
                    bg-blue-500
                    animate-pulse
                    "
                  />

                  <h2
                    className="
                    text-white
                    font-semibold
                    text-lg
                    "
                  >
                    {item.title}
                  </h2>

                  <p
                    className="
                    mt-2
                    text-gray-300
                    text-sm
                    "
                  >
                    {item.message}
                  </p>

                  <div
                    className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-gray-500
                    text-xs
                    "
                  >
                    <Clock3
                      size={14}
                    />

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </div>

                </motion.div>

              )
            )

          ) : (

            <div
              className="
              h-full
              flex
              flex-col
              items-center
              justify-center
              "
            >

              <div
                className="
                w-28
                h-28
                rounded-full
                bg-white/5
                flex
                items-center
                justify-center
                "
              >
                <BellRing
                  size={50}
                  className="
                  text-gray-500
                  "
                />
              </div>

              <h2
                className="
                mt-6
                text-2xl
                font-bold
                text-white
                "
              >
                No Notifications
              </h2>

              <p
                className="
                text-gray-400
                mt-2
                "
              >
                You're all caught up.
              </p>

            </div>

          )}

        </div>

      </motion.div>

    </div>

  );

};

export default Notificationbox;