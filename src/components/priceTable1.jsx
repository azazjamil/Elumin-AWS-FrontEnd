import React, { useState, useEffect } from "react";
import { API } from "../service/httpservice";

export const FormDesign2 = ({
  licenseValue,
  setLicenseValue,
  bundleValue,
  setBundleValue,
  setConfigurationValue1,
  setVirtualMonthlyPrice,
  operatingSystemValueT2,
  setOperatingSystemValueT2,
}) => {
  const [licenseOPtions, setLicenseOptions] = useState([]);
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([]);
  const [bundleOPtions, setBundleOptions] = useState([]);
  const [configurationOPtions, setconfigurationOptions] = useState([]);

  async function getData(resource, options) {
    const res = await API.getWorkSpaceOptions(
      resource,
      options,
      "Billed by the month"
    );
    setOperatingSystemOptions(res);
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
    setVirtualMonthlyPrice(price);
  }

  useEffect(() => {
    getData("workSpaceRoutes", "operatingSystem");
  }, []);

  return (
    <div className="col-md-6">
      <div className="section-wrapper">
        <div className="mainHeading">Virtual Desktop - Persistent Monthly</div>
        <div className="select-section">
          <div className="form-group row flex">
            <div className="col-md-3 text">
              <label className="subHeading" for="license">
                Operating System
              </label>
            </div>
            <div className="col-md-9 options">
              <select
                className="form-control"
                id="license"
                name="license"
                onChange={(e) => {
                  getNextData(
                    "workSpaceRoutes",
                    "license",
                    {
                      operatingSystem: e.target.value,
                      groupDescription: "Billed by the month",
                    },
                    setLicenseOptions
                  );
                  setOperatingSystemValueT2(e.target.value);
                }}
              >
                <option>Select Operating System</option>
                {operatingSystemOptions.map((op, key) => {
                  return <option key={key}>{op}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row flex">
            <div className="col-md-3 text">
              <label className="subHeading" for="license">
                License Type
              </label>
            </div>
            <div className="col-md-9 options">
              <select
                className="form-control"
                id="license"
                name="license"
                onChange={(e) => {
                  getNextData(
                    "workSpaceRoutes",
                    "bundleGroup",
                    {
                      license: e.target.value,
                      operatingSystem: operatingSystemValueT2,
                      groupDescription: "Billed by the month",
                    },
                    setBundleOptions
                  );
                  setLicenseValue(e.target.value);
                }}
              >
                <option>Select Operating System</option>
                {licenseOPtions.map((op, key) => {
                  return <option key={key}>{op}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3 text">
              <label className="subHeading" for="bundle">
                Package
              </label>
            </div>
            <div className="col-md-9 options">
              <select
                className="form-control"
                id="bundle"
                name="bundle"
                onChange={(e) => {
                  getNextData(
                    "workSpaceRoutes",
                    ["vcpu", "storage", "memory"],
                    {
                      bundleGroup: e.target.value,
                      license: licenseValue,
                      groupDescription: "Billed by the month",
                      operatingSystem: operatingSystemValueT2,
                    },
                    setconfigurationOptions
                  );
                  setBundleValue(e.target.value);
                }}
              >
                <option>Select Package</option>
                {bundleOPtions.map((op, key) => {
                  return <option key={key}>{op}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3 text">
              <label className="subHeading" for="configuration">
                Configuration
              </label>
            </div>
            <div className="col-md-9 options">
              <select
                className="form-control"
                id="configuration"
                name="configuration"
                onChange={(e) => {
                  getPrice(
                    "workSpaceRoutes",
                    {
                      license: licenseValue,
                      bundleGroup: bundleValue,
                      operatingSystem: operatingSystemValueT2,
                      groupDescription: "Billed by the month",
                    },
                    e.target.value
                  );
                  setConfigurationValue1(e.target.value);
                }}
              >
                <option>Select Configuration</option>
                {configurationOPtions.map((op, key) => {
                  return <option key={key}>{op}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
