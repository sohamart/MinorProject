import React, {
  useState,
  useMemo,
} from "react";

import {
  X,
  BellRing,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";

import { useNotification } from "../../context/Notifications";

const Notificationbox = ({
  setShowNotification,
  showNotification,
}) => {
  const { notifications } =
    useNotification();

  const [page, setPage] =
    useState(1);

  const ITEMS_PER_PAGE = 8;

  const openbox = () => {
    setShowNotification(
      !showNotification
    );
  };

  const sortedNotifications =
    useMemo(() => {
      return [
        ...(notifications || []),
      ].sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
      );
    }, [notifications]);

  const totalPages =
    Math.ceil(
      sortedNotifications.length /
        ITEMS_PER_PAGE
    ) || 1;

  const currentNotifications =
    sortedNotifications.slice(
      (page - 1) *
        ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  const getDateLabel = (
    dateString
  ) => {
    const date = new Date(
      dateString
    );

    const today =
      new Date();

    const yesterday =
      new Date();

    yesterday.setDate(
      today.getDate() - 1
    );

    if (
      date.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      date.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  let lastDate = "";

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/70
      backdrop-blur-xl
      flex
      items-center
      justify-center
      p-3
    "
    >
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
        className="
        relative
        w-full
        max-w-2xl
        h-[85vh]
        overflow-hidden
        rounded-3xl
        mb-22
        lg:mb-0
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        
      "
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
                {
                  sortedNotifications.length
                }{" "}
                Notifications
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

        {/* Body */}

        <div
          className="
          h-[calc(100%-80px)]
          flex
          flex-col
        "
        >
          <div
            className="
            flex-1
            overflow-y-auto
            p-5
            space-y-4
            no-scrollbar
          "
          >
            {currentNotifications.length >
            0 ? (
              currentNotifications.map(
                (
                  item,
                  index
                ) => {
                  const dateLabel =
                    getDateLabel(
                      item.createdAt
                    );

                  const showDate =
                    dateLabel !==
                    lastDate;

                  if (
                    showDate
                  ) {
                    lastDate =
                      dateLabel;
                  }

                  return (
                    <React.Fragment
                      key={
                        item._id ||
                        index
                      }
                    >
                      {showDate && (
                        <div
                          className="
                          flex
                          items-center
                          gap-3
                          my-3
                        "
                        >
                          <div
                            className="
                            h-px
                            flex-1
                            bg-white/10
                          "
                          />

                          <span
                            className="
                            text-xs
                            text-gray-400
                            px-3
                            py-1
                            rounded-full
                            bg-white/5
                          "
                          >
                            {
                              dateLabel
                            }
                          </span>

                          <div
                            className="
                            h-px
                            flex-1
                            bg-white/10
                          "
                          />
                        </div>
                      )}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        whileHover={{
                          scale:
                            1.01,
                        }}
                        className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-gradient-to-br
                        from-white/[0.07]
                        to-white/[0.03]
                        border
                        border-white/10
                        p-5
                        backdrop-blur-xl
                        shadow-lg
                      "
                      >
                        <div
                          className="
                          absolute
                          left-0
                          top-0
                          h-full
                          w-1
                          bg-green-500
                        "
                        />

                        <div className="flex gap-4">
                          <div
                            className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-green-500/20
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                          >
                            <BellRing
                              size={
                                20
                              }
                              className="text-green-400"
                            />
                          </div>

                          <div className="flex-1">
                            <h2
                              className="
                              text-white
                              font-bold
                              text-base
                            "
                            >
                              {
                                item.title
                              }
                            </h2>

                            <p
                              className="
                              mt-2
                              text-sm
                              text-gray-300
                              leading-relaxed
                            "
                            >
                              {
                                item.message
                              }
                            </p>

                            <div
                              className="
                              mt-4
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-gray-400
                            "
                            >
                              <Clock3
                                size={
                                  14
                                }
                              />

                              {new Date(
                                item.createdAt
                              ).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </React.Fragment>
                  );
                }
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
                    size={52}
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

          {/* Pagination */}

          {totalPages > 1 && (
            <div
              className="
              border-t
              border-white/10
              p-4
              flex
              justify-center
              items-center
              gap-4
            "
            >
              <button
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
                disabled={
                  page === 1
                }
                className="
                h-10
                w-10
                rounded-xl
                bg-white/10
                text-white
                flex
                items-center
                justify-center
                disabled:opacity-40
              "
              >
                <ChevronLeft
                  size={18}
                />
              </button>

              <div
                className="
                px-4
                py-2
                rounded-xl
                bg-blue-500/20
                text-white
                text-sm
                font-medium
              "
              >
                Page {page} of{" "}
                {totalPages}
              </div>

              <button
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
                disabled={
                  page ===
                  totalPages
                }
                className="
                h-10
                w-10
                rounded-xl
                bg-white/10
                text-white
                flex
                items-center
                justify-center
                disabled:opacity-40
              "
              >
                <ChevronRight
                  size={18}
                />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Notificationbox;