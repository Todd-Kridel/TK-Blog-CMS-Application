

module.exports = {
  getRandomNumber: (numberRange) => {
    const randomNumber = (Math.floor(random() * numberRange));
    return randomNumber;
  },
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};

