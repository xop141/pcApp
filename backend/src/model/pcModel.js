import mongoose from "mongoose";

const PcSchema = new mongoose.Schema({
  cafeId: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe", required: true },
  pcNumber: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["available", "in-use", "reserved", "offline"], 
    default: "available" 
  },
  currentBookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: null },
}, { timestamps: true });

export default mongoose.models.Pc || mongoose.model("Pc", PcSchema);
