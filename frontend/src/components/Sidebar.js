import Profilecard from './Profilecard'
import Teamcard from './Teamcard'

const Sidebar = () => {
    return (      
           <div class="sidebar-wrapper"> 
                   <Profilecard/>
                   <Teamcard/>   
                   <div class="sidebar-box recent-blog-box mb-30">
                        <h5>My Notes</h5>
                        <textarea cols="40" rows="15"></textarea>
                     </div>          
            </div>     
    )
}
export default Sidebar
