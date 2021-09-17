import React from 'react'

const MemberCard = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center basecard" style={{width:"200px", height:"200px"}}>
            
                <img src="https://via.placeholder.com/100" alt="" className="rounded-circle" style={{width:'100px', height:'100px'}}/>
                <h5>Name</h5>
                <h6>Email@gmail.com</h6>
                <h6>Position</h6>



            </div>


           

        </>
    )
}

export default MemberCard
