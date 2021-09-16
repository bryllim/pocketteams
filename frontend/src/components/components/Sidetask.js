import React from "react";
import { Image } from "react-bootstrap";
import checked from "../assets_pocketdevs/assets/img/logo/checked.svg";

const sidetask = ({ show, hide }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <div className="border-bottom border-dark">
        <button className="theme-btn my-2 taskComplete">
          <Image className="fas-checked" src={checked}></Image>
          Mark as complete
        </button>
        <div className="">
          <button
            className="theme-btn mx-0 taskComplete"
            onClick={() => hide(false)}
          >
            Close
          </button>
        </div>
      </div>
      <div className="py-2">
        <form>
          <input
            className="py-3 full border-0"
            type="text"
            placeholder="Write a task name"
          ></input>
          <div className="container py-3">
            <div className="row mb-2">
              <div className="col  py-2">
                <label>Date:</label>
              </div>
              <div className="col py-2">
                <label>Assigned: </label>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col  py-2">
                <label>Project:</label>
              </div>
              <div className="col py-2">
                <label>Priority: </label>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col py-2">
                <h6>Description:</h6>
                <textarea
                  placeholder="Describe Task."
                  className="my-3 radius p-3 full"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default sidetask;
