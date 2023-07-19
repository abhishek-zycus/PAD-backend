// import companyContractData from "../constants/companyContractData.js";
import axios from "axios";
import Contract from "../model/contract.js";
import { generateContractObject } from "../util/generateContract.js";

export const getDashboardData = async (req, res) => {
  try {
    let contracts = await Contract.find({ userId: req.user.id });
    if (!contracts.length) {
      contracts = await axios.post(
        "http://localhost:5000/api/dashboard/addContract",
        {
          noOfContracts: Math.floor(Math.random() * 11) + 5,
          userId: req.user.id,
        }
      );
      contracts = await Contract.find({ userId: req.user.id });
    }
    let totalExpectedRevenue = 0;
    let totalDueAmount = 0;
    let top5CompanyByPayment = {
      companyName: [],
      correspondingPayment: [],
    };
    let top5CompanyByDuePayment = {
      companyName: [],
      correspondingDuePayment: [],
      correspondingPayment: [],
    };

    contracts.map((item) => {
      totalExpectedRevenue += item.expectedPayment;
      totalDueAmount += item.duePayment;
    });

    contracts.sort((a, b) => (a.expectedPayment > b.expectedPayment ? -1 : 1));
    let top5 = contracts.slice(0, 5);

    top5.map((con) => {
      top5CompanyByPayment.companyName.push(con.companyName);
      top5CompanyByPayment.correspondingPayment.push(con.expectedPayment);
    });

    contracts.sort((a, b) => (a.duePayment > b.duePayment ? -1 : 1));
    top5 = contracts.slice(0, 5);

    top5.map((con) => {
      top5CompanyByDuePayment.companyName.push(con.companyName);
      top5CompanyByDuePayment.correspondingDuePayment.push(con.duePayment);
      top5CompanyByDuePayment.correspondingPayment.push(con.expectedPayment);
    });

    const avgRevenue = Math.floor(totalExpectedRevenue / contracts.length);
    const data = {
      numberOfContracts: contracts.length,
      avgRevenue,
      totalExpectedRevenue,
      totalDueAmount,
      top5CompanyByPayment,
      top5CompanyByDuePayment,
    };
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};

export const setContractData = async (req, res) => {
  try {
    const { noOfContracts, userId } = req.body;
    var returnValue = [];
    if (noOfContracts > 0 && noOfContracts <= 1) {
      const newContract = new Contract(generateContractObject(userId));
      const saveContract = await newContract.save();
      // console.log(saveContract);
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
