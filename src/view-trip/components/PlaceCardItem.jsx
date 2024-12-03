import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';


const PlaceCardItem = ({ place, location }) => {
  const [photoUrl,setPhotoUrl] = useState();
  const GetPlacePhoto = async() =>{
    const data = {
      textQuery : place.placeName
    }
    const result = await GetPlaceDetails(data).then(resp =>{
      const photos = resp.data.places[0].photos;
      
      // Loop through photos starting from index 3 to 9 (or the total length of photos)
      let validPhotoUrl = '/Travel-Img.jpg';  // Fallback to default image
      for (let i = 1; i < photos.length; i++) {
        if (photos[i]?.name) {
          validPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[i].name);
          break;  // Exit loop once a valid photo is found
        }
      }

      // Set the photo URL (valid or fallback)
      setPhotoUrl(validPhotoUrl);
      // const PhotoUrl = PHOTO_REF_URL.replace('{NAME}' , resp.data.places[0].photos[3].name);
      // setPhotoUrl(PhotoUrl);
    })
  }
  useEffect(()=>{
    place&&GetPlacePhoto()
  },[place])
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer '>
      <img src={photoUrl || '/Travel-Img.jpg'}  className='w-[100px] h-[100px] rounded-xl object-cover' />
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm'>{place.placeDetails}</p>
        <h2 className='mt-2'>⏲️ {place?.timeToTravel || 'Anytime'}</h2>
        <h2 className='mt-2'>Fees : {place?.ticketPricing || 'Free'}</h2>
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + location + ',' + place.placeName} target='_blank'>
          <button className='text-4xl'><MdLocationOn /></button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCardItem;
