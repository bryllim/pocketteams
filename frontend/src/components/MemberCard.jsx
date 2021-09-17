import React from 'react'
import PopMenu from './PopMenu'
const MemberCard = () => {
    return (
        <>
            <div className="d-flex flex-column pt-1 align-items-center basecard" style={{width:"200px", height:"200px"}}>
               
                <button type="button" class="btn m-0 p-0 pe-1 align-self-end">
                            <PopMenu  menuOptions={["Set as Project Owner","Remove"]} />
                </button>   

                <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'100px', height:'100px'}}/>
                <h5>Name</h5>
                <h6>Email@gmail.com</h6>
                <h6>Position</h6>



            </div>


           

        </>
    )
}

export default MemberCard
