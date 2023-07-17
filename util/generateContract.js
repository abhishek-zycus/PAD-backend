import { companyNameAndEmail } from "../constants/companyContractData.js";

export const generateContractObject = (userId) => {
  const obj = {
    userId,
    ...companyNameAndEmail[
      Math.floor(Math.random() * companyNameAndEmail.length)
    ],
    expectedPayment: Math.floor(Math.random() * 10000000),
    date: getRandomDate(),
    status: Math.floor(Math.random() * 3) % 2 === 0 ? "ONGOING" : "COMPLETED",
  };
  obj.duePayment = Math.floor(Math.random() * obj.expectedPayment);
  return obj;
};

export const getRandomDate = () => {
  var start = new Date(); // Current date
  var end = new Date(); // Current date
  start.setFullYear(end.getFullYear() - 1); // Set start date to 1 year ago

  var randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  var randomDate = new Date(randomTime);

  return randomDate;
};
