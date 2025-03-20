import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets, slotDateFormat } from "../../assets/assets";

const Dashboard = () => {
  const { getDashData, dashData, aToken, cancelAppointment } =
    useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="doctor-icon" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="doctor-icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-2 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.patients_icon}
              alt="doctor-icon"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="list-icon" />
            <p className="font-semibold">Latest Appointments</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map(
              (latestAppointment: any, index: number) => (
                <div
                  className="flex items-center px-6 gap-3 hover:bg-gray-100"
                  key={index}
                >
                  <img
                    className="w-10 rounded-full"
                    src={latestAppointment?.docData?.image}
                    alt={latestAppointment?.docData?.name}
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {latestAppointment?.docData?.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(latestAppointment?.slotDate)}
                    </p>
                  </div>
                  <div>
                    {latestAppointment.canceled ? (
                      <p className="text-red-200 text-xm font-medium">
                        Cancelled
                      </p>
                    ) : (
                      <img
                        onClick={() => cancelAppointment(latestAppointment._id)}
                        src={assets.cancel_icon}
                        alt="cancel icon"
                        className="w-10 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
