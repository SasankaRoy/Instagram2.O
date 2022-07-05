import React, { useEffect, useState } from "react";
import {
  PaperAirplaneIcon,
  HeartIcon,
  EmojiHappyIcon,
  DotsHorizontalIcon,
  ChatIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FiledHeartIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { dataBase } from "../Firebase";
import { useSession } from "next-auth/react";
// import Moment from "react-moment";

// import { async } from "@firebase/util";

export const Feed = ({ user, id, logo, image, capt }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { data: session } = useSession();
  // console.log(session);

  const sendComment = async (e) => {
    e.preventDefault();

    const addComment = await addDoc(
      collection(dataBase, "posts", id, "comments"),
      {
        userName: session.user.name,
        comment,
        profileImg: session.user.image,
        timeStamp: serverTimestamp(),
      }
    );
    setComment("");
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(dataBase, "posts", id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapshort) => {
        setComments(snapshort.docs);
      }
    );
    return unsubscribe;
  }, [dataBase, id]);
  useEffect(() => {
    const unsubscribed = onSnapshot(
      collection(dataBase, "posts", id, "likes"),
      (snapshort) => {
        setLike(snapshort.docs);
      }
    );
    return unsubscribed;
  }, [dataBase, id]);
  useEffect(() => {
    setHasLiked(like.findIndex((like) => like.id === session.user.Uid) !== -1);
  }, [like]);
  const addLikes = async (e) => {
    if (hasLiked) {
      await deleteDoc(doc(dataBase, "posts", id, "likes", session.user.Uid));

    } else {
      await setDoc(doc(dataBase, "posts", id, "likes", session.user.Uid), {
        userName: session.user.name,
      });
    
    }
  };

 

  const user3 =
    like[0]?._document.data.value.mapValue.fields.userName.stringValue;

  return (
    <>
      <div className="bg-white my-7 rounded-lg">
        {/* header part */}
        <div className="flex items-center p-6">
          <img
            src={logo}
            className=" w-14 h-14 rounded-full object-contain cursor-pointer border p-1 mr-2"
            alt="logo"
          />
          <h2 className="flex-1 font-semibold">{user}</h2>
          <DotsHorizontalIcon className="h-5 cursor-pointer" />
        </div>

        {/* image or posts */}
        <img
          src={image}
          onDoubleClick={addLikes}
          className="object-contain w-full"
          alt=""
        />

        {/* The buttons */}
        <div className="flex justify-between px-5 py-3 items-center align-middle">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <FiledHeartIcon
                onClick={addLikes}
                className="btns text-red-600 "
              />
            ) : (
              <HeartIcon onClick={addLikes} className="btns " />
            )}
            <ChatIcon className="btns" />
            <PaperAirplaneIcon className="btns hover:rotate-45" />
          </div>
          <BookmarkIcon className="btns mr-[5px]" />
        </div>

        {/* likes */}

        {like.length > 0 && (
          <>
            <div className="pl-[33.5px] -mt-3">
              <h3 className="!text-black text-md font-semibold">
                <span className="text-red-600 text-lg font-semibold">
                  {like.length}
                </span>{" "}
                Likes
              </h3>
            </div>
            <div className="px-5 truncate   w-[400px] p-2">
              <h3 className="font-semibold truncate">
                {`${user3} `}
                {like.length > 1 ? (
                  <span className="truncate font-normal">
                    with {like.length} other liked your post{" "}.
                  </span>
                ) : (
                  <span className="truncate font-normal">liked your post.</span>
                )}
              </h3>
            </div>
          </>
        )}
        {/* captions  */}
        <div>
          <h3 className="p-4 truncate font-bold">
            {user}: <span className="font-semibold mr-2">{capt}</span>
          </h3>
        </div>

        {/* comments */}
        {comments.length > 0 && (
          <div className="overflow-y-scroll h-20 scrollbar-thin  scrollbar-thumb-black scroll-smooth rounded-lg bg-white p-4">
            {comments.map((cur, index) => (
              <>
                <div
                  key={index}
                  className="flex truncate justify-between  items-center"
                >
                  <div className="flex justify-center items-center">
                    <div>
                      <img
                        className="object-contain h-8 rounded-full"
                        src={cur.data().profileImg}
                        alt="userPic"
                      />
                    </div>
                    <h1 className="text-lg font-normal px-4 py-2">
                      {cur.data().userName} :
                      <span className="font-semibold ml-1 text-md">
                        {cur.data().comment}
                      </span>
                    </h1>
                  </div>
                  {/* <Moment fromNow className="text-sm font-normal">
                    {cur.data().timeStamp?.toDate()}
                  </Moment> */}
                </div>
              </>
            ))}
          </div>
        )}

        {/* inputs */}
        <form className="flex p-5 items-center">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            className="flex-1 focus:ring-0 outline-none border-none"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            onClick={sendComment}
            className="font-semibold text-blue-500 text-lg"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};
