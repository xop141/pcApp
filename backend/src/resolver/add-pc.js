import Pc from "../model/pcModel.js";
import Cafe from "../model/cafeModel.js";

const addPCsToCafe = async (req, res) => {
  const { cafeId, numberOfPCs } = req.body; 
  
  try {
   
    if (!cafeId) {
      return res.status(400).send("Cafe ID is required.");
    }

    
    const cafe = await Cafe.findById(cafeId);
    if (!cafe) {
      return res.status(404).send("Cafe not found.");
    }

    // Add the specified number of PCs to the cafe
    const pcs = [];
    for (let i = 1; i <= numberOfPCs; i++) {
      const newPc = new Pc({
        cafeId: cafe._id, // Associate the PC with the cafeId
        pcNumber: i,      // You can change this logic to set specific PC numbers
        status: "available", // Default status to "available"
      });
      pcs.push(newPc);
    }

    // Save all the new PCs in one go
    await Pc.insertMany(pcs);
    res.status(200).send(`${numberOfPCs} PCs added to Cafe "${cafe.name}" successfully.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error: Could not add PCs.");
  }
};

export default addPCsToCafe;
