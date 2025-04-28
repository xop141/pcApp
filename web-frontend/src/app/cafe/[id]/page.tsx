// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams } from "next/navigation"; // <--- useParams for getting [id]
// import io from "socket.io-client";

// const SOCKET_SERVER_URL = "http://localhost:9000";

// interface Pc {
//   _id: string;
//   pcNumber: string;
//   status: string;
// }

// const Page = () => {
//   const { id } = useParams(); // id from URL
//   const [pcs, setPcs] = useState<Pc[]>([]);

//   useEffect(() => {
//     if (!id) return; // Wait until id is available

//     const socket = io(SOCKET_SERVER_URL);

  
//     socket.on("pcStatusUpdated", (data: { cafeId: string; pcIds: string[]; newStatus: string }) => {
//       console.log("PC Status Updated:", data);

//       // Only update if cafeId matches
//       if (data.cafeId === id) {
//         setPcs((prevPcs) =>
//           prevPcs.map((pc) =>
//             data.pcIds.includes(pc._id)
//               ? { ...pc, status: data.newStatus }
//               : pc
//           )
//         );
//       }
//     });

//     // Fetch PCs by cafeId
//     const fetchPcs = async () => {
//       try {
//         const res = await fetch(`http://localhost:9000/api/allPcs/${id}`);
//         const pcsData: Pc[] = await res.json();
//         setPcs(pcsData);
//         console.log("Fetched PCs:", pcsData);
//       } catch (error) {
//         console.error("Error fetching PCs:", error);
//       }
//     };

//     fetchPcs();

//     return () => {
//       socket.disconnect();
//     };
//   }, [id]); // re-run if id changes

//   return (
//     <div className="flex items-center justify-center h-[100vh]">
//       <div className="w-fit">
//         <h2>PC Statuses for Cafe {id}:</h2>
//         {pcs.length === 0 ? (
//           <p>Loading PCs...</p>
//         ) : (
//           pcs.map((pc) => (
//             <div key={pc._id}>
//               <p>
//                 PC {pc.pcNumber}: {pc.status}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:9000";

interface Pc {
  _id: string;
  pcNumber: string;
  status: string;
}

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [pcs, setPcs] = useState<Pc[]>([]);

  useEffect(() => {
    if (!id) return; 

    const socket = io(SOCKET_SERVER_URL, {
      query: { cafeId: id } 
    });

   
    socket.emit("joinCafe", { cafeId: id });


    socket.on("pcStatusUpdated", (data: { cafeId: string; pcIds: string[]; newStatus: string }) => {
      console.log("PC Status Updated:", data);

      if (data.cafeId === id) {
        setPcs((prevPcs) =>
          prevPcs.map((pc) =>
            data.pcIds.includes(pc._id)
              ? { ...pc, status: data.newStatus }
              : pc
          )
        );
      }
    });

   
    const fetchPcs = async () => {
      try {
        const res = await fetch(`http://localhost:9000/api/allPcs/${id}`);
        const pcsData: Pc[] = await res.json();
        setPcs(pcsData);
   
        
        console.log("Fetched PCs:", pcsData);
      } catch (error) {
        console.error("Error fetching PCs:", error);
      }
    };

    fetchPcs();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-fit">
        <h2 className="text-xl font-bold mb-4">PC Statuses for Cafe {id}:</h2>
        {pcs.length === 0 ? (
          <p>Loading PCs...</p>
        ) : (
          pcs.map((pc) => (
            <div key={pc._id} className="border p-2 my-2 rounded shadow">
              <p>
                <strong>PC {pc.pcNumber}</strong>: {pc.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
