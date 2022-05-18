import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword, useSignInWithGoogle, 
} from "react-firebase-hooks/auth";

import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let signInError;
  let location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  useEffect(()=>{
    if(user || googleuser){
        navigate(from, { replace: true });
    }
  },[navigate,user,googleuser,from])
  if (loading || googleloading) {
    return <Loading />;
  }

  
  if (error || googleerror) {
    signInError = (
      <p className="text-red-500 text-center">
        <small>{error?.message } || {googleerror?.message}</small>
      </p>
    );
  }
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  

  return (
    <div className="flex h-screen items-center justify-center">
      <div class="card  w-96 bg-base-100 shadow-2xl ">
        <div class="card-body ">
          <h2 class="text-center text-3xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                class="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer!",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signInError}
            <input
              className="btn btn-accent w-full max-w-xs"
              type="submit"
              value="Login"
            />
            <p className="text-sm mt-2 text-center">
              New to To Do Maker?
              <Link className="text-primary" to="/signup">
                Create an account
              </Link>
            </p>
          </form>
          <div class="divider">OR</div>
          <button onClick={()=>signInWithGoogle()}  class="btn btn-outline">
            Continue with Google{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;