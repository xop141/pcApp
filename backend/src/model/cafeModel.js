import mongoose from "mongoose";

const CafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true }, 
}, { timestamps: true });

export default mongoose.models.Cafe || mongoose.model("Cafe", CafeSchema);