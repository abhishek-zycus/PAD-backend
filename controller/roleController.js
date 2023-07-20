import Role from "../model/role.js";
// import { validationResult } from "express-validator";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    return res.status(200).json({
      success: true,
      roles,
    });
  } catch (error) {
    console.log("Api error : getAllRolesController : ", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};

export const addNewRole = async (req, res) => {
  try {
    // console.log(req.body);
    const isRoleNameAlreadyPresent = await Role.findOne({
      roleName: req.body.roleName,
    });
    if (isRoleNameAlreadyPresent) {
      res.status(401).json({
        success: false,
        error: "Role name already present",
      });
    } else {
      const newRole = new Role(req.body);
      const savedRole = await newRole.save();
      return res.status(200).json({
        success: true,
        data: savedRole,
      });
    }
  } catch (error) {
    console.log("Api error : addNewRoleController : ", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};

export const canAddRole = async (req, res) => {
  try {
    const role = await Role.findById(req.user.role);
    if (role.permissions.canCreateRole) {
      return res.status(200).json({
        success: true,
      });
    } else {
      return res.status(401).json({
        success: false,
      });
    }
  } catch (error) {
    console.log("Api error : canAddRoleController : ", error);
    return res.status(500).json({
      success: false,
      err: "Server error!",
    });
  }
};
