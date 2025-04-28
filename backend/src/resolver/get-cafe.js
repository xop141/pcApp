import cafeModel from "../model/cafeModel.js";

const getCafe = async (req, res) => {
  try {
    const cafes = await cafeModel.find();
    res.status(200).send(cafes); // Send cafes with a 200 status code
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Server Error: Could not fetch cafes"); // Return a 500 error if something goes wrong
  }
};

export default getCafe;
