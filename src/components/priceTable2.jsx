import React, { useState, useEffect } from "react";
import { API } from "../service/httpservice";

export const FormDesign3 = ({
  setinstanceFamilyValue,
  instanceFamilyValue,
  setinstanceTypeValue,
  instanceTypeValue,
  setVirtualApplicationPrice,
}) => {
  const [instanceFamilyOptions, setinstanceFamilyOptions] = useState([]);

  const [instanceTypeOptions, setinstanceTypeOptions] = useState([]);
  const [sizeOPtions, setSizeOptions] = useState([]);

  async function getData(resource, options) {
    const res = await API.getOptions(resource, options);
    setinstanceFamilyOptions(res);
  }

  async function getNextData(resource, options, value, setOptions) {
    const res = await API.getNextOptions(resource, options, value);
    setOptions(res);
  }

  async function getPrice(resource, value, value1) {
    const keyValuePairs = value1.split(", ").reduce((obj, part) => {
      const [key, value] = part.split(": ");
      obj[key] = value;
      return obj;
    }, {});
    const mergedObject = { ...value, ...keyValuePairs };
    const res = await API.getSku(resource, mergedObject);
    let price = await API.getPrice(res);
    price = parseFloat(price);
    price = parseFloat(price.toFixed(3));
    setVirtualApplicationPrice(price);
  }

  useEffect(() => {
    getData("appStreamRoutes", "instanceFamily");
  }, []);

  return (
    <div className="col-md-6">
      <div className="section-wrapper">
        <div className="mainHeading">Virtual Application - Non Persistent</div>
        <div className="select-section">
          <div className="form-group row flex">
            <div className="col-md-3 text">
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
                    "appStreamRoutes",
                    "instanceType",
                    { instanceFamily: e.target.value },
                    setinstanceTypeOptions
                  );
                  setinstanceFamilyValue(e.target.value);
                }}
              >
                <option>Select Type</option>
                {instanceFamilyOptions.map((op, key) => {
                  if (op !== null) {
                    return <option key={key}>{op}</option>;
                  }
                  return;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3 text">
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
                  getNextData(
                    "appStreamRoutes",
                    ["vcpu", "memoryGib"],
                    {
                      instanceFamily: instanceFamilyValue,
                      instanceType: e.target.value,
                    },
                    setSizeOptions
                  );
                  setinstanceTypeValue(e.target.value);
                }}
              >
                <option>Select Instance</option>
                {instanceTypeOptions.map((op, key) => {
                  if (op !== null) {
                    return <option key={key}>{op}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3 text">
              <label className="subHeading" for="configuration">
                Size
              </label>
            </div>
            <div className="col-md-9 options">
              <select
                className="form-control"
                id="configuration"
                name="configuration"
                onChange={(e) => {
                  getPrice(
                    "appStreamRoutes",
                    {
                      instanceFamily: instanceFamilyValue,
                      instanceType: instanceTypeValue,
                    },
                    e.target.value
                  );
                }}
              >
                <option>Select Size</option>
                {sizeOPtions.map((op, key) => {
                  if (op !== null) {
                    return <option key={key}>{op}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
