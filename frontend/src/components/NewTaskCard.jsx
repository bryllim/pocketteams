import React, { useState } from "react";
import Sidetask from "./Sidetask";


const NewTaskCard = () => {
    const [showNav, setShowNav] = useState(false);
    return (
        <div>
            <div className="d-flex justify-content-between border border-bottom pb-3">
                <p className="taskTitle">Task</p>
                <i onClick={() => setShowNav(!showNav)} className="lni lni-pencil align-self-start p-2 m-2"></i>
            </div>
            <Sidetask show={showNav} hide={setShowNav} />
        </div>
    )
}

export default NewTaskCard
