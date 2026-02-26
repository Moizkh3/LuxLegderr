import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const getInitials = (name) => {

  if (!name) return "";

  const words = name.split(" ");
  let initals = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {

    initals += words[i][0]

  }

  return initals.toUpperCase();
};

export const addThousandsSeperator = (num) => {

  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.category,
    amount: item?.amount
  }));
}

// export const prepareIncomeBarChartData = (data = []) => {

//   const sortedData = [...data].sort((a,b) => new Date(a.Date)- new Date(b.Date));

//   const chartData = sortedData.map((item) => ({

//     month:moment(item?.date).format('Do MMM'),
//     amount: item?.amount,
//     source:item?.source,

//   }));

//   return chartData;
// };

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = [];

  sortedData.forEach((item) => {
    const formattedDate = moment(item?.date).format("Do MMM");
    const existingDate = chartData.find((d) => d.category === formattedDate);

    if (existingDate) {
      existingDate.amount += item?.amount || 0;
    } else {
      chartData.push({
        category: formattedDate,
        amount: item?.amount || 0,
      });
    }
  });

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {

  const sortedData = [...data].sort((a, b) => new Date(a.Date) - new Date(b.Date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category
  }))

  return chartData;
}
