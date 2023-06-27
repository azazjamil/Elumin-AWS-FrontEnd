import React, { useState, useEffect } from "react";
import { API } from "../service/httpservice";

export const FormDesign1 = ({
  licenseValue,
  setLicenseValue,
  bundleValue,
  setBundleValue,
  setConfigurationValue,
  setVirtualHourlyPrice,
  operatingSystemValueT1,
  setOperatingSystemValueT1,
  setmonthlycost1,
}) => {
  const [licenseOPtions, setLicenseOptions] = useState([]);
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([]);
  const [bundleOPtions, setBundleOptions] = useState([]);
  const [configurationOPtions, setconfigurationOptions] = useState([]);

  async function getData(resource, options) {
    const res = await API.getWorkSpaceOptions(resource, options, "AutoStop");
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
    // let price = await API.getPrice(res);
    // price = parseFloat(price);
    // console.log(price);
    // price = parseFloat(price.toFixed(3));
    console.log(res);
    if (res.price >= res.price1) {
      setmonthlycost1(res.price);
      setVirtualHourlyPrice(res.price1);
    }
    if (res.price <= res.price1) {
      setmonthlycost1(res.price1);
      setVirtualHourlyPrice(res.price);
    }
  }

  useEffect(() => {
    getData("workSpaceRoutes", "operatingSystem");
  }, []);

  return (
    <div className="col-md-6">
      <div className="section-wrapper">
        <div className="mainHeading">Virtual Desktop - Persistent Hourly</div>
        <div className="select-section">
          <div className="form-group row">
            <div className="col-md-3 text">
              <label className="subHeading">Operating System</label>
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
                      operatingSystem:
                        e.target.value == "Workspaces Core"
                          ? "Any"
                          : e.target.value,
                      group: "Usage",
                    },
                    setLicenseOptions
                  );
                  setOperatingSystemValueT1(
                    e.target.value == "Workspaces Core" ? "Any" : e.target.value
                  );
                }}
              >
                <option>Select Operating System</option>
                {operatingSystemOptions.map((op, key) => {
                  if (op !== null && op !== "Windows Server 2019") {
                    if (op === "Any") {
                      return <option key={key}>Workspaces Core</option>;
                    }
                    return <option key={key}>{op}</option>;
                  }
                  return null;
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-3 text">
              <label className="subHeading">License Type</label>
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
                      operatingSystem: operatingSystemValueT1,
                    },
                    setBundleOptions
                  );
                  setLicenseValue(e.target.value);
                }}
              >
                <option>Select License Type</option>
                {licenseOPtions.map((op, key) => {
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
              <label className="subHeading">Package</label>
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
                      runningMode: "AutoStop",
                      operatingSystem: operatingSystemValueT1,
                      group: "Usage",
                    },
                    setconfigurationOptions
                  );
                  setBundleValue(e.target.value);
                }}
              >
                <option>Select Package</option>
                {bundleOPtions.map((op, key) => {
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
              <label className="subHeading">Configuration</label>
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
                      operatingSystem: operatingSystemValueT1,
                      group: "Usage",
                      runningMode: "AutoStop",
                    },
                    e.target.value
                  );
                  setConfigurationValue(e.target.value);
                }}
              >
                <option>Select Configuration</option>
                {configurationOPtions.map((op, key) => {
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
