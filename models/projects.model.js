import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      trim: Number,
    },
    description: {
      type: String,
      default: "Description",
    },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
