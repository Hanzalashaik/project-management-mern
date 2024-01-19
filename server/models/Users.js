import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
    },
    projectName: { type: String, unique: true },
    description: { type: String },
    status: { type: String },
    createdBy: { type: String },
    assignedTo: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema({
  uid: {
    type: Number,
  },
  fullName: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
  },
  title: {
    type: String,
  },
  password: {
    type: String,
  },
  projects: [projectSchema],

  userverified: {
    email: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Boolean,
      default: false,
    },
  },
  userverifytoken: {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  token: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
