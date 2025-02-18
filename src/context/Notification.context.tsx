import React, { createContext, useState, useContext } from "react";
import { NotificationContextType, NotificationType } from "../utils/types.utils";
import { INotificationProps } from "../utils/interface.utils";
import AlertNotification from "../components/partials/notification/notification";

export const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {}
} as NotificationContextType);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<INotificationProps | null>(null);

    const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type, onClose: handleClose });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {/* Notification Container */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: 'auto',
        minWidth: '200px',
        backgroundColor: "#FCB349",
      }}>
        {notification && (
          <AlertNotification
            message={notification.message}
            type={notification.type}
            onClose={handleClose}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};


