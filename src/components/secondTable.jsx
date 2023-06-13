import React, { useEffect } from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImg from "../images/eLumin-white.png";

export const SecondTable = ({
  configurationValue,
  configurationValue1,
  instanceTypeValue,
  instanceLabType,
  virtualHourlyPrice,
  virtualMonthlyPrice,
  virtualApplicationPrice,
  labInstancePrice,
}) => {
  const headArray = [
    "",
    "Configuration",
    "Users",
    "Monthly Cost",
    "Hourly Usage",
    "Hourly Cost",
    "Cost",
  ];

  const [firstINput1, setFirstInput1] = useState(1);
  const [firstINput2, setFirstInput2] = useState(1);
  const [secondINput1, setsecondInput1] = useState(1);
  const [secondINput2, setSecondInput2] = useState(1);
  const [thirdINput1, setthirdInput1] = useState(1);
  const [thirdINput2, setthirdInput2] = useState(1);
  const [fourINput1, setfourInput1] = useState(1);
  const [fourINput2, setfourInput2] = useState(1);
  const [price1, setprice1] = useState();
  const [price2, setprice2] = useState();
  const [price3, setprice3] = useState();
  const [price4, setprice4] = useState();
  const [hourlycost1, sethourlycost1] = useState(virtualHourlyPrice / 720);
  const [hourlycost2, sethourlycost2] = useState(virtualMonthlyPrice / 720);
  const [hourlycost3, sethourlycost3] = useState(virtualApplicationPrice / 720);
  const [hourlycost4, sethourlycost4] = useState(labInstancePrice / 720);

  const [tableValue] = useState([
    { Description: "AWS Estimated Usage Fees-Monthly", prices: "" },
    { Description: "WorkSpaces", prices: price1 },
    { Description: "AppStream 2.0", prices: price2 },
    {
      Description: "EC2 (required for Learning Lab / Lab Builder)",
      prices: price3,
    },
    {
      Description: "Supporting Infrastructure (VPN, etc)",
      prices: price4,
    },
    { Description: "Total", prices: price1 + price2 + price3 + price4 },
  ]);

  function downloadPdf() {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "";
    const headers = [["Description", "Prices"]];

    const data = tableValue.map((elt) => [elt.Description, elt.prices]);

    let content = {
      startY: 125,
      head: headers,
      body: data,
    };

    const logoWidth = 100; // Adjust the width of the logo as needed
    const logoHeight = 100; // Adjust the height of the logo as needed
    doc.addImage(logoImg, "PNG", 300, 10, logoWidth, logoHeight);

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  }

  return (
    <div className="container main">
      <div className="mainHeading">Estimated Monthly Recurring</div>
      <div className="select-section">
        <table>
          <thead>
            <tr>
              {headArray.map((x, key) => (
                <th key={key}>{x}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Virtual Desktop - Persistent</th>
              <td>{configurationValue}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setFirstInput1(e.target.value);
                    setprice1(
                      (hourlycost1 * firstINput1 + virtualHourlyPrice) *
                        firstINput2
                    );
                  }}
                />
              </td>
              <td>{virtualHourlyPrice}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setFirstInput2(e.target.value);
                    setprice1(
                      (hourlycost1 * firstINput1 + virtualHourlyPrice) *
                        firstINput2
                    );
                  }}
                />
              </td>
              <td>{Math.round(hourlycost1 * 1000) / 1000}</td>

              <td>{Math.round(price1 * 1000) / 1000}</td>
            </tr>
            <tr>
              <th>Virtual Desktop - Persistent (Monthly)</th>
              <td>{configurationValue1}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setsecondInput1(e.target.value);
                    setprice2(
                      (hourlycost2 * secondINput1 + virtualMonthlyPrice) *
                        secondINput2
                    );
                  }}
                />
              </td>
              <td>{virtualMonthlyPrice}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setSecondInput2(e.target.value);
                    setprice2(
                      (hourlycost2 * secondINput1 + virtualMonthlyPrice) *
                        secondINput2
                    );
                  }}
                />
              </td>
              <td>{Math.round(hourlycost2 * 1000) / 1000}</td>
              <td>{Math.round(price2 * 1000) / 1000}</td>
            </tr>
            <tr>
              <th>Virtual Desktop - Non Persistent</th>
              <td>{instanceTypeValue}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setthirdInput1(e.target.value);
                    setprice3(
                      (hourlycost3 * thirdINput1 + virtualApplicationPrice) *
                        thirdINput2
                    );
                  }}
                />
              </td>
              <td>{virtualApplicationPrice}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setthirdInput2(e.target.value);
                    setprice3(
                      (hourlycost3 * thirdINput1 + virtualApplicationPrice) *
                        thirdINput2
                    );
                  }}
                />
              </td>
              <td>{Math.round(hourlycost3 * 1000) / 1000}</td>
              <td>{Math.round(price3 * 1000) / 1000}</td>
            </tr>
            <tr>
              <th>Learning Lab</th>
              <td>{instanceLabType}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setfourInput1(e.target.value);
                    setprice4(
                      (hourlycost4 * fourINput1 + labInstancePrice) * fourINput2
                    );
                  }}
                />
              </td>
              <td>{labInstancePrice}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setfourInput2(e.target.value);
                    setprice4(
                      (hourlycost4 * fourINput1 + labInstancePrice) * fourINput2
                    );
                  }}
                />
              </td>
              <td>{Math.round(hourlycost4 * 1000) / 1000}</td>
              <td>{Math.round(price4 * 1000) / 1000}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right">
          <button className=" btn-pdf" onClick={downloadPdf}>
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};
