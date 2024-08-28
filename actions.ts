
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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
