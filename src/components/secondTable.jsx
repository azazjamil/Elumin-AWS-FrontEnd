import React, { useEffect } from "react";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoImg from "../images/logo.png";
import { API } from "../service/httpservice";

export const SecondTable = ({
  configurationValue,
  configurationValue1,
  instanceTypeValue,
  instanceLabType,
  virtualHourlyPrice,
  virtualMonthlyPrice,
  virtualApplicationPrice,
  labInstancePrice,
  monthlycost1,
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
  const [firstINput1, setFirstInput1] = useState();
  const [firstINput2, setFirstInput2] = useState();
  const [secondINput1, setsecondInput1] = useState();
  const [thirdINput1, setthirdInput1] = useState();
  const [thirdINput2, setthirdInput2] = useState();
  const [fourINput1, setfourInput1] = useState();
  const [fourINput2, setfourInput2] = useState();
  const [fiveINput1, setfiveInput1] = useState();
  const [sixINput1, setsixInput1] = useState();

  const [price1, setprice1] = useState();
  const [price2, setprice2] = useState();
  const [price3, setprice3] = useState();
  const [price4, setprice4] = useState();
  const [price5, setprice5] = useState();
  const [price6, setprice6] = useState();
  const [hourlycost4, sethourlycost4] = useState(labInstancePrice / 720);

  let totalPrice = 0;

  if (!isNaN(price1)) {
    totalPrice += Number(price1);
  }

  if (!isNaN(price2)) {
    totalPrice += Number(price2);
  }

  if (!isNaN(price3)) {
    totalPrice += Number(price3);
  }

  if (!isNaN(price4)) {
    totalPrice += Number(price4);
  }

  if (!isNaN(price5)) {
    totalPrice += Number(price5);
  }

  if (!isNaN(price6)) {
    totalPrice += Number(price6);
  }
  const tableValue = [
    { Description: "AWS Estimated Usage Fees-Monthly", prices: "" },
    {
      Description: "WorkSpaces",
      prices: isNaN(price2)
        ? "0"
        : `$${price2} ` + (isNaN(Number(price1)) ? "0" : `+ $${price1} `),
    },
    {
      Description: "AppStream 2.0",
      prices: isNaN(price3) ? 0 : `$${price3}`,
    },
    {
      Description: "EC2 (required for Learning Lab / Lab Builder)",
      prices: isNaN(price4) ? 0 : `$${price4}`,
    },
    {
      Description: "Additional Storage",
      prices: isNaN(price6) ? 0 : `$${price6}`,
    },
    {
      Description: "No. of Labs",
      prices: isNaN(price5) ? 0 : `$${price5}`,
    },
    {
      Description: "Total",
      prices: `$${totalPrice.toFixed(2)}`,
    },
  ];
  function downloadPdf(button) {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3, or A4
    const orientation = "portrait"; // portrait or landscape
    const title =
      "                  All fees are estimated based on user population and estimate monthly usage.\n                  All fees on this chart are paid directly to Amazon Web Services. ";
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const headers = [["Description", "Prices"]];
    const data = tableValue.map((elt) => [elt.Description, elt.prices]);

    let content = {
      startY: 125,
      head: headers,
      body: data,
    };

    const logoWidth = 150; // Adjust the width of the logo as needed
    const logoHeight = 50; // Adjust the height of the logo as needed

    doc.addImage(logoImg, "PNG", 320, 10, logoWidth, logoHeight);
    doc.autoTable(content);

    // Get the total width of the page
    const pageWidth = doc.internal.pageSize.getWidth();

    // Set the title properties
    // doc.setFontStyle("italic");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Set text color (black)

    // Calculate the width of the title
    const titleWidth =
      (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    // Calculate the X position to center the title
    const titleX = (pageWidth - titleWidth) / 28;

    // Set the Y position of the title at the bottom of the page
    const titleY = doc.internal.pageSize.getHeight() - 500;

    // Print the title
    doc.text(title, titleX, titleY);

    if (button === "send email") {
      const pdfDataUrl = doc.output("datauristring");
      console.log(email);
      const payload = {
        pdfDataUrl: pdfDataUrl,
        email: email,
      };

      fetch("http://localhost:4000/ec2Routes/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          console.log(response);
          setEmail("");
        })
        .catch((error) => {
          setEmail("");
        });
    } else {
      doc.save("report.pdf");
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeModal();
    downloadPdf("send email");
  };
  function onPriceChange(setOption, value) {
    // setOption(event)
    if (setOption == "input1") {
      setFirstInput1(value);
      const cal = value * Number(monthlycost1);
      const cal2 = value * firstINput2 * Number(virtualHourlyPrice);
      setprice1(cal + cal2);
    } else {
      setFirstInput2(value);
      const cal = firstINput1 * Number(monthlycost1);
      const cal2 = firstINput1 * value * Number(virtualHourlyPrice);
      setprice1(cal + cal2);
    }
  }

  return (
    <div className="col-md-12">
      <div className="section-wrapper">
        <div className="mainHeading">Estimated Monthly Recurring</div>
        <div className="select-section">
          <table className="table table-bordered">
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
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      // setFirstInput1(e.target.value);
                      onPriceChange("input1", e.target.value);
                    }}
                  />
                </td>
                <td>
                  {monthlycost1 ? `$${Number(monthlycost1).toFixed(2)}` : ""}
                </td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      // setFirstInput2(e.target.value);
                      onPriceChange("input2", e.target.value);
                    }}
                  />
                </td>
                <td>
                  {virtualHourlyPrice
                    ? `$${Number(virtualHourlyPrice).toFixed(2)}`
                    : ""}
                </td>

                <td>{isNaN(price1) ? "" : `$${price1.toFixed(2)}`}</td>
              </tr>
              <tr>
                <th>Virtual Desktop - Persistent (Monthly)</th>
                <td>{configurationValue1}</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      setsecondInput1(value);
                      setprice2(
                        (Number(virtualMonthlyPrice) * value).toFixed(2)
                      );
                    }}
                  />
                </td>
                <td>
                  {virtualMonthlyPrice
                    ? `$${Number(virtualMonthlyPrice).toFixed(2)}`
                    : ""}
                </td>
                <td></td>
                <td></td>
                <td>{isNaN(price2) ? "" : `$${price2}`}</td>
              </tr>
              <tr>
                <th>Virtual Desktop - Non Persistent</th>
                <td>{instanceTypeValue}</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const input1Value = parseFloat(e.target.value);
                      setthirdInput1(input1Value);
                      const intermediateResult1 = input1Value * 0.44;
                      const intermediateResult2 =
                        thirdINput2 * virtualApplicationPrice;
                      const finalResult =
                        intermediateResult2 * intermediateResult1;

                      setprice3(finalResult.toFixed(2));
                    }}
                  />
                </td>
                <td>$0.44</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const input2Value = parseFloat(e.target.value);
                      setthirdInput2(input2Value);
                      const intermediateResult1 = thirdINput1 * 0.44;
                      const intermediateResult2 =
                        thirdINput2 * virtualApplicationPrice;
                      const finalResult =
                        intermediateResult2 * intermediateResult1;

                      setprice3(finalResult.toFixed(2));
                    }}
                  />
                </td>
                <td>
                  <td>
                    {virtualApplicationPrice
                      ? `$${virtualApplicationPrice}`
                      : ""}
                  </td>
                </td>
                <td>
                  <td>{isNaN(price3) ? "" : `$${price3}`}</td>
                </td>
              </tr>
              <tr>
                <th>Learning Lab</th>
                <td>{instanceLabType}</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      setfourInput1(value);
                      const total = fourINput2 * value * labInstancePrice;
                      setprice4(total.toFixed(2));
                    }}
                  />
                </td>
                <td>{labInstancePrice ? `$${labInstancePrice}` : ""}</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const value = e.target.value;
                      setfourInput2(value);
                      const total = fourINput1 * value * labInstancePrice;
                      setprice4(total.toFixed(2));
                    }}
                  />
                </td>
                <td>{isNaN(hourlycost4) ? "" : `$${hourlycost4}`}</td>
                <td>{isNaN(price4) ? "" : `$${price4}`}</td>
              </tr>
              <tr>
                <th>No. of Labs</th>
                <td></td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setfiveInput1(value);
                      console.log(value);
                      const total = value * 86.4;
                      setprice5(total.toFixed(2));
                    }}
                  />
                </td>
                <td>$86.40</td>
                <td></td>
                <td></td>
                <td>{isNaN(price5) ? "" : `$${price5}`}</td>
              </tr>
              <tr>
                <th>Additional Storage</th>
                <td>Number of GBs per month</td>
                <td>
                  <input
                    min={0}
                    type="number"
                    className="form-control"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setsixInput1(value);
                      setprice6((value * 0.1).toFixed(2));
                    }}
                  />
                </td>
                <td>$0.10</td>
                <td></td>
                <td></td>
                <td>{isNaN(price6) ? "" : `$${price6}`}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-right">
            <button className=" btn-pdf" onClick={downloadPdf}>
              Download as PDF
            </button>
            <button className=" btn-pdf" onClick={openModal}>
              Send Mail
            </button>
            {isOpen && (
              <div className="modal-email">
                <div className="modal-email-content">
                  <span className="close-email" onClick={closeModal}>
                    &times;
                  </span>
                  <form onSubmit={handleSubmit}>
                    <div className="text-left">
                      <label>Email:</label>
                    </div>
                    <input
                      className="input-group"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <button type="submit" className="btn-pdf">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
