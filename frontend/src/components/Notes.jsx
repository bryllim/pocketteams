import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { listNotes, createNoteAction, updateNoteAction } from "../actions/noteActions"
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import { useHistory } from "react-router";
import { Link, match } from "react-router-dom";
import axios from "axios";




const Notes = (note) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();


  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/board");
    }
  }, [dispatch, history, userInfo]);


  const [content, setContent] = useState(notes)
  const [id, setId] = useState()
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  // const noteCreate = useSelector((state) => state.noteCreate);
  // const { success: successCreate } = noteCreate;

  // FOR SYNC BUTTON
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (!note.content) return
  //   dispatch(createNoteAction( note.content ));

  //   history.push("/board");
  // }

  // for updating
  useEffect(() => {
    const fetching = async () => {
       const { data } = await axios.get( `api/note/${note._id}` );

      setContent(data.content);
    };

    fetching();
  }, [note._id]);

  const updateHandler = (e) => {
    e.preventDefault();
    // if (!content) return
    dispatch(updateNoteAction( note._id , content ));

    // window.location.reload(false);
    history.push("/board");
  }


  return (
    <div className="sidebar-box recent-blog-box mb-30">
      {notes?.map((note) => (
        <form onSubmit={updateHandler}>
          <h5>My Notes</h5>
              <hr className="default"></hr>
              { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
              { loading && <Preload/> }
                  <textarea 
                  // onChange={(e) => setContent(e.target.value)} 
                  defaultValue={note.content}
                  className="notes-text"
                  note={note}
                  onClick={() => setId(note._id)}
                  ></textarea>
            <div>
                <button className="theme-btn theme-btn-md" type="submit">
                <i className="lni lni-cloud-sync me-2"></i>
                <span>Sync notes</span>
                </button> 
                {/* <Link to={`/board/notes/${note._id}`}> */}
                {/* <button className="theme-btn theme-btn-md">
                <span>Edit</span>
                </button>   */}
                {/* </Link> */}
            </div>
        </form>
      ))}
    </div>
  );
};

export default Notes;
