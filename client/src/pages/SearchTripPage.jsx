import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const SearchTripPage = () => {
  const [tripsData, setTripsData] = useState([]);
  const [searchText, setSearchText] = useState("");

    useEffect(() => {
      const fetchTripsData = async () => {
        try {
          const res = await axios.get("http://localhost:4001/trips?keywords=");
          setTripsData(res.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTripsData();
    }, [searchText]);

    const handleChange = (e) => {
      setSearchText(e.target.value);
    }

  return (
    <div>
      <h1 className="text-5xl mt-10 text-center text-blue-400 font-prompt">เที่ยวไหนดี</h1>

      <div className="flex flex-col items-center mt-5">
        <label className="font-prompt">ค้นหาที่เที่ยว</label>
        <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-full max-w-md">
          <input
            className="px-2 w-full h-full outline-none text-gray-500 bg-transparent font-prompt"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน"
            value={searchText}
            onChange={handleChange}
          />
        </div>
      </div>
      {tripsData.length > 0 && (
         <div className="my-10 mx-10">
        {tripsData.map((trip) => (
          <BlogCard key={trip.eid} trip={trip} />
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchTripPage;
