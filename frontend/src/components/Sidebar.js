import Profilecard from './Profilecard'
import Teamcard from './Teamcard'

const Sidebar = () => {
    return (      
           <div class="sidebar-wrapper" style={{minWidth:"300px"}} > 
                   <Profilecard/>
                   <Teamcard/>             
            </div>     
    )
}
export default Sidebar
