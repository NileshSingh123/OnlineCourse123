const mongoose = require("mongoose");

//define schema
const BatchSchema = new mongoose.Schema(
  {
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    batch_name: {
      type: String,
      required: true,
    },
    teacher_name: {
      type: String,
      required: true,
    },
    timing: {
      type: String,
      required: true,
    },
    last_update: {
        type: String,
        required: true,
      },
    fee: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//create collection
const BatchModel = mongoose.model("Batch", BatchSchema);

module.exports = BatchModel;
