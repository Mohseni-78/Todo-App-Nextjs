import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HeaderCom = () => {
  const { status } = useSession();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl">LOGO</h1>
      {status === "authenticated" ? (
        <button onClick={() => signOut()} className="btn bg-red-600 hover:bg-red-500">
          logout
        </button>
      ) : (
        <Link href={"/login"} className="btn">
          login
        </Link>
      )}
    </div>
  );
};

export default HeaderCom;
