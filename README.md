# AI-Trip-Planner

AI-Trip-Planner is an intelligent travel planning platform that leverages AI to help users plan personalized trips. Users can log in using Google OAuth, select their destination, budget, trip duration, and other trip parameters, and receive smart recommendations for hotels, places to visit, and a detailed day-by-day itinerary. All data is securely stored in Firebase for real-time access.

## Features

- **Google OAuth Login**: Users can authenticate using their Google account for a seamless login experience.
- **Trip Creation**: Users can create custom trips by selecting places to visit, the number of travelers, trip budget, and duration.
- **AI-Powered Suggestions**: Uses the Gemini 1.5 Flash API to provide personalized trip recommendations, including hotels, best visiting times, and activity suggestions.
- **Dynamic Itinerary**: Displays a detailed itinerary with day-by-day plans, including prices, activities, and times to visit.
- **Firebase Database**: Stores user trip data and recommendations for real-time retrieval.
- **Google APIs**: Uses Google Maps and Google Text Search API to fetch images and provide location-related information.
- **Responsive Design**: Built with React and styled using Tailwind CSS to ensure an optimal experience across all devices.

## Technologies Used

- **React**: Frontend framework for building the dynamic user interface.
- **Google OAuth**: User authentication.
- **Google Maps API**: For location-based services.
- **Google Text Search API**: For generating images and location data.
- **Gemini 1.5 Flash API**: AI-based model for generating personalized travel suggestions.
- **Firebase**: Real-time database for storing trip details and recommendations.
- **Tailwind CSS**: Styling framework for building responsive, modern layouts.
- **Dynamic Routing**: React Router for navigation between trip creation and trip details.

## Setup and Installation

To get started with the project locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- Firebase account (for setting up the database)
- Google Cloud project for OAuth and APIs (Google Maps API, Text Search API, and Gemini API)


### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/kaustubh5716/AI-Trip-Planner.git
Install dependencies:

2. Navigate to the project folder and install the required packages.
cd AI-Trip-Planner
npm install
Set up Firebase:

   3. Create a Firebase project at Firebase Console.
Obtain the Firebase configuration and add it to the .env file in the root directory.
Set up Google API keys:

4. Create a project on Google Cloud Console.
Enable APIs: Google Maps API, Google Text Search API, and Gemini 1.5 Flash API.
Obtain the necessary API keys and set them in the .env file.
5. Run the application: npm start
