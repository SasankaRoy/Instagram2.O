import React, { Fragment, useRef, useState } from "react";
import { Snapshot, useRecoilState } from "recoil";
import modelState from "../modelatom/atom";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { dataBase, storage } from "../Firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const Modal = () => {
  const [loading, setLoading] = useState(false); //for the upload button enable and disable
  const [open, setOpen] = useRecoilState(modelState); //Recoil g-module
  const filePickerRef = useRef(null); //for the img or file selection
  const captonRef = useRef(null); //for the caption
  const [userPost, setUserPost] = useState();
  const handleInput = (e) => {
    const val = e.target.value;
    setUserPost(val);

  };
  const { data: session } = useSession();
  const [seleFile, setSeleFile] = useState(null); //for the preview of the selected file
  const addImagePost = (e) => {
    //adding Img or files (uploading and preview function)
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (reader) => {
      setSeleFile(reader.target.result);
    };
  };

  const upLoadPost = async () => {
    //uploading the post and saving it to dataBase(fireBase)

    if (loading) {
      return;
    }
    setLoading(true);

    const docRef = await addDoc(collection(dataBase, "posts"), {
      // adding data to the dataBase
      userName: session.user.name,
      captons: userPost,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    });

    const imgaeRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imgaeRef, seleFile, "data_url").then(
      async (snapshot) => {
        const downLoadUrl = await getDownloadURL(imgaeRef);

        await updateDoc(doc(dataBase, "posts", docRef.id), {
          image: downLoadUrl,
        });
      }
    );

    setLoading(false);
    setSeleFile(null);
    setOpen(false);
  };

  // if (open == true) {
    return(
      <>
   { open ? (
    // return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => {
            setOpen(false), setSeleFile(null);
          }}
        >
          <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed bg-opacity-75 inset-0 bg-gray-500 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8503;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100  translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
            >
              <div
                className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4
                text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              >
                <div>
                  {seleFile ? (
                    <>
                      <img
                        src={seleFile}
                        className="w-full object-contain"
                        alt="Post"
                      />
                    </>
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="flex mx-auto w-12 h-12
                 items-center justify-center rounded-full
                  bg-red-100 cursor-pointer"
                    >
                      <CameraIcon
                        className="w-6 h-6 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div>
                    <div className="mt-4 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-gray-700 text-lg leading-6 font-medium"
                      >
                        Upload a photo
                      </Dialog.Title>

                      <div>
                        <input
                          type="file"
                          ref={filePickerRef}
                          hidden
                          onChange={addImagePost}
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="plz add a caption"
                          ref={captonRef}
                          className="w-full text-center focus:ring-0 border-none"
                          name="post"
                          onChange={handleInput}
                          id=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={!seleFile}
                      className="w-full inline-flex justify-center border
                     border-transparent rounded-md shadow-sm px-4 py-2 
                     bg-red-600 text-base text-white font-medium
                     hover:bg-red-700 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-red-500 sm:text-sm
                       disabled:bg-gray-400 disabled:cursor-not-allowed
                        hover:disabled:bg-gray-300"
                      onClick={upLoadPost}
                    >
                      {loading ? "Uploading..." : "Upload Post"}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    // );
   
    ):(
      <></>
    )
   
    }
    </>)
};