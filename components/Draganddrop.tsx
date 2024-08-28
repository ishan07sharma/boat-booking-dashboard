"use client"
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
//import { handleChange } from "@/actions";
const fileTypes = ["JPG", "PNG", "GIF","JPEG"];

function DragDrop() {
  const [file, setFile] = useState<File|null>(null);
  const handleChange = (file:File) => {
    setFile(file);
  };
  return (
    <div>
     <h1>Photos</h1>   
    <p>Upload photos of your boat</p>
    
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}  />
    {/* {file && (
        <div>
          <p>File Uploaded: {file.name}</p>
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            style={{ width: "150px", height: "150px", marginTop: "10px" }} // Custom size
          />
        </div>
      )} */}
     
    </div>
    
    
   
    
  );
}

export default DragDrop;