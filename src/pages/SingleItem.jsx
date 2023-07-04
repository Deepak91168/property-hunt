import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Loader } from "../components/Loader";
import ImageCarousel from "../components/ImageCarousel";
import { FaBed, FaBath, FaParking, FaMapMarkerAlt } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { Label } from "../components/Label";
export const SingleItem = () => {
  const params = useParams();
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(true);
  const fullbtn =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setList(docSnap.data());
        setLoader(false);
      } else {
        console.log("error");
        setLoader(false);
      }
    }
    fetchListing();
  }, [params.listingID]);
  if (loader) {
    return <Loader />;
  }
  return (
    <section>
      <ImageCarousel images={list.imgUrls} />
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-wrap ">
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 rounded-lg p-4 border-[1px] border-red-500">
            <div>
              <div className="">
                <span className="font-semibold text-2xl mb-2 flex items-baseline">
                  {list.name} - ₹
                  {list.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  {!list.sale && (
                    <p className="text-sm text-gray-500">/month</p>
                  )}
                </span>
              </div>
              <div className="mt-2 text-md text-red-500 font-semibold flex justify-center items-baseline">
                <FaMapMarkerAlt className="text-[12px] p-0 mr-1" />
                {list.address}
              </div>
              {/* <div className="mr-xl mt-2">
                <hr className="p-[0.5px] bg-red-500"></hr>
              </div> */}

              <div className="flex space-x-2 mt-2">
                <Label text={list.sale ? "Sale" : "Rent"} />
                {list.furnished && <Label text="Furnished" />}
                {list.parking && <Label text="Parking" />}
              </div>

              <div className="py-1 text-sm text-gray-800">
                {list.description}
              </div>
              <div>
                {/* Details */}
                <ul className="flex mt-2">
                  <div className=" flex justify-center">
                    <FaBed className="text-2xl " /> <p className="px-2">4</p>
                  </div>
                  <div className=" flex justify-center">
                    <FaBath className="text-xl" /> <p className="px-2">4</p>
                  </div>
                </ul>
              </div>
              <div className="py-2">
                <form className="flex flex-col">
                  <textarea
                    className="mb-4 no-number-arrows mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    type="text"
                    placeholder="Write a message to owner"
                  />
                  <button type="submit" className={fullbtn}>
                    Send Email
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 ">
            {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer> */}
          </div>
        </div>
      </div>
    </section>
  );
};
