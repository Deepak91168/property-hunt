import { useState } from "react";

export const CreateListing = () => {
  const [formdata, setFormData] = useState({
    type: "sell",
    parking: true,
    furnished: true,
    offer: false,
    bed: null,
    bath: null,
    address: "",
    description: "",
    priceRegular: null,
    priceDiscounted: null,
  });
  const {
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
  } = formdata;
  const hollowbtn =
    "w-full flex justify-center items-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";
  const fullbtn =
    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500";

  const onchange = () => {};
  return (
    <section className="flex max-h-full flex-col justify-center sm:px-6 lg:px-4 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl lg:max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-[#c40c1c] mb-4">
          List Your Property
        </h2>
        <div className="bg-white py-6 px-2 shadow-xl sm:rounded-lg sm:px-8 border-[1px] border-red-500/30">
          <form className="space-y-6">
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
                  placeholder="Property Name"
                  className="h-30 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-0">
              <p className="block text-sm font-medium text-gray-700">Parking</p>
              <div className="flex items-center justify-around mt-2">
                <button
                  type="button"
                  id="parking"
                  value={true}
                  className={parking ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  id="parking"
                  value={false}
                  className={!parking ? `${fullbtn}` : `${hollowbtn}`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="mt-0">
              <p className="block text-sm font-medium text-gray-700">
                Furnished
              </p>
              <div className="flex items-center justify-around mt-2">
                <button
                  id="furnished"
                  value={true}
                  type="button"
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
                  className={!furnished ? `${fullbtn}` : `${hollowbtn}`}
                >
                  No
                </button>
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
                  className="mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                <input
                  id="bath"
                  min={1}
                  name="bath"
                  placeholder="Bath"
                  value={bath}
                  type="number"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
            <div className="mt-0">
              <p className="block text-sm font-medium text-gray-700">Offer</p>
              <div className="flex items-center justify-around mt-2">
                <button
                  id="offer"
                  value={true}
                  type="button"
                  onChange={onchange}
                  className={offer ? `${fullbtn} mr-2` : `${hollowbtn} mr-2`}
                >
                  Yes
                </button>
                <button
                  id="offer"
                  value={false}
                  type="button"
                  onChange={onchange}
                  className={!offer ? `${fullbtn}` : `${hollowbtn}`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="mt-0">
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
                  className="mr-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                />
                {offer && (
                  <input
                    id="discounted"
                    name="discounted"
                    placeholder="Discounted"
                    type="number"
                    value={priceDiscounted}
                    onChange={onchange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-around">
              <input
                id="image"
                name="image"
                placeholder="Add image"
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={onchange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-around">
              <button
                type="text"
                onChange={onchange}
                className={
                  type === "rent" ? `${hollowbtn} mr-2` : `${fullbtn} mr-2`
                }
              >
                Sell
              </button>
              <button
                type="text"
                onChange={onchange}
                className={
                  type === "sell" ? `${hollowbtn} mr-2` : `${fullbtn} mr-2`
                }
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
