import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import Sectioncard from "../components/Sectioncard";

const Board = () => {
  return (
    <>
      <Navigation />

      <section className="blog-section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-8">
              <div class="row">
              
                  <div class="section-title">
                    <h1>ProjectName</h1>
                  </div>
                  <div className="row scrolling-wrapper flex-nowrap">
                 
                                <Sectioncard taskList={["test"]}/>
                                <Sectioncard taskList={["test","test","test","test","test","test","test"]}/>

                    <div className="col-5">
                        <div className="d-flex flex-row align-items-center">
                            <button class="btn" type="button">
                                <i class="bi bi-plus"></i>
                            </button>
                            <h6>Add Section</h6>
                        </div>
                      
                    </div>
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
