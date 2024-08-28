
"use client"
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const storage = getStorage(app);

import DragDrop from '@/components/Draganddrop'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { uploaddata } from '@/actions'
import { FileUploader } from "react-drag-drop-files";
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { increment } from '@/lib/features/checkboxes/checkboxSlice'
import { userChoices } from '@/lib/features/choices/choicesSlice'

//import { handleChange } from "@/actions";
const fileTypes = ["JPG", "PNG", "GIF","JPEG"];


interface choices {
  amenity: string[],
  safety: string[],
  meal:string,

}
interface Errors {
  price?:string,
  boatname?: string,
  capacity?: string,
  details?: string,
  amenity?: string,
  safety?: string,
  meal?:string,
  file?:string,
  
}
const page = () => {
 
   const count=useAppSelector(state=>state.counter);
   const notify = () => toast("Saved");
    const dispatch=useAppDispatch();
    const [amenities, setAmenities] = useState<string[]>([]);
    const [safetyFeatures, setSafetyFeatures] = useState<string[]>([]);
    const [meals, setMeals] = useState<string>("");
    const [file, setFile] = useState<File|null>(null);
    const [loading,setLoading]=useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    const[Boatname,setBoatname] = useState<string>("");
      const [Capacity,setCapacity] = useState<string>("");
      const [Details, setDetails] = useState<string>("");
      const [Price, setPrice] = useState<string>("");
      let boatname="";
      let capacity=0;
      let details="";
      let price="";


      useEffect(() => {
        validateForm();
    }, [boatname, capacity,details,price,file,meals,safetyFeatures,amenities]);
    // Validate form
    const validateForm = () => {
        let errors:Errors = {};
        let errorcount = 0;
        if (!Boatname) {
          console.log("boatname");
          
            errors.boatname = 'Name is required.';
            errorcount=1;
        }
        if(!Price){
          errors.price = 'Price is required.';
          errorcount=1;
          console.log("price");
        }
        if(!Capacity){
          errors.capacity = 'Capacity is required.';
          errorcount=1;
          console.log("capa");
        }
        if(!Details){
          errors.details = 'Details is required.';
          errorcount=1;
          console.log("deta");
        }
        
        if(amenities.length==0){
          errors.amenity = 'Amenities are required.';
          errorcount=1;
          console.log("amen");
        }
        if(safetyFeatures.length==0){
          errors.safety = 'Safety features are required.';
          errorcount=1;
          console.log("safety");
        }
        if(!file){
          errors.file = 'Image is required.';
          errorcount=1;
          console.log("img");
        }
        if(!meals){
          errors.meal = 'Meal is required.';
          errorcount=1;
          console.log("meals");
        }

        
  console.log(errorcount);
  
        setErrors(errors);
        setIsFormValid(errorcount==0);
    };

    
  const handleChange = (file:File) => {
    setFile(file);
    //console.log(file);
    
  };
    const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      const { value, checked } = event.target;
      if (checked) {
        setState(prev => [...prev, value]);
      } else {
        setState(prev => prev.filter(item => item !== value));
      }
      const userChoice:choices={
        amenity:amenities,
        safety: safetyFeatures,
        meal:meals,
      }
      
      dispatch(userChoices(userChoice));
    }
   
    // const choices=useAppSelector((state)=>state.choices);
    const uploaddata=async(formData:any)=>{
      console.log("reached");
      
      if(isFormValid){
        console.log("here");
        
        boatname=formData.get("name");
       capacity=parseInt(formData.get("capacity"));
       details=formData.get("details");
       price=formData.get("price");
      setLoading(true);

      try {
        //const choices=useAppSelector((state)=>state.choices);
        
        const metadata = {
          contentType: 'image/jpeg'
        };
        
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = await ref(storage, 'images/' + file!.name);
        const uploadTask = await uploadBytesResumable(storageRef, file!, metadata);
        const dstorage = await getStorage();
        const url=await getDownloadURL(ref(storage, 'images/'+file!.name));
  
  const docRef = await addDoc(collection(db, "boats"), {
    boat_name:boatname,
    boat_capacity:capacity,
    boat_details:details,
    amenities:amenities,
    safety:safetyFeatures,
    meal:meals,
    price:price,
    image:url,
    
    
    
  });
        console.log("Document written with ID: ", docRef.id);
        notify();
        
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setLoading(false);
      }
       
    }
    return (
       <>
        <h1 className='px-8 pb-5'>Add Boat</h1>
    {/* <button onClick={()=>dispatch(increment())}>count</button> */}
    <form action={uploaddata}>
      <p>Name {errors.boatname && <p className="text-red-600">boatName is required</p>}</p>
      <input type="text" name="name" placeholder="Enter the Name of boat" className="w-full px-4 py-2 mb-4 border-2 border-base-300 rounded-md focus:outline-none focus:border-primary-500" onChange={(e)=>setBoatname(e.target.value)}/>
      <p>Capacity{errors.capacity && <p className="text-red-600" >capacity is required</p>}</p>
      <input type="text" name="capacity" placeholder="Enter the Capacity" className="w-full px-4 py-2 mb-4 border-2 border-base-300 rounded-md focus:outline-none focus:border-primary-500" onChange={(e)=>setCapacity(e.target.value)} />
      <p>Details{errors.details && <p className="text-red-600">Details are required</p>}</p>
      <input type="text" name="details" placeholder="Enter the details of the boat" className="w-full px-4 py-2 mb-4 border-2 border-base-300 rounded-md focus:outline-none focus:border-primary-500" onChange={(e)=>setDetails(e.target.value)}/>
      <p>Price{errors.price && <p className="text-red-600">Price is required</p>}</p>
      <input type="text" name="price" placeholder="Enter the Price of the boat" className="w-full px-4 py-2 mb-4 border-2 border-base-300 rounded-md focus:outline-none focus:border-primary-500" onChange={(e)=>setPrice(e.target.value)} />

     
    
      <div>
     <h1>Photos</h1>   
    <p>Upload photos of your boat</p>
    {errors.file && <p className="text-red-600">Image is required</p>}
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}  />
    {file && (
        <div>
          <p>File Uploaded: {file.name}</p>
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            style={{ width: "150px", height: "150px", marginTop: "10px" }} // Custom size
          />
        </div>
      )}
     
    </div>
    <hr className=" mt-5 border-t-0 border-b-2 border-dashed b  border-white" />
    
    <div className='mt-5'>
      <h2 className='font-bold'>Amenities</h2>
      <p>Select the amenities available on your boat to enhance passenger comfort and experience.
      {errors.amenity && <p className="text-red-600">amenities is required</p>}
      </p>
      <div>
        <label>
          <input
            type="checkbox"
            value="Clean Restrooms"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Clean Restrooms
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Comfortable Sitting arrangements"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Comfortable Sitting arrangements
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Onboarding Dining"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Onboarding Dining
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Wi-Fi Access"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Wi-Fi Access
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Entertainment System"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Entertainment System
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Air Conditioning/Climate Control"
            onChange={(e) => handleCheckboxChange(e, setAmenities)}
          /> Air Conditioning/Climate Control
        </label>
      </div>
      <hr className=" mt-5 border-t-0 border-b-2 border-dashed b  border-white" />
      <h2 className='mt-5'>Safety Features</h2>
      <p>Select the safety features available on your boat to enhance passenger safety.
      {errors.safety && <p className="text-red-600">Safety Features are required</p>}
      </p>
      <div>
        <label>
          <input
            type="checkbox"
            value="Live food provided to all passengers"
            onChange={(e) => handleCheckboxChange(e, setSafetyFeatures)}
          /> Live food provided to all passengers
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Emergency Kit onboard"
            onChange={(e) => handleCheckboxChange(e, setSafetyFeatures)}
          /> Emergency Kit onboard
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Fire Extinguishers"
            onChange={(e) => handleCheckboxChange(e, setSafetyFeatures)}
          /> Fire Extinguishers
        </label>
      </div>
      <hr className=" mt-5 border-t-0 border-b-2 border-dashed b  border-white" />
      <h2 className='mt-5'>Meals</h2>
      <p>Select the available meals on your boat.
      {errors.meal && <p className="text-red-600">Meals are required</p>}
      </p>
      <div>
        <label>
          <input
            type="checkbox"
            value="Veg/Non-veg"
            checked={meals=='Veg/Non-veg'}
            onChange={(e) =>  setMeals(e.target.value)}
          /> Veg/Non-veg
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="Pure Veg"
            checked={meals=='Pure Veg'}
            onChange={(e) => setMeals(e.target.value)}
          /> Pure Veg
        </label>
      </div>
    </div>
    <div className=' w-15 mt-5'>
      
    <button disabled={loading} type="submit" className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
      {loading?"Saving...":"save"}
    </button>
    <ToastContainer />
    </div>
    
    
    </form>
       </>
    )

 
}

export default page