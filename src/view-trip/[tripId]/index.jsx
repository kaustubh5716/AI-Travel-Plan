import { getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { doc } from "firebase/firestore";
import InfoSection from '../components/infoSection'; // Capitalized import
import { db } from "@/service/firebaseConfig";
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const Viewtrip = () => {
    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData = async ()=>{ //use to get trip data from firebase
        const docRef = doc(db,'AiTrips', tripId); 
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            const data = docSnap.data(); // Get the data from the document
            // console.log("Document Data:", data); // Log the data directly
            setTrip(data);
        }
        else{
            console.log("No such Document Exist");
            toast('Sorry!,No Trip Found');
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'> 
        {/* information Section */}
        <InfoSection trip ={trip}/>

        {/* Recommended Hotels */}
        <Hotels trip = {trip}/>
 

        {/* Daily Plans */}
        <PlacesToVisit trip = {trip}/>


        {/* Footer */}
        <Footer trip={trip}/>
    </div>
  )
}

export default Viewtrip