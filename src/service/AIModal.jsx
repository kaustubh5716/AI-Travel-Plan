import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for location : Las Vegas, for 3 days for couple with a cheap budget, Give me a hotels options list with  HotelName, Hotel Address, price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, Place details, Place Image Url, Geo Coordinates, ticket pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
  "travelPlan": {
    "location": "Las Vegas",
    "duration": "3 days",
    "budget": "cheap",
    "travelers": "couple",
    "hotels": [
      {
        "HotelName": "Circus Circus Hotel & Casino",
        "HotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40-$80",
        "hotelImageURL": "https://www.circuscircus.com/wp-content/uploads/2023/07/CC_Exterior_Hero_2023.jpg",
        "geoCoordinates": {
          "latitude": 36.1215,
          "longitude": -115.1738
        },
        "rating": 3.5,
        "description": "A classic Las Vegas hotel and casino with affordable rooms, family-friendly attractions like the Adventuredome theme park, and a lively casino floor.",
        "bookingURL": "https://www.circuscircus.com/booking/"
      },
      {
        "HotelName": "Main Street Station Casino, Brewery & Hotel",
        "HotelAddress": "200 S Main St, Las Vegas, NV 89101",
        "price": "$30-$60",
        "hotelImageURL": "https://www.mainstreetstationcasino.com/wp-content/uploads/2023/07/Main-Street-Station-Exterior-Photo.jpg",
        "geoCoordinates": {
          "latitude": 36.1653,
          "longitude": -115.1376
        },
        "rating": 4.0,
        "description": "A historic hotel and casino located in downtown Las Vegas, offering budget-friendly rooms, a unique atmosphere with its collection of Victorian-era artifacts, and a popular microbrewery.",
         "bookingURL": "https://www.mainstreetstationcasino.com/"
      },
      {
        "HotelName": "Luxor Hotel & Casino",
        "HotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
        "price": "$50-$100",
        "hotelImageURL": "https://www.luxor.com/content/dam/mgmresorts/luxor/images/hero/luxor-exterior-day.jpg",
        "geoCoordinates": {
          "latitude": 36.0917,
          "longitude": -115.1723
        },
        "rating": 4.0,
        "description": "A themed hotel and casino with a distinctive pyramid shape, offering a variety of amenities including a large pool complex, multiple restaurants and bars, and entertainment options at competitive prices.",
        "bookingURL": "https://www.luxor.com/en.html"

      },
      {
        "HotelName": "Excalibur Hotel & Casino",
        "HotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$45-$95",
        "hotelImageURL": "https://www.excalibur.com/content/dam/mgmresorts/excalibur/images/hero/excalibur-exterior-night.jpg",
        "geoCoordinates": {
          "latitude": 36.1008,
          "longitude": -115.1728
        },
        "rating": 3.5,
        "description": "A medieval-themed hotel and casino offering affordable rooms, a fun atmosphere, and various dining and entertainment options.",
        "bookingURL": "https://www.excalibur.com/en.html"
      },
       {
        "HotelName": "The LINQ Hotel + Experience",
        "HotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$50-$110",
        "hotelImageURL": "https://www.caesars.com/content/dam/clv/hotel-imagery/property-overview-mobile-hero/LINQ-Hotel-Overview-Mobile-Hero.jpeg",
        "geoCoordinates": {
          "latitude": 36.1153,
          "longitude": -115.1744
        },
        "rating": 4.0,
        "description": "A modern and centrally located hotel on the Strip, with access to the LINQ Promenade and the High Roller Observation Wheel.",
        "bookingURL": "https://www.caesars.com/linq"
      }

    ],
    "itinerary": [
      {
        "day": "Day 1",
        "bestTimeToVisit": "Evening/Night",
        "plan": [
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "Experience the Viva Vision light show and live music performances under a canopy of LED lights.",
            "placeImageURL": "https://www.vegasexperience.com/sites/default/files/styles/large/public/2020-02/FremontStreetExperience-Hero.jpg",
            "geoCoordinates": {
              "latitude": 36.1692,
              "longitude": -115.1407
            },
            "ticketPricing": "Free",
            "timeTravel": "7:00 PM - 9:00 PM",
            "timeToTravel": "0 mins (if staying downtown)"
          },
          {
            "placeName": "Container Park",
            "placeDetails": "Explore unique shops, restaurants, bars, and free live music centered around a giant praying mantis sculpture that shoots fire.",
            "placeImageURL": "https://www.containerpark.com/wp-content/uploads/2021/03/Container-Park-Aerial-Shot.jpg",
            "geoCoordinates": {
              "latitude": 36.1681,
              "longitude": -115.1422
            },
            "ticketPricing": "Free entry",
            "timeTravel": "9:00 PM - 10:30 PM",
            "timeToTravel": "10 mins (walking from Fremont St)"

          },
          {
            "placeName": "The Neon Museum",
            "placeDetails": "See iconic Las Vegas signs from the past. A night tour is recommended for the full effect of the neon lights.",
            "placeImageURL": "https://www.neonmuseum.org/wp-content/uploads/2023/07/Neon-Museum-Boneyard-Night-Tour-Hero.jpg",
            "geoCoordinates": {
              "latitude": 36.1746,
              "longitude": -115.1358
            },
            "ticketPricing": "$25-$35",
            "timeTravel": "10:30 PM - 12:00 AM",
            "timeToTravel": "15 mins (from Container Park)"
          }
        ]
      },
      {
        "day": "Day 2",
        "bestTimeToVisit": "Daytime",
        "plan": [
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "Wander through stunning floral displays that change seasonally, a free and beautiful experience.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bellagio_Conservatory_%26_Botanical_Gardens_-_October_2018.jpg/1280px-Bellagio_Conservatory_%26_Botanical_Gardens_-_October_2018.jpg",
            "geoCoordinates": {
              "latitude": 36.1146,
              "longitude": -115.1729
            },
            "ticketPricing": "Free",
            "timeTravel": "9:00 AM - 10:00 AM",
            "timeToTravel": "Depends on hotel location"

          },
          {
            "placeName": "High Roller Observation Wheel",
            "placeDetails": "Enjoy panoramic views of the Las Vegas Strip from this giant Ferris wheel.  Consider going at sunset for spectacular views.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/High_Roller_Observation_Wheel.jpg/1280px-High_Roller_Observation_Wheel.jpg",
            "geoCoordinates": {
              "latitude": 36.1153,
              "longitude": -115.1744
            },
            "ticketPricing": "$30 per person",
            "timeTravel": "10:00 AM - 11:30 AM",
            "timeToTravel": "5 mins (walk from Bellagio)"
          },
           {
            "placeName": "The LINQ Promenade",
            "placeDetails": "Stroll through this open-air shopping, dining, and entertainment district.  Plenty of budget-friendly food options are available.",
            "placeImageURL": "https://www.thelinq.com/sites/default/files/styles/image_gallery_full/public/2023-08/linq-promenade-aerial-view-hero.jpg?h=832e6f4b&itok=10rU8j-b",
            "geoCoordinates": {
              "latitude": 36.1153,
              "longitude": -115.1744
            },
            "ticketPricing": "Free entry",
            "timeTravel": "11:30 AM - 1:00 PM",
            "timeToTravel": "At the base of the High Roller"
          },
          {
            "placeName": "In-N-Out Burger",
            "placeDetails": "A West Coast classic for a cheap and tasty lunch.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/In-N-Out_Burger_logo.svg/1200px-In-N-Out_Burger_logo.svg.png",
            "geoCoordinates": {
              "latitude": "Multiple locations",
              "longitude": "Multiple locations"
            },
            "ticketPricing": "Variable",
            "timeTravel": "1:00 PM - 2:00 PM",
            "timeToTravel": "15 mins (depending on location)"
          },
          {
            "placeName": "Seven Magic Mountains",
            "placeDetails": "Drive south of the city to see this colorful public art installation of stacked, painted boulder totems.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Seven_Magic_Mountains_by_Ugo_Rondinone.jpg/1280px-Seven_Magic_Mountains_by_Ugo_Rondinone.jpg",
            "geoCoordinates": {
              "latitude": 36.015,
              "longitude": -114.982
            },
            "ticketPricing": "Free",
            "timeTravel": "2:30 PM - 4:00 PM",
            "timeToTravel": "30 mins (driving from the Strip)"
          }


        ]
      },
      {
        "day": "Day 3",
        "bestTimeToVisit": "Daytime",
        "plan": [
          {
            "placeName": "Hoover Dam",
            "placeDetails": "Visit this impressive engineering marvel and take a tour to learn about its history and construction.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hoover_Dam_from_Nevada_side_2019.jpg/1280px-Hoover_Dam_from_Nevada_side_2019.jpg",
            "geoCoordinates": {
              "latitude": 36.017,
              "longitude": -114.74
            },
            "ticketPricing": "$30 per person (approx)",
            "timeTravel": "9:00 AM - 12:00 PM",
            "timeToTravel": "45 mins (driving from Las Vegas)"
          },
          {
            "placeName": "Red Rock Canyon National Conservation Area",
            "placeDetails": "Explore the scenic 13-mile driving loop, hike among the red rock formations, or enjoy rock climbing.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_Rock_Canyon_National_Conservation_Area.jpg/1280px-Red_Rock_Canyon_National_Conservation_Area.jpg",
            "geoCoordinates": {
              "latitude": 36.1667,
              "longitude": -115.4167
            },
            "ticketPricing": "$15 per vehicle",
            "timeTravel": "1:00 PM - 4:00 PM",
            "timeToTravel": "30 mins (from Hoover Dam)"
          }
        ]
      }
    ]
  }
}`
        },
      ],
    },
  ],
});
