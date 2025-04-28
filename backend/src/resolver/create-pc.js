import cafeModel from "../model/cafeModel.js";
const createPc =async (req,res)=>{
    const {name,location} = req.body
try{
    const newCafe = new cafeModel({
        name: name,
        location: location
    })
    await newCafe.save()
    res.send('cafe added')
    

} catch (error){
    console.log(error);
    
}

}
export default createPc