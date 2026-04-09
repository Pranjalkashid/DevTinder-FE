import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Invalid credentials.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        Base_Url + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data)); // if do not work add .data
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Invalid credentials.");
    }
  };
  return (
    <div className="flex justify-center  mt-10">
      <div className="card w-96 bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          {!isLogin && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">First Name</span>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your first name"
                    className="grow"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold ">Last Name</span>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Enter your last name"
                    className="grow"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold ">Email</span>
            </label>

            <label className="input input-bordered flex items-center gap-2">
              {/* <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>{" "}
                  <circle cx="12" cy="7" r="4"></circle>{" "}
                </g>
              </svg> */}

              <input
                type="email"
                value={emailId}
                placeholder="Enter your email"
                className="grow"
                required
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
          </div>

          {/* Password */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text font-bold ">Password</span>
            </label>

            <label className="input input-bordered flex items-center gap-2 mb-2">
              {/* <svg
                className="h-5 w-5 opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg> */}

              <input
                type="password"
                value={password}
                placeholder="Enter password"
                className="grow"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500"> {error}</p>

          {isLogin && (
            <label className="label">
              <a className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          )}

          {/* Button */}
          <div className="form-control mt-4">
            <button
              className="btn btn-primary w-full font-bold"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Signup */}
          <p
            className="text-center text-sm mt-3"
            onClick={() => setIsLogin((value) => !value)}
          >
            <span className="link link-primary cursor-pointer">
              {isLogin
                ? "Don’t have an account? SignUp Here"
                : "Existing User? Login Here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
