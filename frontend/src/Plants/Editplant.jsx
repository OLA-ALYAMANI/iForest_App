import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios';
import URL from '../config/api';

export default class Editplant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            type: '',
            image: '',
            description: ''
        }
    }

    componentDidMount() {
        this.getPlants();
    }

    getPlants() {
        let plantId = this.props.match.params.id;
        Axios.get(`${URL}/api/plant/${plantId}`)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    name: res.data.name,
                    type: res.data.type,
                    image: res.data.imge,
                    description: res.data.description,
                }, () => {
                    console.log(this.state)
                }
                )
            })
            .catch(err => { console.log(err) })
    }

    state = {
        palnt: {},
        setPlant: {},
        setFile: null
    }


    editPlant(newPlant){
        Axios.request({
            method:"put",
            usrl:`${URL}/api/plant/${this.state.id}`,
            data:newPlant
        }).then(res => {
            this.props.history.push('/')
        })
        .catch(err =>{ console.log(err) })
    }
    

    onChangeInput = ({ target: { name, value } }) => {
        this.setPlant({ ...this.plant, [name]: value });

        const newPlant = {
            name: this.name.name.valuem,
            image: this.name.image.value,
            type: this.name.type.value,
            description: this.name.description.value
        }
        this.editPlant(newPlant);
    }


    onChangeHandler = (event) => {
        const setFile = event.target.files[0]
        // setFile(event.target.getAttribute("id"))
    }

    onSubmit = () => {
        const data = new FormData()
        data.append('file', this.state.setFile)
        Axios.put(`${URL}/aip/plant/:id`, data, {
            plant: JSON.stringify(this.plant), headers: {
                "x-auth-token": localStorage.getItem("token"),
            }
        })
            .then(res => {
                console.log(res)
                this.props.history.push("/:id");
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <div>
                <h2 className="text-center">Edit Plants</h2>
                <Form className="mt-5">
                    <Row className="justify-content-center mt-5">
                        <Col md={6}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Plant name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="plant name"
                                    name="name"
                                    onChange={this.onChangeInput}
                                    defaultValue={this.state.name} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col md={2}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Plant Type</Form.Label>
                                <Form.Control as="select" name="type" defaultValue={this.state.type} onChange={this.onChangeInput}>
                                    <option>Flower</option>
                                    <option>Liverworts</option>
                                    <option>Hornworts</option>
                                    <option>Mosses</option>
                                    <option>Ferns</option>
                                    <option>Conifers</option>
                                    <option>Cycads</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Label>Image</Form.Label>
                            <Form.File
                                id="custom-file"
                                label="Upload Image"
                                name="image"
                                onChange={this.onChangeHandler}
                                custom
                                defaultValue={this.state.imag}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" name="description" defaultValue={this.state.description} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={this.onSubmit}>Edit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}