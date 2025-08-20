"use client";

import React, { useEffect, useState } from "react";
import {saveAs} from "file-saver";

function index(){
  const [file, setFile] = useState<File|null>(null);

  //on file submit handler
  //process the input file and arrive at the result
  const organizeGame = async (e:React.FormEvent)=>{
      e.preventDefault();
      if(!file){
        alert("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/netlify/functions/secretsanta",{
        method:"POST",
        body:formData
      });
      if(res.status != 400){
        const blob = await res.blob();
        saveAs(blob, "Secret-Santa-Game-Result-"+new Date().getFullYear()+".csv");
      }else{
        const response = await res.json();
        alert(response.message);
        console.log(response);
      }
  }
  return(
    <>
      <div className="flex flex-row-1fr h-screen  ml-7 mr-7">
        <div className="w-64 bg-gray-900">
          <aside >
            <nav className="flex flex-col font-bold space-y-3 ml-8 mt-5">
              <a href="/" className="text-amber-700">&#129170; Secret Santa</a>
              <a href="/">&#129170; Game 2</a>
              <a href="/">&#129170; Game 3</a>
              <a href="/">&#129170; Game 4</a>
            </nav>
          </aside>
        </div>
        <div className=" flex-grow justify-center bg-gray-800">
          <form onSubmit={organizeGame} className="mt-20 ml-20">
          <p>
            This accepts a list of employees and their contact email id in a file to process the secret friend assignment<br/>
            Please select a file
          </p>
            <div className="grid grid-cols-1 w-2xs gap-2 mt-10">
              <input type="file" className="border p-2 rounded bg-amber-700 hover:bg-amber-600 cursor-pointer"
                  onChange={(e)=>{
                    if(e.target.files && e.target.files[0]){
                      setFile(e.target.files[0]);
                    }
                  }}></input>
              <button type="submit" className="border p-2 rounded bg-amber-700  hover:bg-amber-600 cursor-pointer">submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default index;