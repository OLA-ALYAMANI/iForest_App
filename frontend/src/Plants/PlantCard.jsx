import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import URL from "../config/api";
import axios from "axios";

const PlantCard = ({ Plants, Flag }) => {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setModalInfo({});
    }, 200);
  };
  function handleShow(plant) {
    setShow(true);
    setModalInfo(plant);
  }

  //Delete
  const handleDelete = async (id) => {
    let data = await axios.delete(`${URL}/api/plant/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      }
    });
    console.log("data", data);
    Plants.splice(Plants.findByIndex(id), 1)
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.name}</Modal.Title>
        </Modal.Header>
        <img src={`${URL}/${modalInfo.image}`}></img>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>

      {Plants.length > 1 ? (
        Plants.map((plant, i) => {
          return (
            <Col md={3} className="m-6" key={i}>
              <Card
                className={"mt-3 card promoting-card"}
              >
                <Card.Img
                  style={{ height: 250, width: "100%" }}
                  variant="top"
                  src={`${URL}/${plant.image}`}
                />
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <Card.Text>{plant.sunTime}</Card.Text>
                  <Card.Text>{plant.description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem> </ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  {!Flag ? (<Button
                    className="b-show mt-3 justify-content-center"
                    variant="outline-primary"
                    block
                    onClick={() => handleShow(plant)}>
                    Show
                 </Button>) : (<Row className="justify-content-center">
                      <Button
                        className="b-show m-2"
                        variant="outline-primary"
                      >
                        Edit
                    </Button>
                      <Button
                        className="bn-primary m-2"
                        variant="primary"
                        onClick={() => handleDelete(plant._id)}
                      >
                        Delete
                    </Button>
                    </Row>)

                  }
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
          <Spinner />
        )}
    </>
  );
};

export default PlantCard;
