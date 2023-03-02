import React, { useState } from "react";
import Form from "../form/UserForm";

const Home = ({ reservationList, setReservationList }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const errorMessage = errorVisible ? "This field is required" : null;

  const [noOfRoom, setNoOfRoom] = useState(1);
  let room = {
    A: { rent: 100, available: 5, roomAvail: [101, 102, 103, 104, 105] },
    B: { rent: 80, available: 5, roomAvail: [201, 202, 203, 204, 205] },
    C: { rent: 50, available: 5, roomAvail: [301, 302, 303, 304, 305] },
  };
  const [rooms, setRooms] = useState([
    {
      id: 101,
      type: "A",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 102,
      type: "A",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 103,
      type: "A",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 104,
      type: "A",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 105,
      type: "A",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 201,
      type: "B",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 202,
      type: "B",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 203,
      type: "B",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 204,
      type: "B",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 205,
      type: "B",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 301,
      type: "C",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 302,
      type: "C",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 303,
      type: "C",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 304,
      type: "C",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
    {
      id: 305,
      type: "C",
      bookings: [],
      status: false,
      user: { name: "", email: "" },
    },
  ]);
  const getAvailableRooms = (startTime, endTime, rooms, types) => {
    const availableRooms = [];
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      let isAvailable = true;
      for (let j = 0; j < room.bookings.length; j++) {
        const booking = room.bookings[j];
        if (
          startTime >= booking.startTime &&
          startTime <= booking.endTime &&
          room.type === types
        ) {
          isAvailable = false;
          break;
        }
        if (
          endTime >= booking.startTime &&
          endTime <= booking.endTime &&
          room.type === types
        ) {
          isAvailable = false;
          break;
        }
        if (
          startTime <= booking.startTime &&
          endTime >= booking.endTime &&
          room.type === types
        ) {
          isAvailable = false;
          break;
        }
      }
      if (isAvailable && room.type === types) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  };

  const [data, setData] = useState([
    {
      userAssigned: { email: "", name: "" },
      type: "",
      bookTime: { startTime: "", endTime: "", duration: "", roomNumber: [[]] },
      price: "",
    },
  ]);

  const [userNameAndEmail, setUserNameAndEmail] = useState({
    email: "",
    name: "",
  });
  const [type, setType] = useState(null);
  const [date, setDate] = useState({
    startTime: "",
    endTime: "",
    duration: "",
  });
  //   let bookedRoomDetail = [
  // {
  //   userAssigned: { email: "",name:"" },
  //   type: "",
  //   bookTime: { startTime: "", endTime: "" ,duration:""},
  //   price: "",
  // },
  //   ];
  const isRoomAvailable = (roomId, startTime, endTime, userEmailAndName) => {
    const room1 = rooms.find((r) => r.id === roomId);
    const overlappingBooking = room1.bookings.find(
      (booking) =>
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime)
    );
    return !overlappingBooking;
  };
  const handleRoomBooking = (roomId, startTime, endTime) => {
    if (isRoomAvailable(roomId, startTime, endTime)) {
      const updatedRooms = rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              bookings: [...room.bookings, { startTime, endTime }],
              user: userNameAndEmail,
              status: true,
            }
          : room
      );
      setRooms(updatedRooms);
      return true;
    } else {
      alert(`Room ${roomId} is not available from ${startTime} to ${endTime}.`);
      return false;
    }
  };
  function getRoomBookedDetail(name, email) {
    const data = rooms.filter((data) =>
      email === data.user.email ? data.id : ""
    );
    console.log(data);
    return data;
  }
  return (
    <>
      <Form
        data={data}
        setData={setData}
        type={type}
        setType={setType}
        userNameAndEmail={userNameAndEmail}
        setUserNameAndEmail={setUserNameAndEmail}
        date={date}
        setDate={setDate}
        reservationList={reservationList}
        setReservationList={setReservationList}
        noOfRoom={noOfRoom}
        setNoOfRoom={setNoOfRoom}
        errorMessage={errorMessage}
        room={room}
        handleRoomBooking={handleRoomBooking}
        getAvailableRooms={getAvailableRooms}
        rooms={rooms}
        setErrorVisible={setErrorVisible}
        getRoomBookedDetail={getRoomBookedDetail}
      />
    </>
  );
};

export default Home;
