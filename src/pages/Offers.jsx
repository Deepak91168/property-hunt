import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { collection, orderBy, query, where, limit } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Loader } from "../components/Loader";
import { ListItem } from "../components/ListItem";
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
  return (
    <>
      <div className="mx-auto flex justify-center">
        {loading && <Loader />}
        {list && list.length > 0 && (
          <div className="max-w-6xl p-2 mt-6 flex w-full ">
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {list.map((list) => (
                <ListItem key={list.id} id={list.id} listing={list.data} />
              ))}
            </div>
          </div>
        )}
      </div>
      {(prevfetch && list.length > 8) && <button onClick={fetchmore}>Load More</button>}
    </>
  );
};
