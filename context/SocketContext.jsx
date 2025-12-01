"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const socketRef = useRef(null);

  useEffect(() => {
    // Get auth data from localStorage
    if (typeof window === "undefined") return;

    const user = localStorage.getItem("skillAcademyUser");
    const token = localStorage.getItem("skillAcademyToken");

    if (!user || !token) return;

    try {
      const userData = JSON.parse(user);

      // Initialize socket connection
      const newSocket = io(
        process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
        {
          auth: {
            userId: userData._id || userData.id,
            token,
          },
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
        }
      );

      // Connection event
      newSocket.on("connect", () => {
        console.log("✅ Connected to notifications server");
        setIsConnected(true);
      });

      // Receive new notification
      newSocket.on("notification:new", (notification) => {
        console.log("📬 New notification received:", notification);
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      });

      // Receive broadcast notification
      newSocket.on("notification:broadcast", (notification) => {
        console.log("📢 Broadcast notification:", notification);
      });

      // User online status
      newSocket.on("user:online", (data) => {
        setOnlineUsers((prev) => new Set([...prev, data.userId]));
      });

      // User offline status
      newSocket.on("user:offline", (data) => {
        setOnlineUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(data.userId);
          return updated;
        });
      });

      // Notification read success
      newSocket.on("notification:read:success", (data) => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === data.notificationId ? { ...notif, read: true } : notif
          )
        );
      });

      // Read all success
      newSocket.on("notification:read-all:success", (data) => {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
        setUnreadCount(0);
      });

      // Disconnection event
      newSocket.on("disconnect", () => {
        console.log("❌ Disconnected from notifications server");
        setIsConnected(false);
      });

      // Error event
      newSocket.on("error", (error) => {
        console.error("🚨 Socket error:", error);
      });

      setSocket(newSocket);
      socketRef.current = newSocket;
    } catch (error) {
      console.error("Failed to initialize socket:", error);
    }

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Function to mark notification as read
  const markAsRead = (notificationId) => {
    if (socket && socket.connected) {
      socket.emit("notification:read", { notificationId });
    }
  };

  // Function to mark all as read
  const markAllAsRead = () => {
    if (socket && socket.connected) {
      socket.emit("notification:read-all", {});
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        notifications,
        unreadCount,
        onlineUsers,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
}

export function useNotifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, isConnected } =
    useSocket();

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isConnected,
  };
}
