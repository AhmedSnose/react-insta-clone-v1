import Head from "next/head";
import Nav from "./Nav";
import { useSession } from "next-auth/client";

export default function MainLayout(props) {
  const [session, loging] = useSession();

  return (
    <div className="xl:max-w-sm lg:max-w-sm md:max-w-sm mx-auto">
      <Head>
        <title>instagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && <Nav />}

      {props.children}
    </div>
  );
}
