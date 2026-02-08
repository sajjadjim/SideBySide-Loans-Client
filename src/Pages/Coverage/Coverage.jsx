import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";
import { Search } from "lucide-react";
import { useRef } from "react";
const Coverage = () => {
  const position = [24.0, 90.0];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);



  const handleSearch = e =>{
       e.preventDefault();
       const location = e.target.location.value;
       const district = serviceCenters.find( c => c.district.toLowerCase().includes(location.toLowerCase()))
       if(district){
              const coord = [district.latitude, district.longitude];
              console.log(district, coord)
              mapRef.current.flyTo(coord, 14)
       }
  }


  return (
    <div className="mt-28 bg-white rounded-xl py-6 px-12">
      <h2 className="text-5xl font-bold my-6">
        We are available in 64 Districts
      </h2>
      {/* search bar  */}
      <div>
       <form onSubmit={handleSearch}>
        <div
          className="
      group
      relative
      w-full max-w-md
      flex items-center
    "
        >
          <div
            className="
        absolute left-3
        flex items-center
        pointer-events-none
      "
          >
            <Search
              className="primary-text group-focus-within:text-green-500"
              size={20}
            />
          </div>

          <input
            type="search"
            placeholder="Search documentation..."
            name="location"
            className="
          w-full
          py-2.5 pl-10 pr-4
          text-gray-800
          bg-gray-50 border border-gray-300
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green-400/30 focus:border-transparent
          transition-colors duration-200
        "
          />
        </div>
        </form>
      </div>
      {/* -------------------  */}
      <div className=" h-[400px] w-full my-20">
       <h2 className="text-3xl font-bold my-3">
        We deliver almost all over Bangladesh.
      </h2>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[400px] border border-gray-200"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(",  ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
