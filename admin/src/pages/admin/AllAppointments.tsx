import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { TheAppointment } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, setAppointments, getAllApointments } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllApointments();
    }
  }, [aToken]);
  console.log(appointments);
  return (
    <div className="w-full mx-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>
        {appointments.map((appointment: TheAppointment, index: number) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-500"
          >
            <p>{index + 1}</p>
            <div>
              <img
                src={appointment?.userData?.image}
                alt={appointment?.userData?.name}
              />
              <p>{appointment?.userData?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
