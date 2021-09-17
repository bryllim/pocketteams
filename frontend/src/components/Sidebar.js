import Profilecard from './Profilecard'
import Teamcard from './Teamcard'

const Sidebar = () => {
    return (      
           <div class="d-flex flex-column align-items-center" style={{maxWidth:"300px"}}> 
                   <Profilecard/>
                   <Teamcard/>
                   <button type="button" class="mt-3 theme-btn theme-btn-nav mt-1 btn btn-primary">Create New Team</button>                
            </div>     
    )
}
export default Sidebar
