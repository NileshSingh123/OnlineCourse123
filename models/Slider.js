const mongoose = require("mongoose");

//define schema
const SliderSchema = new mongoose.Schema(
  {
    S_title: {
      type: String,
      required: true,
    },
    S_discription: {
      type: String,
      required: true,
    },
    S_slider: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },{ timestamps: true });

//create collection
const SliderModel = mongoose.model("slider", SliderSchema);

module.exports = SliderModel;
