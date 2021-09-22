import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import { Col, Container, Row } from "react-bootstrap";
import SectionCard from "../components/SectionCard";

const Board = () => {
  return (
    <>
      <Navigation />
        <Container fluid>
          <Row>
              <Col xxl="3">
              <Sidebar />
              </Col>
              <Col md="9" className="board-container">
                  <div class="section-title mb-60">
                    <h1>Project</h1>
                  </div>
                  <div className="row scrolling-wrapper flex-nowrap">
                    {/* <Sectioncard taskList={["test"]} />
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
                    />  */}
                    <SectionCard/>
                    <div className="col-5">
                      <h6>Add Section</h6>
                    </div>
                  </div>
              </Col>
          </Row>
        </Container>
    </>
  );
};

export default Board;
