"use client";

import React, { useEffect, useState } from "react";
import {saveAs} from "file-saver";

function index(){
  const [file, setFile] = useState<File|null>(null);

  const organizeGame = async (e:React.FormEvent)=>{
      e.preventDefault();
      if(!file){
        alert("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/api/secretsanta",{
        method:"POST",
        body:formData
      });
      const blob = await res.blob();
      saveAs(blob, "Secret-Santa-Game-Result-"+new Date().getFullYear()+".csv");
  }
  return(
    <>
      <div className="font-bold text-2xl ">Team Building</div>
      <div className="font-bold text-1xl ">Secret Santa</div>
      
        <form onSubmit={organizeGame}>
        <div className="grid grid-cols-1 w-2xs gap-2">
          <input type="file" className="border p-2 rounded bg-amber-700 hover:bg-amber-600 cursor-pointer"
              onChange={(e)=>{
                if(e.target.files && e.target.files[0]){
                  setFile(e.target.files[0]);
                }
              }}></input>
          <button type="submit" className="border p-2 rounded bg-amber-700  hover:bg-amber-600 cursor-pointer">submit</button>
        </div>
        </form>
    </>
  );
}

export default index;