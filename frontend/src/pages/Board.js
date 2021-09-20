import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import Sectioncard from "../components/Sectioncard";
import sidetask from "../components/Sidetask";
import { Col, Container, Row } from "react-bootstrap";

const Board = () => {
  return (
    <>
      <Navigation />
        <Container fluid>
          <Row>
              <Col md="3">
              <Sidebar />
              </Col>
              <Col md="9">
              <div class="row align-items-end">
                <div class="col-xl-8 col-lg-8">
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

                    <div className="col-5">
                      <h6>Add Section</h6>
                    </div>
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
