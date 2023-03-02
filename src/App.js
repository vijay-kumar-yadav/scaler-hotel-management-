import React, { useState } from "react";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import View from "./components/view/View";
import Guest from "./components/guest/Guest";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import { Nav, Navbar } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";

const App = () => {
  const [reservationList, setReservationList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  return (
    <>
      <Navbar className="navbar">
        <Navbar.Brand as="h5">ADMIN</Navbar.Brand>
        <Nav pullRight>
          <Nav.Item
            style={{ fontWeight: "bold" }}
            as={NavLink}
            to="/"
            icon={<HomeIcon />}
          >
            Home
          </Nav.Item>
          <Nav.Item style={{ fontWeight: "bold" }} as={NavLink} to="view">
            View
          </Nav.Item>
          <Nav.Item style={{ fontWeight: "bold" }} as={NavLink} to="room">
            Guest
          </Nav.Item>
        </Nav>
        {/* <Nav pullRight>
          <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
        </Nav> */}
      </Navbar>

      <Routes>
        <Route
          path={"/"}
          element={
            <Home
              reservationList={reservationList}
              setReservationList={setReservationList}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path={"view"}
          element={<View reservationList={reservationList} />}
        />
        <Route
          path={"room"}
          element={
            <Guest
              reservationList={reservationList}
              setReservationList={setReservationList}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
