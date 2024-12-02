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
        "geoCoordinates": "36.1215° N, 115.1738° W",
        "rating": "3.5 stars",
        "description": "A classic Las Vegas hotel and casino with affordable rooms and family-friendly attractions."
      },
      {
        "HotelName": "Main Street Station Casino, Brewery & Hotel",
        "HotelAddress": "200 S Main St, Las Vegas, NV 89101",
        "price": "$30-$60",
        "hotelImageURL": "https://www.mainstreetstationcasino.com/wp-content/uploads/2023/07/Main-Street-Station-Exterior-Photo.jpg",
        "geoCoordinates": "36.1653° N, 115.1376° W",
        "rating": "4 stars",
        "description": "A historic hotel and casino located in downtown Las Vegas, offering budget-friendly rooms and a unique atmosphere."
      },
      {
        "HotelName": "Luxor Hotel & Casino",
        "HotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
        "price": "$50-$100",
        "hotelImageURL": "https://www.luxor.com/content/dam/mgmresorts/luxor/images/hero/luxor-exterior-day.jpg",
        "geoCoordinates": "36.0917° N, 115.1723° W",
        "rating": "4 stars",
        "description": "A themed hotel and casino with a distinctive pyramid shape, offering a variety of amenities and entertainment options at competitive prices."
      }
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "plan": [
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "Experience the Viva Vision light show and street performers.",
            "placeImageURL": "https://www.vegasexperience.com/sites/default/files/styles/large/public/2020-02/FremontStreetExperience-Hero.jpg",
            "geoCoordinates": "36.1692° N, 115.1407° W",
            "ticketPricing": "Free",
            "timeTravel": "7:00pm - 9:00pm",
            "timeToTravel": "0 mins"
          },
          {
            "placeName": "Container Park",
            "placeDetails": "Unique shops, restaurants, and a giant praying mantis sculpture.",
            "placeImageURL": "https://www.containerpark.com/wp-content/uploads/2021/03/Container-Park-Aerial-Shot.jpg",
            "geoCoordinates": "36.1681° N, 115.1422° W",
            "ticketPricing": "Free entry",
            "timeTravel": "9:30pm - 10:30pm",
            "timeToTravel": "15 mins"
          },
          {
            "placeName": "The Neon Museum",
            "placeDetails": "See iconic Las Vegas signs from the past (consider a night tour).",
            "placeImageURL": "https://www.neonmuseum.org/wp-content/uploads/2023/07/Neon-Museum-Boneyard-Night-Tour-Hero.jpg",
            "geoCoordinates": "36.1746° N, 115.1358° W",
            "ticketPricing": "$25-35",
            "timeTravel": "11:00pm - 12:00am",
            "timeToTravel": "10 mins"
          },
          {
            "placeName": "Seven Magic Mountains",
            "placeDetails": "Colorful art installation south of the city (requires transport).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Seven_Magic_Mountains_by_Ugo_Rondinone.jpg/1280px-Seven_Magic_Mountains_by_Ugo_Rondinone.jpg",
            "geoCoordinates": "36.015° N, 114.982° W",
            "ticketPricing": "Free",
            "timeTravel": "2:00pm - 3:30pm",
            "timeToTravel": "30 mins"
          }

        ]
      },
      {
        "day": "Day 2",
        "plan": [
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "Stunning floral displays (free entry).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Bellagio_Conservatory_%26_Botanical_Gardens_-_October_2018.jpg/1280px-Bellagio_Conservatory_%26_Botanical_Gardens_-_October_2018.jpg",
            "geoCoordinates": "36.1146° N, 115.1729° W",
            "ticketPricing": "Free",
            "timeTravel": "9:00am - 10:00am",
            "timeToTravel": "15 mins"
          },
          {
            "placeName": "High Roller Observation Wheel",
            "placeDetails": "Amazing views of the Strip ($30 per person).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/High_Roller_Observation_Wheel.jpg/1280px-High_Roller_Observation_Wheel.jpg",
            "geoCoordinates": "36.1153° N, 115.1744° W",
            "ticketPricing": "$30 per person",
            "timeTravel": "10:30am - 11:30am",
            "timeToTravel": "5 mins"
          },
          {
            "placeName": "The LINQ Promenade",
            "placeDetails": "Outdoor shopping, dining, and entertainment.",
            "placeImageURL": "https://www.thelinq.com/sites/default/files/styles/image_gallery_full/public/2023-08/linq-promenade-aerial-view-hero.jpg?h=832e6f4b&itok=10rU8j-b",
            "geoCoordinates": "36.1153° N, 115.1744° W",
            "ticketPricing": "Free entry",
            "timeTravel": "12:00pm - 1:00pm",
            "timeToTravel": "5 mins"
          },          
          {
            "placeName": "In-N-Out Burger",
            "placeDetails": "A West Coast classic for a cheap and tasty lunch.",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/In-N-Out_Burger_logo.svg/1200px-In-N-Out_Burger_logo.svg.png",
            "geoCoordinates": "Multiple locations",
            "ticketPricing": "Variable",
            "timeTravel": "1:30pm - 2:30pm",
            "timeToTravel": "15 mins (depending on location)"
          }
        ]
      },
      {
        "day": "Day 3",
        "plan": [
          {
            "placeName": "Hoover Dam",
            "placeDetails": "A massive engineering marvel (consider a tour).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hoover_Dam_from_Nevada_side_2019.jpg/1280px-Hoover_Dam_from_Nevada_side_2019.jpg",
            "geoCoordinates": "36.017° N, 114.74° W",
            "ticketPricing": "$30 per person (approx)",
            "timeTravel": "9:00am - 12:00pm",
            "timeToTravel": "45 mins"
          },
          {
            "placeName": "Red Rock Canyon National Conservation Area",
            "placeDetails": "Hiking trails and scenic drives ($15 per vehicle).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_Rock_Canyon_National_Conservation_Area.jpg/1280px-Red_Rock_Canyon_National_Conservation_Area.jpg",
            "geoCoordinates": "36.1667° N, 115.8833° W",
            "ticketPricing": "$15 per vehicle",
            "timeTravel": "1:00pm - 4:00pm",
            "timeToTravel": "30 mins"
          },
          {
            "placeName": "Valley of Fire State Park",
            "placeDetails": "Stunning red sandstone formations (requires transport).",
            "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Valley_of_Fire_State_Park_Nevada.jpg/1280px-Valley_of_Fire_State_Park_Nevada.jpg",
            "geoCoordinates": "36.3667° N, 114.8° W",
            "ticketPricing": "$10 per vehicle",
            "timeTravel": "4:30pm - 6:30pm",
            "timeToTravel": "45 mins"
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
