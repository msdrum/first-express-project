import { Schema, model } from "mongoose";

const processSchema = new Schema({
  documentName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    lowercase: true,
  },
  status: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10,
    trim: true,
    lowercase: true,
  },
  details: {
    type: String,
    minLength: 2,
    lowercase: true,
  },
  dateInit: {
    type: Date,
  },
  comments: [
    {
      type: String,
    },
  ],
  dateEnd: {
    type: Date,
  },
  setor: {
    type: String,
    minLength: 2,
    lowercase: true,
  },
});

const ProcessModel = model("Process", processSchema);

export default ProcessModel;
