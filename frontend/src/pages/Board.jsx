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
                  <div className="d-flex scrolling-wrapper-x flex-nowrap">
                    <SectionCard/>
                    <SectionCard/>
                    <SectionCard/>
                    <SectionCard/>
                    <div className="">
                        <div className="btn d-flex align-items-center border rounded-pill px-5 py-2 text-nowrap">
                            <i class="lni lni-plus"></i>
                            <h5>Add Section</h5>
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
