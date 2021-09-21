import React,{useCallback} from 'react'
import PopMenu from './PopMenu'
import { useHistory ,} from 'react-router-dom';

const ProjectCard = () => {

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/board'), [history]);

    return (


    <div class="sidebar-wrapper m-0">   
        <div className="d-flex flex-column sidebar-box basecard project-card"> 
              
                    <div className="d-flex justify-content-between">               
                        <img src="https://via.placeholder.com/150" alt="" className="rounded"  style={{height:"50px", width:"50px"}}/>
                        <button type="button" class="d-flex btn m-0 p-0 ">
                                    <PopMenu  menuOptions={["Edit","Remove"]} />
                        </button>    
                    </div>
                    <div className="d-flex flex-fill flex-column mt-3">

                            <h4 className="mb-1">Title</h4>
                            <p className='ps-3'> Contedsa here    </p>
                
                            <div className="d-flex justify-content-between mt-auto">
                                <p>Date</p>
                                <p className="hover-me" onClick={handleOnClick}> Open project <i class="bi bi-chevron-right"></i> </p>
                            </div>
                    </div>
 
        </div>
    </div>
     
    )
}

export default ProjectCard
