import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { INotificationProps } from '../../../utils/interface.utils';

const AlertNotification: React.FC<INotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default AlertNotification;