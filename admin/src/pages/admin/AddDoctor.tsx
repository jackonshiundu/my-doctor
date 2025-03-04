import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import toast from "react-hot-toast";
import axios from "axios";

const AddDoctor = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  //states
  const [loading, setLoading] = useState(false);
  const [docImg, setDocImg] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experiance, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocImg(e.target.files[0]);
    }
  };

  const onSubmitHander = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!docImg) {
        return toast.error("Doc Imagenot selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experiance", experiance);
      formData.append("fee", fee);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "Address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const response = await axios.post(
        `${backendUrl}/api/v1/admin/adddoctor`,
        formData,
        {
          headers: {
            aToken,
          },
        }
      );

      if (response.data.success) {
        toast.success(response?.data?.message);
        // Reset form fields after successful submission
        setDocImg(undefined);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFee("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={onSubmitHander}>
      <p className="mb-3 ttext-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl mah-h[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="docimage">
            <img
              className="w-16 bg-gray-200 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="uploeadarea"
            />
          </label>
          <input onChange={handleFileChange} type="file" id="docimage" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Your Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2"
                type="passwors"
                placeholder="password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Experiance</p>
              <select
                value={experiance}
                onChange={(e) => setExperience(e.target.value)}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Fee</p>
              <input
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="5000"
                required
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full px-4 border rounded-md"
            rows={5}
            placeholder="Write ablout Doctor"
            required
          />
        </div>
        <button
          disabled={loading}
          className="bg-primary px-10 py-3 mt-4 rounded-md text-white"
        >
          {loading ? "Adding..." : " Add Doctor"}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
