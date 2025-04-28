import pcModel from "../model/pcModel.js"
const getAllpc =async (req,res)=>{
const {cafeId} = req.params


const pcs = await pcModel.find({cafeId:cafeId})
res.json(pcs)
}
export default getAllpc