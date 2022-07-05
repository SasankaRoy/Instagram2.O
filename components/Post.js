import React, { useEffect, useState } from "react";
import { Stories } from "./Stories";
import { Feed } from "./Feed";
import { Miniprofile } from "./Miniprofile";
import { Suggestion } from "./Suggestion";
// import { useSession, signIn } from "next-auth/react";
import { dataBase } from "../Firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
// const dummyData = [
//   {
//     id: 1,
//     userName: "Sasanka",
//     userLogo: "./photo2.jpg",
//     userImage: "./photo1.jpg",
//     caption: "Instagram clone or Instagram 2.O. Having fun with it",
//   },
//   {
//     id: 2,
//     userName: "Sasanka",
//     userLogo: "./photo3.jpg",
//     userImage: "./photo4.jpg",
//     caption: "Instagram clone or Instagram 2.O. Having fun with it",
//   },
// ];

export const Post = () => {
  // const { data: session } = useSession();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(dataBase, "posts"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        setPost(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [dataBase]);

  return (
    <>
      <main
        className="grid grid-cols-1 md:grid-cols-2 
      md:max-w-3xl lg:grid-cols-3 lg:max-w-6xl mx-auto"
      >
        <section className="col-span-2">
          <Stories />
          {post.map((cur, index) => (
            <Feed
              key={index}
              id={cur.id}
              user={cur.data().userName}
              logo={cur.data().profileImg}
              image={cur.data().image}
              capt={cur.data().captons}
            />
          ))}
        </section>

        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-40">
            <Miniprofile />

            <Suggestion />
          </div>
        </section>
      </main>
    </>
  );
};
