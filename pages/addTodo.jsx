import AddTodo from "@/components/AddTodo";
import { getSession } from "next-auth/react";
import React from "react";

const addTodo = () => {
  return <AddTodo />;
};

export default addTodo;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
        props: {},
      },
    };
  }
  return {
    props: {},
  };
}
