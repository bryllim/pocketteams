import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { listNotes, createNoteAction, updateNoteAction } from "../actions/noteActions"
import Preload from "../components/Preload";
import ErrorMessage from "../components/ErrorMessage";
import { useHistory } from "react-router";




const Notes = (note) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();

  const [content, setContent] = useState(notes)

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }

  }, [dispatch, history, userInfo, successCreate, successUpdate,]);


  // FOR Creating note BUTTON
  const createHandler = (e) => {
    const defaultContent = "Write your note here."
    e.preventDefault();
    if (!content) {
      dispatch(createNoteAction( defaultContent ));

    } 

    history.push('/project')
  }

  // For update button
  const updateHandler = (e) => {
    e.preventDefault();
    if (!content) return
    dispatch(updateNoteAction( notes[0]._id, content ));
  }

  // const defaultContent = 0;

  // const textarea = document.querySelector('notes-text');

  console.log(content)


  // for updating
  // useEffect(() => {
  //   const fetching = async () => {
  //      const { data } = await axios.get( `api/note/${note._id}` );

  //     setContent(data.content);
  //   };

  //   fetching();
  // }, [note._id]);

  return (
    <div className="sidebar-box recent-blog-box mb-30">
        <form>
            <h5>My Notes</h5>
            <hr className="default"></hr>
            { error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            { loading && <Preload/> }
            {notes?.map((note) => (
              <textarea 
              id="textarea"
              note={note.content}
              placeholder="Write your notes here."
              onChange={(e) => setContent(e.target.value)} 
              defaultValue={note.content}
              // value={content}
              className="notes-text"
              ></textarea>
            ))} 
            <div>
                {/* <button className="theme-btn theme-btn-md me-2"
                onClick={createHandler}>
                <span>Create note</span>
                </button>  */}
                <button className="theme-btn theme-btn-md" onClick={ !content ? createHandler : updateHandler }>
                <i className="lni lni-cloud-sync me-2"></i>
                <span>{ !content ? "Create note" : "Sync note" }</span>
                </button> 
            </div>
        </form>
    </div>
  );
};

export default Notes;
