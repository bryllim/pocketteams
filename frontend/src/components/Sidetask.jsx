import { Image } from "react-bootstrap";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import checked from "../assets_pocketdevs/assets/img/logo/checked.svg";
import trash from "../assets_pocketdevs/assets/img/logo/delete.svg";
import close from "../assets_pocketdevs/assets/img/logo/close-icon.svg";
import subtask from "../assets_pocketdevs/assets/img/logo/subtask.svg";
import user from "../assets_pocketdevs/assets/img/logo/user.svg";
import calendar from "../assets_pocketdevs/assets/img/logo/calendar.svg";
import add from "../assets_pocketdevs/assets/img/logo/add-btn.svg";

const SideTask = ({ show }) => {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <div className="sidebar-wrapper">
        <div className="sidebar-box">
      <div className="border-bottom border-dark d-flex align-items-center justify-content-between">
        <button className="theme-btn my-2 taskComplete">
          <Image className="fas-icon" src={checked}></Image>
          Mark as complete
        </button>
        <div className="d-flex align-items-center">
          <Image className="fas-icon" src={subtask}></Image>
          <Image className="fas-icon" src={trash}></Image>
          <Image
            onClick={() => !show}
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
          <div className="container">
            <div className="row mb-1 h6 f-dark">
              <div className="col py-2 d-flex align-items-center">
                <label>Date:</label>
                <div className="d-flex align-items-center mx-4">
                  <Image src={calendar} className="mx-2 fas-icon"></Image>
                  <p>set date</p>
                </div>
              </div>
              <div className="col py-2 d-flex align-items-center">
                <label>Assigned: </label>
                <div className="d-flex align-items-center m2-4">
                  <Image src={user} className="mx-2 fas-icon"></Image>
                  <p>assign user</p>
                </div>
              </div>
            </div>
            <div className="row mb-1 h6 f-dark">
              <div className="col py-2 d-flex align-items-center">
                <label>Project:</label>
                <div className="d-flex align-items-center mx-2">
                  <Image src={add} className="mx-2 fas-icon"></Image>
                  <p>project name</p>
                </div>
              </div>
              <div className="col py-2">
                <label>Priority: </label>
                <Dropdown as={ButtonGroup}>
                  <Button variant="success" className="prio">
                    set priority
                  </Button>

                  <Dropdown.Toggle
                    className="option"
                    split
                    variant="success"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu className="option">
                    <Dropdown.Item href="#/action-1">Light</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Medium</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Heavy</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="row">
              <div className="col py-2 h6 f-dark">
                <label>Description:</label>
                <textarea
                  placeholder="Describe Task."
                  className="mt-3 radius px-3 py-2 full resize-0"
                ></textarea>
              </div>
            </div>
            <div className="row ">
              <div className="col">
                <button className="theme-btn subtask">+ add subtask</button>
              </div>
            </div>
          </div>
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
          className="mx-2 p-3 full resize-0 radius"
          placeholder="Write a comment"
        ></textarea>
      </div>
      </div>
      </div>
    </div>
  );
};

export default SideTask;
