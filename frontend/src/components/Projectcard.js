import React,{useCallback} from 'react'
import PopMenu from './PopMenu'
import { useHistory ,} from 'react-router-dom';

const Projectcard = () => {

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/board'), [history]);

    return (


      
        
        <div class="d-flex flex-column p-3 basecard bg-light" style={{minWidth:"200px",height:"200px"}}>

            <div className="d-flex justify-content-between">               
                <img src="https://via.placeholder.com/150" alt="" className="rounded"  style={{height:"50px", width:"50px"}}/>
                                 
                <button type="button" class="d-flex btn m-0 p-0 ">
                            <PopMenu  menuOptions={["Edit","Remove"]} />
                </button>    
            </div>

            <div className="d-flex flex-column flex-fill justify-content-between">

                <div className="d-flex flex-column">
                    <h6>Title</h6>
                    <p className='ps-3'> Contedsa here    </p>
                </div>

                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                        <p>Date</p>
                        <p onClick={handleOnClick}> Open project <i class="bi bi-chevron-right"></i> </p>
                    </div>
                </div>  

            </div>
            

        
            

        </div>
        
    )
}

export default Projectcard
