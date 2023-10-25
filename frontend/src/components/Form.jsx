import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import eyeSlash from "../../assets/eye-slash.svg";
import eye from "../../assets/eye.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setUser } from "../state/reducers";



const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  picture: Yup.mixed().required("image is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Form() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  let navigate= useNavigate();
  let dispatch= useDispatch();

  const handleLogin = async (values, actions) => {
    let uri = "http://localhost:4000/user/login";

    const response = await axios.post(uri,JSON.stringify(values),{
      headers: {
        "Content-Type": "application/json"
      }
    });


    localStorage.setItem('token', response.data.token);
    dispatch(setUser({user: response.data.user}));

    actions.resetForm();
   
      setTimeout(() => {
        navigate('/chat')
      }, 1000);

  };


  const handleRegister = async (values, actions) => {
    let uri = "http://localhost:4000/user/register";
    let formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    const response = await axios.post(uri,formData);

    actions.resetForm();
    setIsLogin(true);
  };

  const handleSubmit = (values, actions) => {
    if (isLogin) handleLogin(values, actions);
    else handleRegister(values, actions);
    // Here you can handle the form submission, e.g., send data to a server
  };
  return (
    <div className=" bg-white w-[100%] md:w-1/3 rounded ">
      <div className="flex justify-center p-4">
        <button
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 grow m-2"
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-800 grow m-2"
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      {!isLogin ? (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            picture: null,
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue

            /* and other goodies */
          }) => (
            <form className="mt-2 p-2 gap-x-6 gap-y-8 " onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>

              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                id="name"
                className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name}
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
                className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email}
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="password"
                  className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className=" icon-button absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <img src={eyeSlash} className="w-4 h-4" />
                  ) : (
                    <img src={eye} className="w-4 h-4" />
                  )}
                </div>
              </div>
              {errors.password}
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  id="confirmPassword"
                  className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className=" icon-button absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <img src={eyeSlash} className="w-4 h-4" />
                  ) : (
                    <img src={eye} className="w-4 h-4" />
                  )}
                </div>
              </div>
              {errors.confirmPassword}

              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="picture"
              >
                Upload Image
              </label>
              <input
                className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="picture"
                name="picture"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFieldValue("picture", e.currentTarget.files[0])
                }
              />


              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900
                w-[100%] mt-3"
              >
                Register
              </button>
            </form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form className="mt-2 p-2 gap-x-6 gap-y-8 " onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
                className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              {errors.email}
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="password"
                  className="block w-full rounded-md border-0 p-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className=" icon-button absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <img src={eyeSlash} className="w-4 h-4" />
                  ) : (
                    <img src={eye} className="w-4 h-4" />
                  )}
                </div>
              </div>
              {errors.password}

              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900
                w-[100%] mt-3"
              >
                Login
              </button>
            </form>
          )}
        </Formik>
      )}

      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>    </div>
  );
}
