import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit At</h2>
      <div>
        {trip?.tripData?.travelPlan?.itinerary.map((item, index) => (
          <div key={index} className='mt-5'> {/* Added key prop */}
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div  className='grid md:grid-cols-2 gap-5'>
            {item.plan.map((place,index) => (
                <div key={index}>
                    <h2 className='font-medium text-sm text-orange-500'>{place.timeTravel}</h2>
                    <div className='my-3'>
                        <PlaceCardItem place={place} location = {trip?.userSelection?.location?.label}/>
                    </div>
               </div>
            ))}
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
