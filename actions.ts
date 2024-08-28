
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useAppSelector } from "./lib/hooks";

const firebaseConfig = {
  apiKey: "AIzaSyB_zlBLoLQE42DEP28hMD-FMoITQYozt5o",
  authDomain: "boat-app-26efd.firebaseapp.com",
  projectId: "boat-app-26efd",
  storageBucket: "boat-app-26efd.appspot.com",
  messagingSenderId: "511621917310",
  appId: "1:511621917310:web:415850ae844c84d60a462f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const uploaddata=async(formData:any)=>{
  //"user server";
  const name=formData.get("name");
  const capacity=parseInt(formData.get("capacity"));
  const details=formData.get("details");
    
  try {
    //const choices=useAppSelector((state)=>state.choices);
    const docRef = await addDoc(collection(db, "boats"), {
      boat_name:name,
      boat_capacity:capacity,
      boat_details:details,
      //amenities:[choices.amenity],
      
      
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



 





export { uploaddata }
