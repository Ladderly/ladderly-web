import { Alert, TextField } from "@mui/material";
import React, { FC, memo, useState } from "react";
import Button from "../../components/Button";
import { auth, firestore } from "../../firebase";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface Props {}

const SignUp: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);
  const handleError = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        setEmailError("E-mail already registered");
        setEmailErrorVisibility(true);
        break;
    }
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: any) => {
    handleSignUp();
    console.log(JSON.stringify(data, null, 2));
  };
  const signUp = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    let promise = new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user
            ?.updateProfile({
              displayName: firstName + " " + lastName,
            })
            .then(() => {
              firestore
                .collection("users")
                .add({
                  uid: ref.user?.uid,
                  displayName: ref.user?.displayName,
                  email: ref.user?.email,
                })
                .then((res) => resolve(res));
            });
        })
        .catch((error) => {
          handleError(error.code);
          console.log(error.code);
          console.log(error.message);
          reject(error);
        });
    });
    return promise;
  };
  const handleSignUp = () => {
    setLoading(true);
    const emailValue = getValues("email");
    const firstNameValue = getValues("firstName");
    const lastNameValue = getValues("lastName");
    const passwordValue = getValues("password");
    signUp(emailValue, passwordValue, firstNameValue, lastNameValue)
      .then(() => {
        window.location.href = "/ladders";
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="relative w-full min-h-screen overflow-auto bg-cover bg-auth">
      <div className="absolute w-5/6 h-auto px-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg sm:px-0 sm:w-3/5 top-1/2 left-1/2">
        <h1 className="my-4 font-serif text-4xl font-semibold text-center sm:text-5xl text-secondary-400">
          Ladderly
        </h1>
        <p className="my-6 text-sm font-semibold text-center text-secondary-300">
          Join the community to share knowledge and better your skills
        </p>
        <div className="flex py-8 ">
          <div className="flex-1 hidden px-8 border-r-2 border-secondary-400 sm:block"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-1 mx-8 space-y-8 text-center"
          >
            <TextField
              color="success"
              label="First Name"
              size="small"
              variant="outlined"
              error={errors.firstName ? true : false}
              {...register("firstName")}
              helperText={errors.firstName?.message}
            />
            <TextField
              color="success"
              label="Last Name"
              size="small"
              variant="outlined"
              error={errors.lastName ? true : false}
              {...register("lastName")}
              helperText={errors.lastName?.message}
            />
            <TextField
              color="success"
              label="Email"
              size="small"
              variant="outlined"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
            <TextField
              color="success"
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
            <p className="mt-3 text-sm font-semibold text-center cursor-pointer text-secondary-400">
              Already have an account?{" "}
              <Link to="/signin">
                <span className="hover:underline">Sign In</span>
              </Link>
            </p>
            <Button loading={loading} className="block ml-auto w-28">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
      {emailErrorVisibility && (
        <Alert
          onClose={() => {
            setEmailErrorVisibility(false);
          }}
          className="absolute left-0 right-0 mx-auto transition duration-1000 ease-in-out w-96 top-10"
          severity="error"
        >
          {emailError}
        </Alert>
      )}
    </div>
  );
};

SignUp.defaultProps = {};

export default memo(SignUp);
