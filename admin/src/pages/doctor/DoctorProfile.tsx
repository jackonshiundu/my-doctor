import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, profileData, getDoctorProfile } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);
  console.log(profileData);
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
              <span className="text-gray-800 ">Ksh. {profileData.fee}</span>
            </p>
            <div className="flex gap-2 py-4">
              <p className="text-sm">Address:</p>
              {profileData?.Address?.line1}
              <br />
              {profileData?.Address?.line2}
            </div>
            <div className="flex gap-1 pt-2">
              <input checked={profileData.available} type="checkbox" />
              <label htmlFor="">Available</label>
            </div>
            <button className="px-4 py-1 border border-primary text-sm rounded-md mt-5 hover:bg-primary hover:text-white transition-all duration-500">
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
