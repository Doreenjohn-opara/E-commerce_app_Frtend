import { useContext } from "react";
import { NotificationContextType } from "../utils/types.utils";
import { NotificationContext } from "../context/Notification.context";

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error("useNotification must be used within NotificationProvider");
    }
    return context;
  };