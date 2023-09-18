import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter your name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
});

// const User = mongoose.model.users || mongoose.model("users", userSchema);

// export default User;

export default mongoose.models.users || mongoose.model("users", userSchema);
