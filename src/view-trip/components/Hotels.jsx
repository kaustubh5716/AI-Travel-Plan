import React from 'react'
import HotelCardItem from './HotelCardItem'
const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel}/>
        ))}
      </div>
    </div>
  )
}

export default Hotels
