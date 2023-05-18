import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./index.css";

function Dummy() {
  const [count, setCount] = useState(1);
  // const [inputdata, setInputData] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      price: "",
      quantity: "",
      taxrate: "",
      discount: "",
    },

    onSubmit: (values) => {
      console.log([values]);

      axios
        .post("http://localhost:3001/invoice", values)
        .then((res) => {
          console.log([res.data]);
          // setInputData([res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
      setShowInvoice(true);
      console.log(showInvoice);
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "must have 2 characters")
        .max(25, "must be lessthan 10 characters")
        .required("*title required"),

      price: Yup.number()
        .min(1, "price must be graterthan 1")
        .required("*Price Required"),

      quantity: Yup.number().min(1, "quantity atleas 1"),

      brand: Yup.string()
        .min(2, "brand name must have 2 characters")
        .max(9, "brand name must have less than 9 characters")
        .required("mention Brand "),

      taxrate: Yup.number()
        .min(1, "TAX % must be graterthan 1")
        .max(30, "max TAX % should be 30")
        .required("*mention TAX %"),
      discount: Yup.number().max(30, "only max of 30% discount available"),
    }),
  });

  return (
    <>
      <a
        className="d-flex justify-content-end m-5"
        onClick={() => setCount(count + 1)}
      >
        +AddNew
      </a>
      <Container className="mt-4 w-50  h-75 m-auto">
        <Row>
          <Form onSubmit={formik.handleSubmit}>
            {[...Array(count)].map((each, i) => {
              return (
                <Col md={3} lg={4} key={i}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name={`title${i}`}
                      placeholder="Enter Product Title"
                      onChange={formik.handleChange}
                      value={formik.values[`title${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`title${i}`] &&
                      formik.errors[`title${i}`] ? (
                        <p>{formik.errors[`title${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="price"
                      onChange={formik.handleChange}
                      name={`price${i}`}
                      value={formik.values[`price${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`price${i}`] &&
                      formik.errors[`price${i}`] ? (
                        <p>{formik.errors[`price${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name={`quantity${i}`}
                      placeholder="Enter Quantity"
                      onChange={formik.handleChange}
                      value={formik.values[`quantity${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`quantity${i}`] &&
                      formik.errors[`quantity${i}`] ? (
                        <p>{formik.errors[`quantity${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      name={`brand${i}`}
                      placeholder="Enter Product Title"
                      onChange={formik.handleChange}
                      value={formik.values[`brand${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`brand${i}`] &&
                      formik.errors[`brand${i}`] ? (
                        <p>{formik.errors[`brand${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tax %</Form.Label>
                    <Form.Control
                      type="number"
                      name={`taxrate${i}`}
                      placeholder="Enter Tax %"
                      onChange={formik.handleChange}
                      value={formik.values[`taxrate${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`taxrate${i}`] &&
                      formik.errors[`taxrate${i}`] ? (
                        <p>{formik.errors[`taxrate${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Discount %</Form.Label>
                    <Form.Control
                      type="number"
                      name={`discount${i}`}
                      placeholder="Enter discount %"
                      onChange={formik.handleChange}
                      value={formik.values[`discount${i}`]}
                    />
                    <Form.Text className="text-danger">
                      {formik.touched[`taxrate${i}`] &&
                      formik.errors[`taxrate${i}`] ? (
                        <p>{formik.errors[`taxrate${i}`]}</p>
                      ) : (
                        ""
                      )}
                    </Form.Text>
                  </Form.Group>
                </Col>
              );
            })}
            <Button variant="primary" type="submit">
              Generate Invoice
            </Button>{" "}
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default Dummy;
