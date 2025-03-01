import React, { ChangeEvent, useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          `http://localhost:8000/api/v1/admin/login-admin`,
          { email, password }
        );
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          console.log(data);
          toast.error(data.message);
        }
      } else {
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-600 text-sm shadow-md">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>Admin
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="border border-gray-100 rounded w-full p-2 mt-1"
            type="email"
            required
          ></input>
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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
