import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { Loader } from "../components/Loader";

export const SingleItem = () => {
  const params = useParams();
  console.log(params);
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
        setLoader(false)
      }
    }
    console.log(list);
    fetchListing();
  }, [params.listingID]);
  if (loader) {
    return <Loader />;
  }
  return <div>{list && list.name}</div>;
};
