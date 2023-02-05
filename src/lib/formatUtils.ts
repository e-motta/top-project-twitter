export const formatDate = (date: Date) => {
  const timeDelta = Math.abs(new Date().getTime() - date.getTime());

  let formattedDate = "";

  if (timeDelta <= 3600000) {
    // minutes ago
    formattedDate = `${new Date().getMinutes() - date.getMinutes()}m`;
  } else if (timeDelta <= 86400000) {
    // hours ago
    formattedDate = `${new Date().getHours() - date.getHours()}h`;
  } else if (date.getFullYear() === new Date().getFullYear()) {
    // Mmm dd
    formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
    });
  } else {
    // Mmm dd, yyyy
    formattedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return formattedDate;
};

export const formatNum = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
