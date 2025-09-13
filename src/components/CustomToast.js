import React, { Fragment } from "react";
import { FormattedMessage, FormattedTime } from "react-intl";
import './CustomToast.scss';

const CustomToast = ({ titleId, message, messageId, time, type }) => {
  return (
    <div className={`custom-toast ${type || 'info'}`}>
      <div className="toast-header">
        {time && (
          <span className="toast-time">
            <FormattedTime
              hour="numeric"
              minute="numeric"
              second="numeric"
              hour12={true}
              value={time}
            />
          </span>
        )}
        <i className="fa fa-info-circle toast-icon" />
        <span className="toast-title"><FormattedMessage id={titleId} /></span>
      </div>
      <div className="toast-body">
        {Array.isArray(message) ? (
          message.map((msg, idx) => (
            <div className="toast-content" key={idx}>{msg}</div>
          ))
        ) : (
          <div className="toast-content">
            {message || (messageId ? <FormattedMessage id={messageId} /> : null)}
          </div>
        )}
      </div>
    </div>
  );
};

export const CustomToastCloseButton = ({ closeToast }) => (
  <button type="button" className="toast-close" onClick={closeToast}>
    <i className="fa fa-times-circle" />
  </button>
);

export default CustomToast;
