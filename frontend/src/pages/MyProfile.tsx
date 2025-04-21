import React, { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

interface UserData {
  name: string;
  phone: string;
  Address: {
    line1: string;
    line2: string;
  };
  gender: string;
  dob: string;
  email: string;
  image: string;
}

interface AppContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  token: string;
  backendUrl: string;
  loadUserData: () => Promise<void>;
}

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserData } =
    useContext<AppContextType>(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.Address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.patch(
        `${backendUrl}/api/v1/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof UserData
  ) => {
    setUserData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement>,
    line: "line1" | "line2"
  ) => {
    setUserData((prev) => ({
      ...prev,
      Address: {
        ...prev.Address,
        [line]: e.target.value,
      },
    }));
  };

  if (!userData) return null;

  return (
    <div className="max-w-l flex flex-col gap-2 text-sm">
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer">
          <div className="inline-block relative">
            <img
              className="w-36 opacity-75 rounded"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
            />
            {!image && (
              <img
                className="w-10 absolute bottom-12 right-12"
                src={assets.upload_icon}
                alt="upload"
              />
            )}
          </div>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
        </label>
      ) : (
        <img className="w-36 rounded-md" src={userData.image} alt="profile" />
      )}

      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 p-1"
          type="text"
          value={userData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
      ) : (
        <p className="font-medium text-xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-50 h-[1px]" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email Id:</p>
          <p className="text-green-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 p-1"
              type="text"
              value={userData.phone}
              onChange={(e) => handleInputChange(e, "phone")}
            />
          ) : (
            <p className="text-green-500">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="bg-gray-50 p-1 w-full mb-1"
                type="text"
                value={userData.Address.line1}
                onChange={(e) => handleAddressChange(e, "line1")}
              />
              <input
                className="bg-gray-50 p-1 w-full"
                type="text"
                value={userData.Address.line2}
                onChange={(e) => handleAddressChange(e, "line2")}
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.Address.line1}
              <br />
              {userData.Address.line2}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 p-1"
              value={userData.gender}
              onChange={(e) => handleInputChange(e, "gender")}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100 p-1"
              value={userData.dob}
              type="date"
              onChange={(e) => handleInputChange(e, "dob")}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border py-2 hover:bg-primary hover:text-white transition-all duration-500 border-primary px-8 rounded"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border py-2 hover:bg-primary hover:text-white transition-all duration-500 border-primary px-8 rounded"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
