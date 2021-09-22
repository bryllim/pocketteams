import React from "react";
import TaskCard from './TaskCard'
import PopMenu from './PopMenu'

const SectionCard = ({ taskList }) => {
  return (
    <>
   
    <div className="d-flex flex-column section-wrapper mx-2" >
      <div className="d-flex justify-content-between align-items-center px-3 py-2 ">

        <h5 className="text-white">Sectionname</h5>
        <div>
          <button class="btn text-white" type="button">
            <i class="lni lni-plus"></i>
          </button>
      
          <button class="btn text-white" type="button">
            <i class="lni lni-more-alt"></i>
          </button>
        </div>
      
      </div>
          

            <div className="section-wrapper-internal scrolling-wrapper-y flex-nowrap py-4 basecard">

            <TaskCard/>
           
         
       
            
                  <div class="d-flex justify-content-center theme-btn align-items-center mx-auto"  style={{width:"324px", height:"50px"}}>
                      <button class="btn" type="button">
                          <i class="lni lni-plus"></i>
                      </button>
                      <div>Add Another Task</div>
                  </div>
            </div>
    </div>
    </>
  );
};

export default SectionCard;
