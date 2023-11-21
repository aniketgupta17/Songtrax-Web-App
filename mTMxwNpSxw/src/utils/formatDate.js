export const formatDate = (d) => {
  const date = new Date(d);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours < 10 ? "0" : ""}${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPm} on ${day} ${month} ${year}`;
};
