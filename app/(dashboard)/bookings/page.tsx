"use client"
import React, { useEffect, useState } from 'react'
import firebase from "firebase/compat/app";
//import firebase from "firebase/app";
// Required for side-effects
//import "firebase/firestore";
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};



firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
interface passengerdata{
   passenger1:string;
   passenger2:string;
   boatname:string;
   boatprice:number;
   extraprice:number;
   guide:boolean;
  insurance:boolean;
   transport:string[];
   meals:string[];
   phone:string;
}
const page = () => {
  const [bookings, setBookings] = useState<passengerdata[]>([]);
  useEffect(() => {
    const fetchdata=async()=>{
      let arr:passengerdata[]=[];

 await db.collection("bookings").get().then((item)=>{
  item.forEach((doc)=>{
      let detail:passengerdata={
        passenger1:doc.data().passenger1,
        passenger2:doc.data().passenger2,
        boatname: doc.data().boatName,
        boatprice: doc.data().boatprice,
        extraprice: doc.data().extraprice,
        guide: doc.data().guide,
        insurance: doc.data().insurance,
        transport: doc.data().transportation,
        meals: doc.data().meals,
        phone: doc.data().phone
      }
      //console.log(detail);
      
      arr.push(detail);
      //console.log(doc.data().meals);
  });
  //console.log(arr);
  
 });
 setBookings(arr);
    }
    fetchdata();
    
  }, [])
  
  return (
    <div>
      <h1>Bookings</h1>
      
        <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>Boat Name</th>
        <th>Passenger1 Name</th>
        <th>Passenger2 Name</th>
        <th>Boat Price</th>
        <th>Extra Charges</th>
        <th>Guide</th>
        <th>Insurance</th>
        <th>Transport</th>
        <th>Meals</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
    {bookings.map((booking,index:number)=>(
        <tr key={index}>
          <th>{index+1}</th>
          <td> {booking.boatname}</td>
          <td> {booking.passenger1}</td>
          <td> {booking.passenger2}</td>
        
        <td> ₹{booking.boatprice}</td>
        <td> ₹{booking.extraprice}</td>
        <td> {booking.guide ? "Yes" : "No"}</td>
        <td>{booking.insurance ? "Yes" : "No"}</td>
        
        <td>{booking.transport.join(", ")}</td>
        <td> {booking.meals.join(", ")}</td>
        <td> {booking.phone}</td>
        
      </tr>
      
      ))
        }
      
    </tbody>
  </table>
</div>


    </div>
  )
}

export default page