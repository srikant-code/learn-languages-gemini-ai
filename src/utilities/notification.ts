import { useEffect } from "react";

const NotificationComponent = ({ message, time, icon, url }) => {
  useEffect(() => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      setTimeout(() => {
        const notification = new Notification(message); // { icon }
        console.log({ notification });
        notification.onclick = function () {
          window.open(url, "_blank");
        };
      }, time);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          setTimeout(() => {
            const notification = new Notification(message); // { icon }
            console.log({ notification });
            notification.onclick = function () {
              window.open(url, "_blank");
            };
          }, time);
        }
      });
    }
  }, [message, time, icon, url]);

  // Render nothing, this component only causes side effects
  return null;
};

export default NotificationComponent;

// Example usage
// <NotificationComponent
//   message="Hello, World!"
//   time={5000}
//   icon="/path/to/icon.png"
//   url="https://www.yourwebsite.com"
// />;
