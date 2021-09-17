import React, { useState } from 'react'
import {Form, FormControl, Dropdown,DropdownButton,Modal,Button} from 'react-bootstrap'
 



const Addmember = ({showModal,hideModal}) => {

    return (
        <>




      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <div className="col">
                <div className="d-flex">
                    <div class="d-flex flex-column mb-3 mx-1 flex-fill">
                        <label for="formGroupExampleInput" class="form-label">Add to Team</label>
                        
                        <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Form.Control>
                     
                        

                    </div>
                
                    <div class="d-flex flex-column mb-3 mx-1 flex-fill">
                        <label for="formGroupExampleInput" class="form-label">Add to Project</label>
                        
                        <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Form.Control>
                     
                    </div>




                </div>
                
                <label for="floatingTextarea2">Emails</label>

                <textarea class="form-control" placeholder="add emails here" id="floatingTextarea2" style={{height: "100px"}}>
                </textarea>

              
            </div>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={hideModal}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
        </>
    )
}


export default Addmember
