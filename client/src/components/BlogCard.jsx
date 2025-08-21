import { useEffect, useState } from "react";
import axios from 'axios';


const BlogCard = () => {

  const [tripsData, setTripsData] = useState([]);

  const fetchTripsData = async () => {
    try {
    const result = await axios.get("http://localhost:4001/trips?keywords=");
    setTripsData(result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  fetchTripsData();
}, []);


  return (
    <div className="my-10 mx-10">
      {tripsData.map(trip => (
        <div className="trip-card" key={trip.eid}>
          <div className="flex flex-row justify-center mx-15 my-10">

            {/* Main Image */}
          {trip.photos[0] && (
        <img
          src={trip.photos[0]}
          alt="main-trip-image"
          className="w-[200px] h-[150px] object-cover rounded-xl mb-2"
        />
      )}

      {/* Title , Detail & Small images */}
      <div className="flex flex-col ml-5 mx-20">
          <h2 className="font-semibold font-prompt">{trip.title}</h2>
          <p className="line-clamp-1 font-prompt text-[12px]">{trip.description}</p>
          <a href={trip.url} className="font-prompt text-blue-600 underline text-[12px]">อ่านต่อ</a>
          {/* Tags */}
          <div className="flex flex-row gap-2 ">
          <p className="font-prompt text-[12px]">หมวด</p>
          {trip.tags.map((tag, index) => (
            <p key={index} className="font-prompt text-[12px] underline">{tag}</p>
          ))}
          </div>
          <div className="flex gap-5 mt-2">
        {trip.photos.slice(1, 4).map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`trip-thumbnail-${index}`}
            className="w-15 h-15 object-cover rounded-lg"
          />
        ))}
      </div>
        </div>
        </div>
        </div>
      ))}
    </div>
  )
}

export default BlogCard;