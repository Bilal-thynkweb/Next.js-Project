import mongoose, { Schema } from "mongoose";

const tableSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Table =
  mongoose.models.Table || mongoose.model("Table", tableSchema, "table");

export default Table;
