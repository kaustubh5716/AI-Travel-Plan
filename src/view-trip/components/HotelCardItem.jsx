import React from 'react'
import { Link } from 'react-router-dom'
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useState } from 'react';
import { useEffect } from 'react';

const HotelCardItem = ({hotel}) => {
    const [photoUrl,setPhotoUrl] = useState();
  const GetPlacePhoto = async() =>{
    const data = {
      textQuery : hotel.HotelName
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

        
    //   console.log(resp.data.places[0].photos[2].name)
    //   const PhotoUrl = PHOTO_REF_URL.replace('{NAME}' , resp.data.places[0].photos[3].name);
    //   setPhotoUrl(PhotoUrl);
    })
  }
  useEffect(()=>{
    hotel&&GetPlacePhoto()
  },[hotel])
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.HotelName + "," + hotel.HotelAddress} target='_blank'>
          <div  className="p-2 hover:scale-105 transition-all cursor-pointer hover:shadow-lg"> 
            <img 
            src={photoUrl || '/Travel-Img.jpg'}
             className='rounded-xl w-full object-cover h-60 object-cover'
            />
            <div className='my-2 flex flex-col'>
              <h2 className='font-medium'>🏨 {hotel?.HotelName}</h2>
              <h2 className='text-xs text-gray-600 font-medium'>📍 {hotel?.HotelAddress}</h2>
              <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
              <h2 className='text-sm font-medium'>⭐ {hotel?.rating}</h2>
            </div>
          </div>
          </Link>
  )
}

export default HotelCardItem