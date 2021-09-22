import React from "react";
import { Image } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import Calendar from 'react-calendar';
import checked from "../assets_pocketdevs/assets/img/logo/checked.svg";
import trash from "../assets_pocketdevs/assets/img/logo/delete.svg";
import close from "../assets_pocketdevs/assets/img/logo/close-icon.svg";
import subtask from "../assets_pocketdevs/assets/img/logo/subtask.svg";
import user from "../assets_pocketdevs/assets/img/logo/user.svg";
// import calendar from "../assets_pocketdevs/assets/img/logo/calendar.svg";
import add from "../assets_pocketdevs/assets/img/logo/add-btn.svg";

const sidetask = ({ show, hide }) => {
  return (
    <div className={show ? "sidenav active sidebar-wrapper" : "sidenav sidebar-wrapper"}>
      <div className="sidebar-box">
      <div className="border-bottom border-dark d-flex align-items-center justify-content-between">
        <button className="theme-btn mb-2 p-1 label-font` taskComplete">
          <Image className="fas-icon" src={checked}></Image>
          Mark as complete
        </button>
        <div className="d-flex align-items-center">
          <Image className="fas-icon" src={subtask}></Image>
          <Image className="fas-icon" src={trash}></Image>
          <Image
            onClick={() => hide(!show)}
            className="fas-icon pointer"
            src={close}
          ></Image>
        </div>
      </div>
      <div className="py-2 border-bottom border-dark">
        <form>
          <input
            className="py-3 full border-0 h3"
            type="text"
            placeholder="Write a task name"
          ></input>
          <>
            <div className="row mb-1 f-dark">
              <div className="col py-2 d-flex align-items-center">
                <label className="label-font">Date:</label>
                <div className="d-flex align-items-center mx-4">
                  {/* <Image src={calendar} className="mx-2 fas-icon"></Image>
                  <p className="label-font">set date</p> */}
                  <Calendar/>
                </div>
              </div>
              <div className="col py-2 d-flex align-items-center">
                <label className="label-font">Assigned: </label>
                <div className="d-flex align-items-center m2-4">
                  <Image src={user} className="mx-2 fas-icon"></Image>
                  <p className="label-font">assign user</p>
                </div>
              </div>
            </div>
            <div className="row mb-1 h6 f-dark">
              <div className="col py-2 d-flex align-items-center">
                <label className="label-font">Project:</label>
                <div className="d-flex align-items-center mx-2">
                  <Image src={add} className="mx-2 fas-icon"></Image>
                  <p className="label-font">project name</p>
                </div>
              </div>
              <div className="col py-2">
                <label className="label-font">Priority: </label>
                  <Dropdown as={ButtonGroup}>
                  <p className="prio label-font">
                    set priority
                  </p>
                  <Dropdown.Toggle
                    className="option"
                    split
                    variant="success"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu className="option">
                    <Dropdown.Item href="#/action-1">Light</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><Calendar/></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="row">
              <div className="col py-2 h6 f-dark">
                <label className="label-font">Description:</label>
                <textarea
                  placeholder="Describe Task."
                  className="mt-3 radius px-3 py-2 label-font full resize-0"
                ></textarea>
              </div>
            </div>
            <div className="row ">
              <div className="col">
                <button className="theme-btn subtask">+ add subtask</button>
              </div>
            </div>
          </>
        </form>
      </div>
      <div className="border-bottom border-dark full">
        <div className="d-flex align-items-center py-2">
          <Image className="fas-icon" src={user}></Image>
          <input
            className="border-1 p-1 full radius"
            type="text"
            readOnly="true"
          ></input>
        </div>
        <div className="d-flex align-items-center py-2">
          <Image className="fas-icon" src={user}></Image>
          <input
            className="border-1 p-1 full radius"
            type="text"
            readOnly="true"
          ></input>
        </div>
        <div className="d-flex align-items-center py-2">
          <Image className="fas-icon" src={user}></Image>
          <input
            className="border-1 p-1 full radius"
            type="text"
            readOnly="true"
          ></input>
        </div>
      </div>
      <div className="my-2 d-flex align-items-start">
        <Image src={user}></Image>
        <textarea
          className="mx-2 p-3 full resize-0 radius label-font"
          placeholder="Write a comment"
        ></textarea>
      </div>
    </div>
    </div>
  );
};

export default sidetask;
