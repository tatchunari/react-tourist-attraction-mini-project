import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import BlogCard from "../components/BlogCard";

const SearchTripPage = () => {
  const [tripsData, setTripsData] = useState([]);
  const [searchText, setSearchText] = useState("");

    
  // Fetch Trips Data with Debouncing
  useEffect(() => {
    const debouncedFetch = debounce(async (keywords) => {
      try {
        const res = await axios.get(`http://localhost:4001/trips?keywords=${keywords}`);
        setTripsData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    }, 300); 

    debouncedFetch(searchText);

    return () => debouncedFetch.cancel();
  }, [searchText]);


  // For when user types in input
    const handleChange = (e) => {
      setSearchText(e.target.value);
    }

    // When user clicks the tag
    const handleTagClick = (tag) => {
      const tagsArray = searchText.split(" ").filter(Boolean);
      if (!tagsArray.includes(tag)) {
        const newSearch = tagsArray.length > 0 ? `${searchText} ${tag}` : tag;
        setSearchText(newSearch);
    }
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
          <BlogCard key={trip.eid} trip={trip} onTagClick={handleTagClick} />
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchTripPage;
