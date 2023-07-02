import { useState } from "react";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/removeArrows.css";
import { useNavigate } from "react-router";
// import { ProgressBar } from "../components/ProgressBar";
export const CreateListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const hollowbtn =
    "w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  const fullbtn =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  const [formdata, setFormData] = useState({
    name: "",
    type: "sell",
    parking: false,
    furnished: false,
    offer: false,
    bed: null,
    bath: null,
    address: "",
    description: "",
    priceRegular: null,
    priceDiscounted: null,
    latitude: null,
    longitude: null,
    images: {},
  });
  const {
    name,
    type,
    parking,
    furnished,
    offer,
    bed,
    bath,
    address,
    description,
    priceRegular,
    priceDiscounted,
    latitude,
    longitude,
    images,
  } = formdata;
  const [geolocationEnable, setgeolocationEnabled] = useState(false);
  const [loader, setLoader] = useState(false);
  const onchange = (e) => {
    let bool = null;
    if (e.target.value === "true") {
      bool = true;
    }
    if (e.target.value === "false") {
      bool = false;
    }
    if (e.target.files) {
      console.log("Condition for file executed");
      setFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      console.log(e.target.value);
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: bool ?? e.target.value,
      }));
    }
  };
  async function onsubmit(e) {
    e.preventDefault();
    setLoader(true);
    if (priceDiscounted != null && priceDiscounted >= priceRegular) {
      setLoader(false);
      toast.error("Discounted Price should be less than Regular Price");
      return;
    }
    if (images.length > 6) {
      setLoader(false);
      toast.error("Maximum 6 images are allowed");
    }
    let geolocation = {};
    if (geolocationEnable) {
      // Fetch from google map api
    }
    if (!geolocation) {
      geolocation.latitude = latitude;
      geolocation.longitude = longitude;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuid()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // <ProgressBar progress={progress}/>
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoader(false);
      toast.error("Unable to upload image!");
      return;
    });
    const formCopy = {
      ...formdata,
      userRef: auth.currentUser.uid,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      
    };
    delete formCopy.images;
    !formdata.offer && delete formCopy.priceDiscounted;
    delete formCopy.latitude;
    delete formCopy.longitude;
    console.log(formCopy);
    const docRef = await addDoc(collection(db, "listings"), formCopy);
    navigate(`/category/${formCopy.type}/${docRef.id}`);
    toast.success("Property Listed successfully!");

    setLoader(false);
  }

  if (loader) return <Loader />;
  return (
    <section className="mt-6 flex max-h-full flex-col justify-center sm:px-6 lg:px-4 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl lg:max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-[#c40c1c] mb-4">
          List Your Property
        </h2>
        <div className="bg-white mb-6 py-6 px-2 shadow-xl sm:rounded-lg sm:px-8 border-[1px] border-red-500/30">
          <form onSubmit={onsubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  onChange={onchange}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  placeholder="Property Name"
                  className="h-30 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="w-[50%] mt-0 mr-4">
                <p className="block text-sm font-medium text-gray-700">
                  Parking
                </p>
                <div className="flex items-center justify-around mt-2">
                  <button
                    type="button"
                    id="parking"
                    value={true}
                    onClick={onchange}
                    className={
                      parking ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`
                    }
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="parking"
                    value={false}
                    onClick={onchange}
                    className={!parking ? `${fullbtn}` : `${hollowbtn}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="w-[50%] mt-0">
                <p className="block text-sm font-medium text-gray-700">
                  Furnished
                </p>
                <div className="flex items-center justify-around mt-2">
                  <button
                    id="furnished"
                    value={true}
                    type="button"
                    onClick={onchange}
                    className={
                      furnished ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`
                    }
                  >
                    Yes
                  </button>
                  <button
                    id="furnished"
                    value={false}
                    type="button"
                    onClick={onchange}
                    className={!furnished ? `${fullbtn}` : `${hollowbtn}`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-0">
              <p className="block text-sm font-medium text-gray-700">Rooms</p>
              <div className="flex items-center justify-around mt-2">
                <input
                  id="bed"
                  name="bed"
                  type="number"
                  placeholder="Bed"
                  value={bed}
                  min={1}
                  onChange={onchange}
                  className="no-number-arrows mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <input
                  id="bath"
                  min={1}
                  name="bath"
                  placeholder="Bath"
                  value={bath}
                  type="number"
                  onChange={onchange}
                  className="no-number-arrows appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  placeholder="Address"
                  onChange={onchange}
                  className="h-30 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-around mt-2">
              <input
                id="latitude"
                name="latitude"
                max="90"
                min="-90"
                type="number"
                value={latitude}
                placeholder="Latitude"
                onChange={onchange}
                className="no-number-arrows mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />

              <input
                id="longitude"
                name="longitude"
                placeholder="longitude"
                type="number"
                max="180"
                min="-180"
                value={longitude}
                onChange={onchange}
                className="no-number-arrows appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  placeholder="Description"
                  onChange={onchange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="w-[50%] mt-0 mr-4">
                <p className="block text-sm font-medium text-gray-700">Offer</p>
                <div className="flex items-center justify-around mt-2">
                  <button
                    id="offer"
                    value={true}
                    type="button"
                    onClick={onchange}
                    className={offer ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`}
                  >
                    Yes
                  </button>
                  <button
                    id="offer"
                    value={false}
                    type="button"
                    onClick={onchange}
                    className={!offer ? `${fullbtn}` : `${hollowbtn}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="w-[50%] mt-0">
                <p className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </p>

                <div className="flex items-center justify-around mt-2">
                  <input
                    id="regularPrice"
                    name="regularPrice"
                    type="number"
                    value={priceRegular}
                    placeholder="Regular"
                    onChange={onchange}
                    className="no-number-arrows mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                  {offer && (
                    <input
                      id="discounted"
                      name="discounted"
                      placeholder="Discounted"
                      type="number"
                      value={priceDiscounted}
                      onChange={onchange}
                      className="no-number-arrows appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-around">
              <div className="flex items-center justify-center w-full bg-white">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-40 border-[1px] border-[#c40c1c] border-2-[#c40c1c] rounded-lg cursor-pointer hover:bg-red-50 transition duration-300 ease-in-out"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-[#c40c1c]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Upload images</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or JPEG (MAX: 6)
                    </p>
                  </div>
                  <input
                    id="images"
                    multiple
                    onChange={onchange}
                    accept=".jpg,.jpeg,.png"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-around">
              <button
                type="button"
                id="type"
                onClick={onchange}
                value="sell"
                className={
                  type === "sell" ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`
                }
              >
                Sell
              </button>
              <button
                type="button"
                id="type"
                onClick={onchange}
                value="rent"
                className={type === "rent" ? `${fullbtn}` : `${hollowbtn}`}
              >
                Rent
              </button>
            </div>

            <div>
              <button type="submit" className={fullbtn}>
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
