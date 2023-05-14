/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";

//Imported Formik ============>
import { useFormik } from "formik";
//Imported Schemas ============>
import { loginSchema } from "@/schemas";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        signIn("credentials", {
          ...values,
          redirect: "/",
        });
      },
    });
  return (
    <div
      className="  flex-col
          md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Todo App - Login</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="mt-24 space-y-8 rounded 
                py-10 px-6 md:mt-0 md:max-w-md md:px-14 z-30"
      >
        <h3 className="text-4xl font-semibold">Signin</h3>
        <div className="space-y-4">
          <label className="inline-block w-full" htmlFor="email">
            <input
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`input ${
                errors.email && touched.email && "border border-red-600"
              }  p-2 px-5 w-full`}
              type="text"
              placeholder="Please enter a email..."
              id="email"
            />
            <p className="text-red-500 font-semibold text-xs mt-1">
              {errors.email && touched.email && errors.email}
            </p>
          </label>
          <label className="inline-block w-full" htmlFor="password">
            <input
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`input ${
                errors.password && touched.password && "border border-red-600"
              }  p-2 px-5 w-full`}
              type="text"
              placeholder="Please enter a Password..."
              id="password"
            />
            <p className="text-red-500 font-semibold text-xs mt-1">
              {errors.password && touched.password && errors.password}
            </p>
          </label>
        </div>
        <div className="flex flex-col">
          <Link href={"/register"} className="font-bold hover:underline ">
            Create new account ?
          </Link>
          <Link href={"/"} className="font-bold text-sm hover:underline ">
            Guest click !
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !!errors.email || !!errors.password}
          className={`${
            isSubmitting || !!errors.email || !!errors.password ? "opacity-75 hover:scale-100" : ""
          } w-full rounded bg-[#4b09e5] 
                    py-3 font-semibold text-white hover:scale-105`}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
        props: {},
      },
    };
  }
  return {
    props: {},
  };
}
