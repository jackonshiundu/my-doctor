import React, { useState } from "react";
const Login = () => {
  const [state, setState] = useState("Admin");
  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-md">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>Admin
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-gray-100 rounded w-full p-2 mt-1"
            type="email"
            required
          ></input>
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-gray-100 rounded w-full p-2 mt-1"
            type="password"
            required
          ></input>
        </div>
        <button className="bg-primary text-white w-full py-2 text-base rounded-md">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login ?{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setState("Doctor")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login ?{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
