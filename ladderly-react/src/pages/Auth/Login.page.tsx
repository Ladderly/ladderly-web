import { Alert, TextField } from "@mui/material";
import React, { FC, memo, useState } from "react";
import Button from "../../components/Button";
import { auth } from "../../firebase";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface Props {}

const Login: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);
  const [passwordErrorVisibility, setPasswordErrorVisibility] = useState(false);
  const handleError = (code: string) => {
    switch (code) {
      case "auth/user-not-found":
        setEmailError("E-mail not registered");
        setEmailErrorVisibility(true);
        break;
      case "auth/wrong-password":
        setPasswordError("Invalid password");
        setPasswordErrorVisibility(true);
        break;
    }
  };
  const validationSchema = Yup.object().shape({
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
    handleSignIn();
    console.log(JSON.stringify(data, null, 2));
  };
  const signIn = (email: string, password: string) => {
    let promise = new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => resolve(ref))
        .catch((error) => reject(error));
    });
    return promise;
  };

  const handleSignIn = () => {
    setLoading(true);
    const email = getValues("email");
    const password = getValues("password");
    signIn(email, password)
      .then((ref) => {
        window.location.href = "/ladders";
        // setLoading(false);
      })
      .catch((err) => {
        handleError(err.code);
        console.log(err.message);
        setLoading(false);
      });
  };
  // const passwordReset = (email: string) => {
  //   let promise = new Promise((reject, resolve) => {
  //     auth
  //       .sendPasswordResetEmail(email)
  //       .then(() => {
  //         resolve(`Password Reset Email sent to ${email}`);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  //   return promise;
  // };

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
            <div>
              <p className="text-sm font-semibold text-center cursor-pointer text-secondary-400">
                Forgot Password?
              </p>
              <p className="mt-3 text-sm font-semibold text-center cursor-pointer text-secondary-400">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="hover:underline">Sign Up</span>
                </Link>
              </p>
            </div>
            <Button loading={loading} className="block w-20 ml-auto">
              Sign In
            </Button>
          </form>
        </div>
      </div>
      {emailErrorVisibility && (
        <Alert
          onClose={() => {
            setEmailErrorVisibility(false);
          }}
          className="absolute left-0 right-0 mx-auto transition duration-1000 ease-in-out w-96 top-16"
          severity="error"
        >
          {emailError}
        </Alert>
      )}
      {passwordErrorVisibility && (
        <Alert
          onClose={() => {
            setPasswordErrorVisibility(false);
          }}
          className="absolute left-0 right-0 mx-auto transition duration-1000 ease-in-out w-96 top-16"
          severity="error"
        >
          {passwordError}
        </Alert>
      )}
    </div>
  );
};

Login.defaultProps = {};

export default memo(Login);
