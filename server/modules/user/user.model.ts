import * as mongoose from "mongoose";
import type { UserType } from "../../shared/types";

const userSchema = new mongoose.Schema<UserType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    profilePictureFileId: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      country: String,
      zipCode: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
