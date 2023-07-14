import companyContractData from "../constants/companyContractData.js";

export const getDashboardData = async (req, res) => {
  try {
    let totalRevenue = 0;
    companyContractData.map((item) => {
      totalRevenue += item.payment;
    });
    const avgRevenue = totalRevenue / companyContractData.length;
    const data = {
      numberOfContracts: companyContractData.length,
      avgRevenue,
      totalRevenue,
      data: companyContractData,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
