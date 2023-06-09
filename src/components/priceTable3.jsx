import React, { useState, useEffect } from "react";
import { API } from "../service/httpservice";

export const FormDesign4 = () => {
  const [operatingSystemOptions, setoperatingSystemOptions] = useState([]);
  const [operatingSystemValue, setoperatingSystemValue] = useState([]);
  const [instanceTypeOptions, setinstanceTypeOptions] = useState([
    "Select Size",
  ]);

  async function getData(resource, options) {
    const res = await API.getOptions(resource, options);
    setoperatingSystemOptions(res);
  }

  async function getNextData(resource, options, value, setOptions) {
    const res = await API.getNextOptions(resource, options, value);
    setOptions(res);
  }

  async function getPrice(resource, value) {
    const res = await API.getSku(resource, value);
    console.log(res);
  }
  useEffect(() => {
    getData("ec2Routes", "operatingSystem");
  }, []);

  return (
    <div className="container">
      <div className="mainHeading">Learing Lab Instance</div>
      <div className="form-group row flex">
        <div className="col-md-3">
          <label className="subHeading" for="license">
            Type
          </label>
        </div>
        <div className="col-md-9 options">
          <select
            className="form-control"
            id="license"
            name="license"
            onChange={(e) => {
              getNextData(
                "ec2Routes",
                "instanceType",
                { operatingSystem: e.target.value },
                setinstanceTypeOptions
              );
              setoperatingSystemValue(e.target.value);
            }}
          >
            <option>Select Type</option>
            {operatingSystemOptions.map((op, key) => {
              return <option key={key}>{op}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="form-group row flex-nowrap">
        <div className="col-md-3">
          <label className="subHeading" for="bundle">
            Instance
          </label>
        </div>
        <div className="col-md-9 options">
          <select
            className="form-control"
            id="bundle"
            name="bundle"
            onChange={(e) => {
              getPrice("ec2Routes", {
                operatingSystem: operatingSystemValue,
                instanceType: e.target.value,
              });
            }}
          >
            <option>Select Instance</option>
            {instanceTypeOptions.map((op, key) => {
              return <option key={key}>{op}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
