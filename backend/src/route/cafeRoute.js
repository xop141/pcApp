import express from 'express'
import getCafe from "../resolver/get-cafe.js";
import editStatus from '../resolver/editStatus.js'
import addPc from '../resolver/add-pc.js'
import getAllpc from '../resolver/getAllpc.js';
const router = express.Router();

router.get('/allCafe', getCafe)
router.patch('/editStat', editStatus)
router.get('/allPcs/:cafeId',getAllpc )
// router.post('/addPc', addPc)
export default router;
