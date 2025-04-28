import mongoose from 'mongoose';
import Pc from '../model/pcModel.js';

const orderMultiplePcs = async (req, res) => {
  const { pcIds, newStatus } = req.body;


 
  if (!Array.isArray(pcIds) || pcIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ message: 'Invalid PC IDs.' });
  }

  if (pcIds.length === 0) {
    return res.status(400).json({ message: 'No PCs provided.' });
  }

  try {
    // Fetch the first PC to get the cafeId (assuming all PCs belong to the same cafe)
    const firstPc = await Pc.findById(pcIds[0]);
    if (!firstPc) {
      return res.status(404).json({ message: 'PC not found.' });
    }
    const cafeId = firstPc.cafeId;

    // Prepare the bulk update operations
    const updateOps = pcIds.map(pcId => ({
      updateOne: {
        filter: { _id: pcId },
        update: { $set: { status: newStatus } },
      }
    }));

    // Perform the bulk update operation
    const result = await Pc.bulkWrite(updateOps);

    // Emit WebSocket event with updated cafeId and PC IDs
    const io = req.app.get('io');
    io.emit('pcStatusUpdated', { cafeId, pcIds, newStatus });

    return res.status(200).json({
      message: `${result.modifiedCount} PCs updated to ${newStatus}`,
    });

  } catch (error) {
    console.error('Error ordering PCs:', error.message);
    return res.status(500).json({
      message: 'Error ordering PCs',
      error: process.env.NODE_ENV === 'production' ? error.message : error.stack,
    });
  }
};

export default orderMultiplePcs;

// import mongoose from 'mongoose';
// import Pc from '../model/pcModel.js';

// const orderMultiplePcs = async (req, res) => {
//   const { pcIds, newStatus } = req.body;
//   const validStatuses = ["available", "in-use", "reserved", "offline"];

//   if (!validStatuses.includes(newStatus)) {
//     return res.status(400).json({ message: 'Invalid status.' });
//   }

//   try {
//     const updateOps = pcIds.map(pcId => ({
//       updateOne: {
//         filter: { _id: pcId },
//         update: { $set: { status: newStatus } },
//       }
//     }));

//     const result = await Pc.bulkWrite(updateOps);

//     const pcs = await Pc.find({ _id: { $in: pcIds } });
//     const cafeId = pcs[0]?.cafeId; 

//     const io = req.app.get('io');
//     io.emit('pcStatusUpdated', { cafeId, pcIds, newStatus });

//     return res.status(200).json({
//       message: `${result.modifiedCount} PCs updated to ${newStatus}`,
//       result
//     });

//   } catch (error) {
//     console.error('Error ordering PCs:', error.message);
//     return res.status(500).json({ message: 'Error ordering PCs', error: error.message });
//   }
// };

// export default orderMultiplePcs;

