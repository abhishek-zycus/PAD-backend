import mongoose, { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const RoleSchema = new Schema(
  {
    roleName: String,
    permissions: {
      isTotalContractVisible: Boolean,
      isAvgRevenueVisible: Boolean,
      isTotalDuePaymentVisible: Boolean,
      isTotalExpectedPaymentVisible: Boolean,
      canCreateRole: Boolean,
    },
  },
  { timestamps: true }
);
RoleSchema.plugin(AutoIncrement, { inc_field: "roleId" });
const Role = mongoose.model("Role", RoleSchema);

export default Role;
