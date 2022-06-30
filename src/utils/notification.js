import Alert from "react-s-alert";

const notification = (type, message, options = {}) => {
  console.log("Notification:", message);
  Alert[type](null, {
    position: options.position ? options.position : "top-right",
    timeout: options.timeout ? options.timeout : 3000,
    offset: options.offset ? +options.offset : 50,
    customFields: {
      title: type[0].toUpperCase() + type.slice(1),
      message: message || "Something went wrong",
      linkText: options.linkText,
      link: options.link
    }
  });
};

export default notification;
