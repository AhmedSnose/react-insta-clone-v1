import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useRecoilState } from "recoil";
import { modolState } from "../atomos/modolAtom";
import Gallery from "./Gallery";
import Modol from "./Modol";

function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useRecoilState(modolState);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      if (!session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (session) {
      const q = query(collection(db, "Posts"), orderBy("timeStamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const filtered = data.filter(
          (post) => post.email === session.user.email
        );
        setPosts(filtered);
      });
      return () => unsubscribe();
    }
  }, [session]);

  if (loading) {
    return <div className="loader"></div>;
  }
  return (
    <>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12">
              <img
                className="w-40 object-cover rounded-full border-2 border-pink-600 p-1"
                src={session?.user?.image?.imgUrl}
                alt="profile"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-2xl font-semibold inline-block first-letter:uppercase md:mr-2 mb-2 sm:mb-0">
                  {session?.user?.name}
                </h2>

                <a
                  href="#"
                  className="bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded block text-center sm:inline-block"
                >
                  Follow
                </a>
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">{posts.length}</span> posts
                </li>
                <li>
                  <span className="font-semibold">188</span> followers
                </li>
                <li>
                  <span className="font-semibold">206</span> following
                </li>
              </ul>

              <div className="hidden md:block">
                <h1 className="font-semibold">{session?.user?.name}</h1>
                <span>Travel, Nature, and Music</span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{session?.user?.name}</h1>
              <span>Travel, Nature, and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div className="px-px md:px-3">
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">Posts</span>
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap -mx-px md:-mx-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-px md:px-3 group relative cursor-pointer my-2"
                >
                  <img
                    src={post.postUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300">
                    <div className="text-center">
                      {/* Likes and caption on hover */}
                      <p className="text-lg mb-1">
                        <i className="fas fa-heart"></i> {post.likes} Likes
                      </p>
                      <p className="text-sm">{post.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Modol />
    </>
  );
}

export default ProfilePage;
