"use client";

import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "error",
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-4 bg-${
        type === "error" ? "red" : "green"
      }-500 text-white py-2 px-4 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Notification;
