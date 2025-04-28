"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Progress} from "@/components/ui/progress"

interface cafe {
  _id: string;
  name:string
}



export default function Home() {
  

 
  const [cafes,setCafes] = useState<cafe[]>([])
  useEffect(()=>{
    const fetchCafe =async ()=>{
      const res = await axios.get("http://localhost:9000/api/allCafe")
      console.log(res.data);
      setCafes(res.data)
    }
    fetchCafe()
  
  },[])
  const router = useRouter()
  const jump = (id:string)=>{
router.push(`/cafe/${id}`)
  }

  return (
  
    <div className="flex justify-center items-center flex-col h-[100vh] bg-black">
     
      <Dialog>
        <DialogTrigger className="flex gap-[20px] flex-col">
        {cafes.map((cafe,index)=>(
        <div onClick={()=>jump(cafe._id)} key={index}  className="border-1 rounded-xl p-[20px] text-white hover:bg-white/20 flex items-center gap-[20px] w-full text-center">
        
       <h1 className="w-full">{cafe.name}</h1>   
          <Progress  value={66}/>
        </div>
      ))}
        </DialogTrigger>
    
      </Dialog>
     

    </div>
  );
}
