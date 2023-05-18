import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadIcon from "@mui/icons-material/Download";
import DataPage from "../Components/DataPage";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import DeleteIcon from "@mui/icons-material/Delete";
import "./index.css";
import { Card } from "react-bootstrap";

function InVoicePage() {
  const [data, setData] = useState([]);

  const [original, setOriginal] = useState([]);

  const componentRef = useRef();

  // const Download = (row) => {
  //   const htmlContent = ` <Container className="text-center  invoice" ref={componentRef}>
  //   <Container className="d-flex justify-content-around align-items-center w-100 mt-4">
  //     <Container className="mt-5">
  //       <b>Build To :</b>
  //       <br />
  //       MotivityLabs <br />
  //       Knowledge City <br />
  //       Hyd
  //     </Container>
  //     <Container>
  //       <h1 className="fs-4">INVOICE</h1>
  //       <p>InvoiceNo:MT-{InvoiceNumber}</p>
  //       <p>Date : 2023-4-14</p>
  //     </Container>
  //   </Container>

  //   <Container>
  //     <table className="table mt-3">
  //       <thead>
  //         <tr>
  //           <th scope="col">s.no</th>
  //           <th scope="col">Title</th>
  //           <th scope="col">Quantity</th>
  //           <th scope="col">Price</th>
  //           <th scope="col">Tax%</th>
  //           <th scope="col">Discount</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((each, i) => {
  //           return (
  //             <tr key=${i}>
  //               <td>${i + 1}</td>
  //               <td>${row.title}</td>
  //               <td>${row.quantity}</td>
  //               <td>${row.price}</td>
  //               <td>${row.taxrate}%</td>
  //               <td>${row.discount}%</td>
  //             </tr>
  //           );
  //         })}
  //         <tr>
  //           <td colSpan="3"></td>
  //           <td colSpan="2" className="text-end">
  //             <b>Total Price:</b>
  //           </td>
  //           <td>
  //             <b>1200</b>
  //           </td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </Container>
  // </Container>`;
  //   const pdf = new jsPDF();
  //   pdf.html(htmlContent, {
  //     callback: function (pdf) {
  //       pdf.save("download.pdf");
  //     },
  //   });
  // };

  function Download(row) {
    console.log(row, "kkk");
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Title", "Quantity", "Price", "Tax%", "Discount%", "TotalPrice"]],
      body: [
        [
          row.title,
          row.quantity,
          row.price,
          row.taxrate,
          row.discount,
          Calculate(row),
        ],
      ],
    });

    autoTable(doc, <DataPage data={[row]} />);

    doc.save(`${row.title}.pdf`);
  }

  // const Download = () => {
  //   const htmlContent = document.getElementById("yourHtmlContent").innerHTML;
  //   const pdf = new jsPDF();
  //   pdf.html(htmlContent, {
  //     callback: function (pdf) {
  //       pdf.save("download.pdf");
  //     },
  //   });
  // };

  const upPrice = () => {
    let result = data.sort((a, b) => a.price - b.price);
    setData([...result]);
    console.log(result);
  };

  const downPrice = () => {
    let result = data.sort((b, a) => a.price - b.price);
    setData([...result]);
    console.log(result);
  };

  const searchFunction = (e) => {
    let text = e.target.value;

    if (!text) {
      setData(original);
    } else {
      let filtered = original.filter((each) => {
        return each.title.toLowerCase().includes(text.toLowerCase());
      });

      setData(filtered);
    }
  };

  function Calculate(row) {
    let price = row.price * row.quantity;
    let taxrate = row.taxrate;
    let discount = row.discount;
    let taxAmount = price * (taxrate / 100);
    let discountedPrice = price - price * (discount / 100);
    let finalPrice = discountedPrice + taxAmount;
    return finalPrice.toFixed(2);
  }

  useEffect(() => {
    axios("http://localhost:3001/invoice")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setOriginal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function removeInvoice(id) {
    axios
      .delete("http://localhost:3001/invoice/" + id)
      .then((res) => {
        console.log(res.data);
        let filtered = data.filter((each) => {
          return each._id !== id;
        });
        setData(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search By Product Title"
        className="m-4 p-1"
        onChange={searchFunction}
      />
      <ReactToPrint
        trigger={() => (
          <div className="d-flex justify-content-end m-5 mt-0">
            <button type="button" className="btn btn-danger">
              Print
            </button>
          </div>
        )}
        content={() => componentRef.current}
      />
      <TableContainer component={Paper} ref={componentRef}>
        <Table sx={{ margin: 3, maxWidth: 1400 }} aria-label="simple table">
          <TableHead sx={{ color: "blue" }}>
            <TableRow>
              <TableCell align="right">
                <b>S.no</b>
              </TableCell>
              <TableCell align="right">
                <b>Title</b>
              </TableCell>
              <TableCell align="right">
                <b>Quantity</b>
              </TableCell>
              <TableCell align="right">
                Price{" "}
                <ArrowDownwardIcon
                  onClick={downPrice}
                  sx={{ color: "green" }}
                />{" "}
                <ArrowUpwardIcon onClick={upPrice} sx={{ color: "red" }} />
              </TableCell>
              <TableCell align="right">
                <b>Tax%</b>
              </TableCell>
              <TableCell align="right">
                <b>Discount%</b>
              </TableCell>
              <TableCell align="right">
                <b>TotalPrice</b>
              </TableCell>
              <TableCell align="right" className="download">
                <b>Download</b>
              </TableCell>
              <TableCell align="right" className="download">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="Invoice">
            {data.map((row, i) => (
              <TableRow key={i} id={`row-${i}`}>
                <TableCell align="right">{i + 1}</TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="right">{row.taxrate}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right"> ₹{Calculate(row)}</TableCell>
                <TableCell align="right" className="download">
                  <DownloadIcon
                    sx={{ color: "green", marginLeft: 5 }}
                    onClick={() => Download(row)}
                  />
                </TableCell>
                <TableCell align="right" className="delete">
                  <DeleteIcon
                    onClick={() => removeInvoice(row._id)}
                    sx={{ color: "red" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default InVoicePage;
