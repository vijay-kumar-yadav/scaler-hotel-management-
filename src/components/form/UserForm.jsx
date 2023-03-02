import React, { useState } from "react";
import {
  Button,
  ButtonToolbar,
  RadioGroup,
  DateRangePicker,
  Form,
  Radio,
  Container,
  Header,
  Content,
} from "rsuite";
import "./UserForm.css";
const { before } = DateRangePicker;

const UserForm = ({
  setData,
  setDate,
  setNoOfRoom,
  setType,
  setUserNameAndEmail,
  setReservationList,
  noOfRoom,
  data,
  reservationList,
  type,
  userNameAndEmail,
  errorMessage,
  room,
  date,
  handleRoomBooking,
  getAvailableRooms,
  rooms,
  setErrorVisible,
  getRoomBookedDetail,
}) => {
  const [roomBook, setRoomBook] = useState([]);
  const getAvailRooms = (start, end, roomsA, typ) =>
    getAvailableRooms(start, end, roomsA, typ);
  let [roomCount, setRoomCount] = useState(0);
  return (
    <Container
      style={{
        margin: "30px",
        border: "1px solid black",
        borderRadius: "2%",
        padding: "30px",
      }}
    >
      <Header
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "30px",
          userSelect: "none",
          marginBottom: "30px",
        }}
      >
        Booking Detail
      </Header>
      <Content>
        <Form
          fluid
          onReset={() => {
            setType("");
            setDate({});
            setNoOfRoom(1);
            setUserNameAndEmail({});
          }}
        >
          <Form.Group controlId="name">
            <Form.ControlLabel className="name">Guest Name</Form.ControlLabel>
            <Form.Control
              errorMessage={errorMessage}
              // errorPlacement={errorPlacement}
              name="name"
              value={userNameAndEmail.name}
              onChange={(val) =>
                setUserNameAndEmail({
                  ...userNameAndEmail,
                  name: val,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.ControlLabel className="email">Guest Email</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              errorMessage={errorMessage}
              value={userNameAndEmail.email}
              onChange={(value) =>
                setUserNameAndEmail({
                  ...userNameAndEmail,
                  email: value,
                })
              }
              // errorPlacement={errorPlacement}
            />
          </Form.Group>
          {userNameAndEmail.name.length > 0 &&
            userNameAndEmail.email.length > 0 && (
              <Form.Group controlId="radio">
                <Form.ControlLabel className="roomType">
                  Select Room Type:
                </Form.ControlLabel>
                <Form.Control
                  errorMessage={errorMessage}
                  name="radio"
                  accepter={RadioGroup}
                  value={type}
                  onChange={(val) => {
                    setType(val);

                    setNoOfRoom(1);
                  }}
                >
                  <Radio value={"A"}>Type-A</Radio>
                  <Radio value={"B"}>Type-B</Radio>
                  <Radio value={"C"}>Type-C</Radio>
                </Form.Control>
              </Form.Group>
            )}
          {type && (
            <Form.Group>
              <Form.ControlLabel className="roomBook">
                Select number of room to book
              </Form.ControlLabel>
              <Form.Control
                name={"number"}
                min={1}
                type={"number"}
                value={noOfRoom}
                onChange={setNoOfRoom}
                max={room[type].available}
              ></Form.Control>
            </Form.Group>
          )}

          {type && (
            <Form.Group>
              <Form.ControlLabel className="Duration">
                Duration
              </Form.ControlLabel>
              <DateRangePicker
                disabledDate={before(new Date())}
                placeholder="Pick time to stay"
                defaultValue={[new Date(), new Date()]}
                format="yyyy-MM-dd HH:mm"
                onOk={(date) => {
                  // Calculate difference in milliseconds
                  const diff = date[1].getTime() - date[0].getTime();

                  // Get difference in hours
                  const diffHours = Math.floor(diff / (1000 * 60 * 60));
                  setDate({
                    startTime: date[0],
                    endTime: date[1],
                    duration: diffHours,
                  });
                }}
              />
              <Form.HelpText>
                {date.duration} hrs Rs.
                {noOfRoom * date.duration * room[type].rent}
              </Form.HelpText>
            </Form.Group>
          )}
          {date.duration > 0 &&
            (roomCount < noOfRoom ? (
              <Form.Group>
                <Form.ControlLabel>
                  Select room number to book
                </Form.ControlLabel>
                {getAvailRooms(date.startTime, date.endTime, rooms, type)
                  .length > 0 ? (
                  noOfRoom <= 0 ? (
                    <h3 key={type}>Please specify number of room</h3>
                  ) : (
                    getAvailRooms(
                      date.startTime,
                      date.endTime,
                      rooms,
                      type
                    ).map((datas, index) => {
                      if (index >= noOfRoom) return "";
                      return (
                        <Button
                          appearance={"primary"}
                          key={index}
                          onClick={(data) => {
                            if (
                              handleRoomBooking(
                                datas.id,
                                date.startTime,
                                date.endTime,
                                userNameAndEmail
                              )
                            ) {
                              setRoomBook([
                                ...roomBook,
                                room[type].roomAvail[index],
                              ]);
                              setRoomCount(++roomCount);
                            }
                          }}
                        >
                          {datas.id}
                        </Button>
                      );
                    })
                  )
                ) : (
                  <h4>No Rooms Available</h4>
                )}
              </Form.Group>
            ) : (
              <h5>Required Room Booked</h5>
            ))}

          <Form.Group>
            {roomCount !== 0 && (
              <ButtonToolbar>
                <Button
                  onClick={() => {
                    if (
                      userNameAndEmail.name.length === 0 ||
                      userNameAndEmail.email.length === 0
                    ) {
                      setErrorVisible(true);
                      console.log("error");
                      return;
                    } else {
                      setErrorVisible(false);
                      setData([
                        ...data,
                        {
                          userAssigned: {
                            email: userNameAndEmail.email,
                            name: userNameAndEmail.name,
                          },
                          type: type,
                          bookTime: {
                            startTime: date.startTime,
                            endTime: date.endTime,
                            duration: date.duration,
                          },
                          price: room[type],
                        },
                      ]);
                      setReservationList([
                        ...reservationList,
                        {
                          title: userNameAndEmail.name,
                          end: date.endTime,
                          start: date.startTime,
                          email: userNameAndEmail.email,
                          duration: date.duration,
                          status: null,
                          room: roomBook.join(","),
                        },
                      ]);
                      setType("");
                      setDate({});
                      setNoOfRoom(1);
                      setUserNameAndEmail({ name: "", email: "" });
                    }
                  }}
                  appearance={"ghost"}
                >
                  Submit
                </Button>
                <Button type={"reset"} appearance={"ghost"}>
                  Reset
                </Button>
              </ButtonToolbar>
            )}
          </Form.Group>
        </Form>
      </Content>
    </Container>
  );
};

export default UserForm;
