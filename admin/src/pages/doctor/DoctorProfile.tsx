import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const { dToken, profileData, getDoctorProfile, setProfileData, backendUrl } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const updateData = {
        available: profileData.available,
        Address: profileData.Address,
        fee: profileData.fee,
      };
      const { data } = await axios.patch(
        `${backendUrl}/api/v1/doctor/update-doctor-profile`,
        { ...updateData, dToken }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getDoctorProfile();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);
  return (
    profileData && (
      <div
        className="FLEX flex-col gap-4 m-5

      "
      >
        <div>
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64  rounded-lg"
              src={profileData?.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doc info name degree and experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData?.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-500">
              <p>
                {profileData?.degree}-{profileData?.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full bg-primary/40">
                {profileData?.experiance}
              </button>
            </div>
            {/*      ---------       Doctor About
             ----------*/}
            <div>
              <p className=" flex items-center gap-1 font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-xs text-gray-600 max-w-[700px] mt-1">
                {profileData?.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-800 ">
                Ksh.{" "}
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fee}
                    onChange={(e) =>
                      setProfileData((prev: any) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.fee
                )}
              </span>
            </p>
            <div className="flex gap-2 py-4">
              <p className="text-sm">Address:</p>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData?.Address?.line1}
                  onChange={(e) =>
                    setProfileData((prev: any) => ({
                      ...prev,
                      Address: { ...prev.Address, line1: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData?.Address?.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  value={profileData?.Address?.line2}
                  onChange={(e) =>
                    setProfileData((prev: any) => ({
                      ...prev,
                      Address: { ...prev.Address, line2: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData?.Address?.line2
              )}
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev: any) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
              />
              <label htmlFor="">Available</label>
            </div>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-1 border border-primary text-sm rounded-md mt-5 hover:bg-primary hover:text-white transition-all duration-500"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-md mt-5 hover:bg-primary hover:text-white transition-all duration-500"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
