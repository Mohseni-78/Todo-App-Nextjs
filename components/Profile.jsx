import { useSession } from "next-auth/react";
import React from "react";

const ProfileCom = () => {
  const { data: session } = useSession();
  return <div>{session?.user?.email}</div>;
};

export default ProfileCom;
