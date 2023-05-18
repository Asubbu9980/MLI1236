import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Card } from "react-bootstrap";

import DataPage from "../../Components/DataPage";
import "./index.css";

function Home() {
  const [inputdata, setInputData] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      price: "",
      quantity: 1,
      taxrate: "",
      discount: "",
    },

    onSubmit: (values) => {
      setInputData([values]);

      axios
        .post("http://localhost:3001/invoice", values)
        .then((res) => {
          console.log([res.data]);
          setInputData([res.data]);
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
      {!showInvoice ? (
        <Container className="mt-5 w-50 m-auto">
          <Row>
            <Col>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Title</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Product Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.title && formik.errors.title ? (
                      <p>{formik.errors.title}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <b>Price</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="price"
                    onChange={formik.handleChange}
                    name="price"
                    value={formik.values.price}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.price && formik.errors.price ? (
                      <p>{formik.errors.price}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    {" "}
                    <b>Quantity</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    onChange={formik.handleChange}
                    name="quantity"
                    value={formik.values.quantity}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <p>{formik.errors.quantity}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Brand</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    placeholder="Enter brand"
                    onChange={formik.handleChange}
                    value={formik.values.brand}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.brand && formik.errors.brand ? (
                      <p>{formik.errors.brand}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Tax %</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="taxrate"
                    placeholder="Enter Tax %"
                    onChange={formik.handleChange}
                    value={formik.values.taxrate}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.taxrate && formik.errors.taxrate ? (
                      <p>{formik.errors.taxrate}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <b>Discount</b> %
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    placeholder="Enter discount %"
                    onChange={formik.handleChange}
                    value={formik.values.discount}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.discount && formik.errors.discount ? (
                      <p>{formik.errors.discount}</p>
                    ) : (
                      ""
                    )}
                  </Form.Text>
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Generate Invoice
                </Button>{" "}
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <DataPage data={inputdata} />
      )}
    </>
  );
}

export default Home;
