import { FormEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  //getting values context
  const { token, setToken, backendUrl } = useContext(AppContext);
  //setting the app states
  const [state, SetState] = useState("Sign Up");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/v1/user/register`,
          { name, password, email }
        );
        if (data.success) {
          console.log("Done");
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/v1/user/login`, {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form onSubmit={onSubmit} className="min-h-[80vh]   flex items-center">
      <div className="flex flex-col p-6 gap-3 m-auto items-start mim-w-[340px] sm:min-w-96 border rounded-sm text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Create Account" : "Sign In"} to book
          Appointment.
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 w-full p-2 ml-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 w-full p-2 ml-1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 w-full p-2 ml-1"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 text-base rounded-md"
        >
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        <br />
        {state === "Sign Up" ? (
          <p>
            Already have an Account?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => SetState("Login")}
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new accoutn?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => SetState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
