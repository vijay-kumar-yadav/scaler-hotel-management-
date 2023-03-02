import React, { useState } from "react";
import Form from "../form/UserForm";
import roomData from "../../data/roomData";
import bookingRoom from "../../data/bookingRoom";

const Home = ({ reservationList, setReservationList }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const errorMessage = errorVisible ? "This field is required" : null;

  const [noOfRoom, setNoOfRoom] = useState(1);
  let room = roomData;
  const [rooms, setRooms] = useState(bookingRoom);
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
    return data;
  }
  return (
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
  );
};

export default Home;
