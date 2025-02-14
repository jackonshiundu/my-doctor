import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, Doctor } from "../assets/assets";

type TimeSlot = {
  dateTime: Date;
  time: string;
};
const Appointment = () => {
  const { docId } = useParams<{ docId: string }>();

  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState<Doctor | null>(null);
  const [docSlots, setDocSlots] = useState<TimeSlot[][]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setTimeSlot] = useState("");
  const daysOfWeek: string[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THUR",
    "FRI",
    "SAT",
  ];
  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    if (docInfo) {
      setDocInfo(docInfo);
    } else {
      setDocInfo(null);
    }
  };
  const getAvailableSLots = async () => {
    setDocSlots([]);

    //getting current date

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      //setting end tome of the dtae with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        //adding a slot to an array
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        //increment currenttime by 30minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    getAvailableSLots();
  }, [docInfo]);
  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  return (
    docInfo && (
      <div className="flex flex-col sm:flex-row gap-4">
        {/*     doctors Details
         */}
        <div>
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg "
              src={docInfo?.image}
              alt={docInfo?.name}
            />
          </div>
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/*  Doc Info:name,degree,experience */}

          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-800">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          {/* Doctor About */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt={docInfo.name} />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600 font-bold">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
        {/* Booking SLots */}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div>
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div>
                  <p>{item[0]}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
