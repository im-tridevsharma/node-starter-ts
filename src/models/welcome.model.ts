import mongoose, { Schema } from "mongoose";

const welcomeSchema = new Schema(
  {
    title: {type: String, required: true, unique: true},
  },
  { timestamps: true }
);

export const Welcome = mongoose.model("Welcome", welcomeSchema);
