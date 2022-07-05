import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  SearchIcon,
  HeartIcon,
  MenuIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon, XIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useRecoilState } from "recoil";
import modelState from "../modelatom/atom";

export const Header = () => {


  const [open, setOpen] = useRecoilState(modelState);

  const router = useRouter();
  const { data: session } = useSession();
  const [Toggle, setToggle] = useState(false); //Toggle function on small devices
  return (
    <>
      <Head>
        <link
          rel="icon"
          className="text-white"
          href="https://links.papareact.com/jjm"
        />
        <title>Instagram 2.0</title>
      </Head>
      <div className="bg-white border-b-2 shadow-sm sticky top-0 z-50 backdrop:blur-4">
        <div className="flex justify-between max-w-6xl  mx-5 lg:mx-auto ">
          {/*...................... left side................. */}
          <div
            onClick={() => router.push("/")}
            className="relative hidden lg:inline-grid w-32  cursor-pointer"
          >
            <Image
              src="https://links.papareact.com/ocw"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            onClick={() => router.push("/")}
            className="relative lg:hidden w-10 mt-2  flex-shrink-0 cursor-pointer"
          >
            <Image
              src="https://links.papareact.com/jjm"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/*.................................. middle........................... */}
          <div className="max-w-xs">
            <div className="mt-2 relative p-3  rounded-md">
              <div className="absolute inset-y-0 pl-3  flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5  text-gray-500 " />
              </div>

              <div>
                <input
                  type="text"
                  className="bg-gray-80 w-full block pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          {/*................... right sidde.................. */}
          <div className="flex items-center justify-end space-x-3">
            <HomeIcon onClick={() => router.push("/")} className="navBtn" />
            {session ? ( // if user is already SignIned  for small devices
              <>
                <img
                  src={session?.user?.image}
                  alt="userLogo"
                  className="h-10 p-1 !mr-2 navBtn object-contain md:hidden inline-grid cursor-pointer rounded-full"
                  layout="fill"
                  onClick={signOut}
                />
                
                <MenuIcon
                  className="h-12   md:hidden cursor-pointer rotate-90"
                  onClick={() => {
                    console.log("clicked");
                    setToggle(true);
                  }}
                />
                
              </>
            ) : (
              <>
                <HomeIcon className="navBtn inline-grid md:hidden" />
                <button
                  onClick={signIn}
                  className="text-md hover:text-blue-500 px-1 hover:text-lg transition-all duration-150  ease-out  font-semibold"
                >
                  Sign In
                </button>
              </>
            )}

            {session ? (
              <>
                <div className="relative navBtn">
                  <PaperAirplaneIcon className="navBtn rotate-45" />
                  <div className="absolute -right-1 bg-red-500 h-7 rounded-full flex items-center justify-center animate-pulse text-white w-7 text-xs -top-3">
                    3
                  </div>
                </div>

                <PlusCircleIcon
                  onClick={() => setOpen(true)}
                  className="navBtn"
                />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />

                <img
                  src={session?.user?.image}
                  alt="userLogo"
                  className="h-10 w-10 object-contain  navBtn cursor-pointer rounded-full"
                  layout="fill"
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <button onClick={signIn} className="hidden">
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {Toggle && (
          <>
            <div className="h-52  z-15 fixed -top-2 md:hidden bottom-0  flex -right-2 w-28 justify-center mt-6  items-start ">
              <div className=" flex bg-gray-50  flex-col items-center  backdrop:blur-lg rounded-md  justify-center mt-0 -mr-10">
                <motion.div
                  whileInView={{ y: [15, 0] }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                >
                  <XIcon
                    className="h-7 md:hidden ml-3 cursor-pointer "
                    onClick={() => {
                      setToggle(false);
                    }}
                  />
                  <HomeIcon
                    onClick={() => {
                      router.push("/"), setToggle(false);
                    }}
                    className="toggle -mb-1"
                  />
                  <div className="relative toggle">
                    <PaperAirplaneIcon className="toggle rotate-45" />
                    <div className="absolute right-1 bg-red-500 h-6 rounded-full flex items-center justify-center text-white w-6 text-sm top-2">
                      3
                    </div>
                  </div>
                  <PlusCircleIcon
                    onClick={() => {
                      setOpen(true), setToggle(false);
                    }}
                    className=" toggle mt-2 -mb-1  "
                  />
                  <UserGroupIcon className=" toggle" />
                  <HeartIcon className=" toggle" />

                  <img
                    src={session?.user?.image}
                    alt="userLogo"
                    className="h-9 w-9 ml-[5.3px] p-0 mb-2 mt-1 toggle  cursor-pointer rounded-full"
                    layout="fill"
                    onClick={signOut}
                  />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
