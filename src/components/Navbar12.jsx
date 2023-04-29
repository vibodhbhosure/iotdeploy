import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/iotlogo.png";
import "./navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = (props) => {
  let activeStyle = {
    color: "#fff",
  };

  const baseUrl = props.baseUrl;

  const [data, setData] = useState({
    co2: [],
    dust: [],
    epoch: [],
    eth: [],
    h2: [],
    hum: [],
    lat: [],
    lon: [],
    mq135: [],
    o3: [],
    temp: [],
    voc: [],
  });

  const getData = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => getData(), []);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="header">
      <Navbar
        expanded={expanded}
        expand="lg"
        sticky="top"
        style={{ backgroundColor: "#6198FF" }}
      >
        <Container className="navbar-custom-container">
          <Navbar.Brand>
            <img src={logo} alt="logo" id="logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse className="justify-content-end navbar-c">
            <Nav className="ml-auto">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/Dashboard"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/Location"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Location
              </NavLink>
              <NavLink
                to="/ReportPrint"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Generate Report
              </NavLink>
              <NavLink
                to="/ReportPrin"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Longitude: {data.lon}
              </NavLink>
              <NavLink
                to="/ReportPrin"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                Latitude: {data.lat}
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
