/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
//Imported ReactHotToast ============>
import toast from "react-hot-toast";
//Imported Formik ============>
import { useFormik } from "formik";
//Imported Schemas ============>
import { signUpSchema } from "@/schemas";
import { getSession } from "next-auth/react";

const SignUp = () => {
  const initialValues = {
    name: "",
    family: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "Success") {
              window.location.href = "/";
              toast.success("Register succefully Please Login now!");
            } else {
              console.log(data);
              toast.error(`${data.status} => ${data.message}`);
            }
          });
      },
    });
  return (
    <div
      className=" flex
         flex-col bg-black md:items-center md:justify-center md:bg-transparent"
    >
      <Head>
        <title>Netflix - SignUp</title>
      </Head>

      <form
        onSubmit={handleSubmit}
        className="mt-24 space-y-8 rounded py-10 px-6 md:mt-0 md:max-w-md md:px-14 z-30"
      >
        <h3 className="text-4xl font-semibold">SignUp</h3>
        <div className="space-y-4 w-72">
          <label className="inline-block w-full" htmlFor="email">
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${
                errors.email && touched.email && "border border-red-600"
              } w-full p-3 rounded`}
              type="text"
              placeholder="Please enter a email..."
              id="email"
            />
            <p className="text-red-500 font-semibold text-xs mt-1">
              {" "}
              {errors.email && touched.email && errors.email}
            </p>
          </label>
          <label className="inline-block w-full" htmlFor="password">
            <input
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${
                errors.password && touched.password && "border border-red-600"
              } w-full p-3 rounded`}
              type="text"
              placeholder="Please enter a Password..."
              id="password"
            />
            <p className="text-red-500 font-semibold text-xs mt-1">
              {errors.password && touched.password && errors.password}
            </p>
          </label>
          <label className="inline-block w-full" htmlFor="confirmPassword">
            <input
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input ${
                errors.confirmPassword && touched.confirmPassword && "border border-red-600"
              } w-full p-3 rounded`}
              type="text"
              placeholder="Please enter a confirmPassword..."
              id="confirmPassword"
            />
            <p className="text-red-500 font-semibold text-xs mt-1">
              {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
            </p>
          </label>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <Link className="font-bold underline" href={"/login"}>
              Login
            </Link>
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !!errors.email || !!errors.password || !!errors.confirmPassword}
          className={`${
            isSubmitting || !!errors.email || !!errors.password || !!errors.confirmPassword
              ? "opacity-75"
              : ""
          } w-full rounded
                     bg-[#4b09e5]  text-white py-3 font-semibold`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
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
