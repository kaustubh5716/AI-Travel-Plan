import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL } from "@/service/GlobalApi";
const InfoSection = ({ trip }) => {
  const [photoUrl,setPhotoUrl] = useState();
  const GetPlacePhoto = async() =>{
    const data = {
      textQuery : trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp =>{
      const photos = resp.data.places[0].photos;
      
      // Loop through photos starting from index 3 to 9 (or the total length of photos)
      let validPhotoUrl = '/Travel-Img.jpg';  // Fallback to default image
      for (let i = 2; i < photos.length; i++) {
        if (photos[i]?.name) {
          validPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[i].name);
          break;  // Exit loop once a valid photo is found
        }
      }

      // Set the photo URL (valid or fallback)
      setPhotoUrl(validPhotoUrl);
      //below is earlier 
      // console.log(resp.data.places[0].photos[2].name)
      // const PhotoUrl = PHOTO_REF_URL.replace('{NAME}' , resp.data.places[0].photos[3].name);
      // setPhotoUrl(PhotoUrl);
    })
  }
  useEffect(()=>{
    trip&&GetPlacePhoto()
  },[trip])
  return (
    <div>
      <img src={photoUrl || '/Travel-Img.jpg'} alt="Travel" className="h-[340px] w-full object-cover rounded" />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs md:text-lg">Journey Span 📅 : {trip?.userSelection?.noOfDays} Days</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs md:text-lg">Budget 💸 : {trip?.userSelection?.budget}</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-black text-xs md:text-lg ">No of Traveler 🧳 : {trip?.userSelection?.travaler}</h2>
          </div>
        </div>
        <button className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-700 focus:outline-none text-xl">
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
