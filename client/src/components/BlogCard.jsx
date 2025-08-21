import { FaLink } from "react-icons/fa";
import { useState } from "react";


const BlogCard = ({ trip, onTagClick }) => {

  const [copied, setCopied] = useState(false);
  
   const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trip.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  if (!trip) return null;

  return (
    <div className="trip-card w-full max-w-4xl flex flex-col ">
      <div className="flex flex-row justify-center mx-15 my-5">

        {/* Main Image */}
        {trip.photos[0] && (
          <img
            src={trip.photos[0]}
            alt="main-trip-image"
            className="w-[200px] h-[150px] object-cover rounded-xl mb-2"
          />
        )}

        {/* Title, Description & Small images */}
        <div className="flex flex-col ml-5 mx-20">
          <a href={trip.url}>
          <h2 className="font-semibold font-prompt hover:text-blue-500 hover:underline">{trip.title}</h2>
          </a>
          <p className="line-clamp-1 font-prompt text-[12px]">{trip.description}</p>
          <a
            href={trip.url}
            className="font-prompt text-blue-600 hover:text-blue-800 underline text-[12px]"
          >
            อ่านต่อ
          </a>

          {/* Tags */}
          <div className="flex flex-row gap-2 mt-1">
            <p className="font-prompt text-[12px]">หมวด</p>
            {trip.tags?.map((tag, index) => (
              <p 
              key={index} 
              className="font-prompt text-[12px] underline text-gray-500 hover:text-black cursor-pointer"
              onClick={() => onTagClick(tag)}
              >{tag}
              </p>
            ))}
          </div>

          {/* Small images */}
          <div className="flex flex-row justify-between">
          <div className="flex gap-5 mt-2">
            {trip.photos?.slice(1, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`trip-thumbnail-${index}`}
                className="w-15 h-15 object-cover rounded-lg"
              />
            ))}
            {/* Copy to Clipboard Button */}
          </div>
            <FaLink className="h-5 w-5 mt-10 text-blue-500 hover:text-blue-800 cursor-pointer" onClick={handleCopyLink}/>
            {/* Copied Notification */}
            {copied && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded shadow-md animate-fadeInOut">
              Copied to Clipboard!
            </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
