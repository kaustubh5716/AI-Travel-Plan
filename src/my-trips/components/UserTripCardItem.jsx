import React, { useEffect, useState } from 'react';
import { PHOTO_REF_URL, GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photos = resp.data.places[0].photos;

      // Loop through photos starting from index 3 to find a valid photo
      let validPhotoUrl = '/Travel-Img.jpg';
      for (let i = 3; i < photos.length; i++) {
        if (photos[i]?.name) {
          validPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[i].name);
          break;
        }
      }
      setPhotoUrl(validPhotoUrl);
    });
  };

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-transform hover:shadow-lg p-4 rounded-lg">
        <img
          src={photoUrl || '/Travel-Img.jpg'}
          className="object-cover rounded-xl h-[200px] w-[200px]"
          alt="Trip Image"
        />
        <div className="mt-2">
          <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days Trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
