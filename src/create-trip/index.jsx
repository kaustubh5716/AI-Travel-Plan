import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  // setOpenDialog(true); // Set dialog state here
  // }
  // }, []); // Runs only once when the component mounts
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true); // Set dialog state here
      return;
    }

    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.travaler
    ) {
      toast("Enter all fields properly and no of days should be less than 6");
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travaler}", formData?.travaler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    // console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
    setLoading(false); //everything is done
  };
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo}`,
        {
          headers: {
            Authorization: `Bearer${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };
  const SaveAiTrip = (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    let parsedData;
    try {
      // Step 1: Clean the AI-generated data
      const sanitizedData = TripData.trim();

      // Step 2: Validate and extract JSON using regex
      const jsonMatch = sanitizedData.match(/{.*}/s); // Match the first valid JSON block
      if (!jsonMatch) {
        throw new Error("No valid JSON object found in the response.");
      }

      // Step 3: Parse the cleaned JSON
      parsedData = JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("Error parsing trip data:", error);
      toast("Failed to parse trip data. Please check the AI response.");
      setLoading(false);
      return;
    }

    // Step 4: Save to Firestore
    setDoc(doc(db, "AiTrips", docId), {
      tripData: parsedData,
      userSelection: formData,
      userEmail: user?.email,
      userName : user?.name,
      id: docId,
    })
      .then(() => {
        setLoading(false);
        navigate("/view-trip/" + docId);
      })
      .catch((error) => {
        console.error("Error saving trip data:", error);
        toast("Failed to save trip data. Please check your input.");
        setLoading(false);
      });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide your basic information and our trip planner will generate a
        customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            placeholder="Ex. 3"
            type="number"
            min="1"
            className="border rounded px-3 py-2 w-full bg-white text-black"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg 
              hover:shadow-lg cursor-pointer
              ${formData?.budget == item.title && "shadow-lg border-black"}
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
        {/* <p>The budget is exclusivly allocated for activities and dinning purpose.</p> */}
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan or traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travaler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.travaler == item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg" style={{ height: "50px" }} />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="w-10 h-10" /> {/* Set size explicitly */}
                SIGN IN
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
