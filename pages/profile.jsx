import { authOption } from "@/pages/api/auth/[...nextauth]";
// Components
import { getServerSession } from "next-auth";
import ProfileCom from "@/components/Profile";

const Profile = () => {
  return <ProfileCom />;
};

export default Profile;
export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOption);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
