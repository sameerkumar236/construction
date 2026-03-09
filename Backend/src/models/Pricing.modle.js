const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
  {
    buildTypes: {
      type: Map,
      of: Number,
      required: true,
    },
    finishLevels: {
      type: Map,
      of: new mongoose.Schema({
        mul:  { type: Number, required: true },
        desc: { type: String, required: true },
      }, { _id: false }),
      required: true,
    },
    gstRate:     { type: Number, default: 5 },
    archRate:    { type: Number, default: 6 },
    contingency: { type: Number, default: 8 },
    addOns: [
      {
        key:   { type: String, required: true },
        label: { type: String, required: true },
        fixed: { type: Number, required: true },
        note:  { type: String, default: '' },
      },
    ],
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pricing', pricingSchema);