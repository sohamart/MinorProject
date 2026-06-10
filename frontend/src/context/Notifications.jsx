import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

const NotificationContext =
  createContext();

export const NotificationProvider = ({
  children,
}) => {
  const [count, setCount] =
    useState(0);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);
  const API = import.meta.env.VITE_API_URI

  // Get Notification Count
  const getCount = async () => {
    try {
      const res =
        await axios.get(
          `${API}/api/notifications/count`,
          {
            withCredentials: true,
          }
        );

      setCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Notifications
  const getNotifications =
    async () => {
      try {
        setLoading(true);

        const res =
          await axios.get(
            `${API}/api/notifications/get`,
            {
              withCredentials: true,
            }
          );

        setNotifications(
          res.data.notifications
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // Mark Read
  const markAllRead =
    async () => {
      try {
        await axios.put(
          `${API}/api/notifications/read`,
          {},
          {
            withCredentials: true,
          }
        );

        setCount(0);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getCount();
    getNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        count,
        setCount,

        notifications,
        setNotifications,

        loading,

        getCount,
        getNotifications,

        markAllRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification =
  () =>
    useContext(
      NotificationContext
    );