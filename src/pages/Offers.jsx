import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  collection,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Loader } from "../components/Loader";
import { ListItem } from "../components/ListItem";
// TODO: Fox load button it should immediately disapper when all items are fetched

export const Offers = () => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevfetch, setPrevfetch] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const listRef = collection(db, "listings");
        const q = query(
          listRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        );

        const querySnap = await getDocs(q);
        const lastFetch = querySnap.docs[querySnap.docs.length - 1];
        setPrevfetch(lastFetch);
        const list = [];
        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setList(list);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Could not fetch properties at this moment :(");
      }
    }
    getData();
  }, []);
  async function fetchmore() {
    try {
      const listRef = collection(db, "listings");
      const q = query(
        listRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(prevfetch),
        limit(4)
      );

      const querySnap = await getDocs(q);
      const lastFetch = querySnap.docs[querySnap.docs.length - 1];
      setPrevfetch(lastFetch);
      const list = [];
      querySnap.forEach((doc) => {
        return list.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setList((prev) => [...prev, ...list]);
      console.log(list);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch properties at this moment :(");
    }
  }
  return (
    <>
      <div className="mx-auto flex justify-center">
        {loading && <Loader />}
        {list && list.length > 0 && (
          <div className="max-w-6xl p-2 mt-6 flex w-full ">
            <div className="pb-2 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {list.map((list) => (
                <ListItem key={list.id} id={list.id} listing={list.data} />
              ))}
            </div>
          </div>
        )}
      </div>
      {prevfetch && list.length >= 8 && (
        <div className="flex justify-center mb-0 pb-2">
          <button className="text-gray-500 text-sm" onClick={fetchmore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};
