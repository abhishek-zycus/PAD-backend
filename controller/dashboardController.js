import companyContractData from "../constants/companyContractData.js";
import Contract from "../model/contract.js";
import { generateContractObject } from "../util/generateContract.js";

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

export const getDashboardDat = async (req, res) => {
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

export const setContractData = async (req, res) => {
  try {
    const { noOfContracts, userId } = req.body;
    // console.log(noOfContracts, userId);
    var returnValue = [];
    if (noOfContracts > 0 && noOfContracts <= 1) {
      const newContract = new Contract(generateContractObject(userId));
      const saveContract = await newContract.save();
      console.log(saveContract);
      return res.status(200).json({
        success: true,
        data: saveContract,
      });
    } else {
      for (let i = 0; i < noOfContracts; i++) {
        const newContract = new Contract(generateContractObject(userId));
        const saveContract = await newContract.save();
        returnValue.push(saveContract);
      }
      if (returnValue.length === noOfContracts) {
        return res.status(200).json({
          success: true,
          data: returnValue,
        });
      }
    }
  } catch (error) {
    console.log("Api error : setContractData : ", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};
