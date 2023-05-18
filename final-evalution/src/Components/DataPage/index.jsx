import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import "./index.css";

function DataPage(props) {
  const componentRef = useRef();
  const navigatesTo = useNavigate();
  const { data } = props;
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [InvoiceNumber, setInvoiceNumber] = useState("");

  useEffect(() => {
    let x = new Date().toISOString().split("T")[0];
    setDate(x);

    setInvoiceNumber(Math.floor(Math.random() * 1000000));
    //  console.log(InvoiceNumber ,"invoice")

    let finalPrice = 0;
    data.forEach((each) => {
      const price = each.price;
      const taxRate = each.taxrate;
      const discount = each.discount;
      const quantity = each.quantity;

      const priceWithTax = price + (price * taxRate) / 100;
      const priceWithDiscount = priceWithTax - (priceWithTax * discount) / 100;
      finalPrice = finalPrice + priceWithDiscount * quantity;
      finalPrice = finalPrice.toFixed(2);
    });

    setTotalPrice(finalPrice);
  }, [data]);

  return (
    <>
      <Container className="text-center invoice h-50 mt-5" ref={componentRef}>
        <Container className="d-flex justify-content-around align-items-center w-100 mt-4">
          <Container className="mt-5">
            <b>Build To :</b>
            <br />
            MotivityLabs <br />
            Knowledge City <br />
            Hyderabad.
          </Container>
          <Container className="mt-5">
            <h1 className="fs-4">INVOICE</h1>
            <p>
              InvoiceNo:ML-{InvoiceNumber}
              <br />
              Date : {date}
            </p>
          </Container>
        </Container>

        <Container>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">s.no</th>
                <th scope="col">Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Tax%</th>
                <th scope="col">Discount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((each, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{each.title}</td>
                    <td>{each.quantity}</td>
                    <td>{each.price}</td>
                    <td>{each.taxrate}%</td>
                    <td>{each.discount}%</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="3"></td>
                <td colSpan="2" className="text-end">
                  <b>Total Price:</b>
                </td>
                <td>
                  <b>{totalPrice}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Container>
      <ReactToPrint
        trigger={() => (
          <Container className="d-flex justify-content-end m-4">
            <button type="button" className="btn btn-danger">
              Print
            </button>
          </Container>
        )}
        content={() => componentRef.current}
      />
      <Container className="d-flex justify-content-end m-4">
        <Button onClick={() => navigatesTo("invoice")}>
          View All Invoices
        </Button>
      </Container>
    </>
  );
}

export default DataPage;
