export const formatDate = (date: Date) => {
  const timeDelta = Math.abs(new Date().getTime() - date.getTime());

  let formattedDate = "";

  if (timeDelta <= 3600000) {
    // minutes ago
    formattedDate = `${dateDiff(new Date(), date, "minutes")}m`;
  } else if (timeDelta <= 86400000) {
    // hours ago
    formattedDate = `${dateDiff(new Date(), date, "hours")}h`;
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

const dateDiff = (a: Date, b: Date, format: "minutes" | "hours") => {
  const _MS_PER_PERIOD = format === "minutes" ? 1000 * 60 : 1000 * 60 * 60;

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    a.getFullYear(),
    a.getMonth(),
    a.getDate(),
    a.getHours(),
    a.getMinutes()
  );
  const utc2 = Date.UTC(
    b.getFullYear(),
    b.getMonth(),
    b.getDate(),
    b.getHours(),
    b.getMinutes()
  );

  return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_PERIOD));
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
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item != null
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};
