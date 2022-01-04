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

  const notify = () =>
    toast.success(notif, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
    });

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successCreate, successUpdate]);

  // const defaultContent = 0;

  // for updating
  // useEffect(() => {
  //   const fetching = async () => {
  //      const { data } = await axios.get( `api/note/${note._id}` );

  //     setContent(data.content);
  //   };

  //   fetching();
  // }, [note._id]);

  // for updating note
  // const updateHandler = (e) => {
  //   e.preventDefault();
  //   if (!content) return
  //   dispatch(updateNoteAction( notes[0]._id, content ));

  //   window.location.reload(false);
  // }

  // For creating notes
  const syncHandler = (e) => {
    const defaultContent = "Write your note here.";
    e.preventDefault();
    if (notes.length === 0) {
      dispatch(createNoteAction(defaultContent));
      setNotif("Notes Created Successfully.");
      notify();
      window.location.reload(false);
    }
    if (notes.length >= 1) {
      dispatch(updateNoteAction(notes[0]._id, content));
      setNotif("Notes Updated Successfully.");
      notify();
    }
  };
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
