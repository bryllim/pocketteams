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
            <div className="col-md-8">
              <div class="row align-items-end">
                <div class="col-xl-8 col-lg-8">
                  <div class="section-title mb-60">
                    <h1>Project</h1>
                  </div>
                  <div className="row scrolling-wrapper flex-nowrap">
                    <Sectioncard />
                    <Sectioncard />
                    <Sectioncard />
                    <Sectioncard />
                    <Sectioncard />
                    <Sectioncard />
                    <div className="col-5">
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
