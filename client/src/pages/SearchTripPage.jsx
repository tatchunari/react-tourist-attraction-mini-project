import BlogCard from "../components/BlogCard"


const SearchTripPage = () => {
  return (
    <div>
        <h1 className="text-5xl mt-10 text-center text-blue-400 font-prompt">เที่ยวไหนดี</h1>
          <div className="flex flex-col items-center mt-5">
          <label className="font-prompt">ค้นหาที่เที่ยว</label>
          <div className="flex items-center text-sm bg-white h-12 border pl-2 rounded border-gray-500/30 w-full max-w-md">
          <input className="px-2 w-full h-full outline-none text-gray-500 bg-transparent font-prompt" type="email" placeholder="หาที่เที่ยวแล้วไปกัน"/>
          </div>
           </div>
        <BlogCard />
    </div>
  )
}

export default SearchTripPage