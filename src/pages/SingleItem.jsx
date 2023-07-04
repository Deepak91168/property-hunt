import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Loader } from "../components/Loader";
import ImageCarousel from "../components/ImageCarousel";
export const SingleItem = () => {
  const params = useParams();
  const [list, setList] = useState(null);
  const [loader, setLoader] = useState(true);
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
      <div class="max-w-6xl  mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 border-2 border-red-500">
            {/* <!-- Content for the first div --> */}
          </div>
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 border-2 border-red-500">
            {/* <!-- Content for the second div --> */}
          </div>
        </div>
      </div>
    </section>
  );
};
