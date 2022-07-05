import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { LogIn } from "../components/LogIn";
import { Modal } from "../components/Modal";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      

      <div
        className="bg-gray-100 
     scrollbar-thin scrollbar-thumb-black 
     h-screen overflow-y-scroll scrollbar-hide scroll-smooth"
      >
        <Head>
          <link
            rel="icon"
            className="text-white"
            href="https://links.papareact.com/jjm"
          />
          <meta
            title="Instagram clone"
            content="Insta clone by nextJs tailwindCss reatJs fireBase nextAuthJs"
          />
          <meta
            name="sasanka"
            content="A web developer and software developer. Building awsome UI/UX with greate user experience"
          />
        </Head>

        {session ? (
          <>
            {/* ......header part........ */}
            <Header />
            {/* ......Post or the Feeds part........ */}
            <Post />
            <Modal />
          </>
        ) : (
          <>
            <LogIn />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
