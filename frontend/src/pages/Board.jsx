import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import Sectioncard from "../components/Sectioncard";
import { Col, Container, Row } from "react-bootstrap";

const Board = () => {
  return (
    <>
      <Navigation />
        <Container fluid>
          <Row>
              <Col xxl="3">
              <Sidebar />
              </Col>
              <Col md="9">
                  <div class="section-title mb-60">
                    <h1>Project</h1>
                  </div>
                  <div className="row scrolling-wrapper flex-nowrap">
                    <Sectioncard taskList={["test"]} />
                    <Sectioncard
                      taskList={[
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                      ]}
                    />
                    <Sectioncard
                      taskList={[
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                      ]}
                    />
                    <Sectioncard
                      taskList={[
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                        "test",
                      ]}
                    />

                    <div className="col-5">
                        <div className="d-flex flex-row align-items-center">
                            <button class="btn" type="button">
                                <i class="bi bi-plus"></i>
                            </button>
                            <h6>Add Section</h6>
                        </div>
                      
                    </div>
                  </div>
              </Col>
          </Row>
        </Container>
    </>
  );
};

export default Board;
