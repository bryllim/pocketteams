import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listNotes,
  createNoteAction,
  updateNoteAction,
} from "../actions/noteActions";
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Notes = () => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const [content, setContent] = useState(notes);
  const [notif, setNotif] = useState();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const notifySuccess = (msg) => toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
  });

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  //for creating note
  const syncHandler = (e) => {
    const defaultContent = "Write your note here.";
    e.preventDefault();
    if (notes.length === 0) {
      dispatch(createNoteAction( defaultContent ));
      notifySuccess("Note Created Successfully.")
      window.location.reload(false)
    } 
    if (notes.length >= 1) {
      dispatch(updateNoteAction( notes[0]._id, content ));
      notifySuccess("Note Updated Successfully.")
      }
}
  // console.log(window.location.pathname);

  return (
    <div className="sidebar-box recent-blog-box mb-30">
      <form>
        <h5>My Notes</h5>
        <hr className="default"></hr>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Preload />}
        {notes?.map((note, index) => (
          <textarea
            key={index}
            note={note.content}
            placeholder="Write your notes here..."
            onChange={(e) => setContent(e.target.value)}
            defaultValue={note.content}
            className="notes-text"
          ></textarea>
        ))}
        <div>
          <button className="theme-btn theme-btn-md" onClick={syncHandler}>
            <i className="lni lni-cloud-sync me-3"></i>
            <span>Sync notes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notes;
