import React, { useState, useEffect } from "react";
import { API } from "../service/httpservice";

export const FormDesign2 = () => {
  const [licenseOPtions, setLicenseOptions] = useState([]);
  const [licenseValue, setLicenseValue] = useState([]);
  const [bundleOPtions, setBundleOptions] = useState([]);
  const [bundleValue, setBundleValue] = useState([]);
  const [configurationOPtions, setconfigurationOptions] = useState([]);
  async function getData(resource, options) {
    const res = await API.getOptions(resource, options);
    setLicenseOptions(res);
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
    console.log(res);
  }

  useEffect(() => {
    getData("workSpaceRoutes", "license");
  }, []);

  useEffect(() => {
    getData("workSpaceRoutes", "license");
  }, []);

  return (
    <div className="container">
      <div className="mainHeading">Virtual Desktop - Persistent Hourly</div>
      <div className="form-group row flex">
        <div className="col-md-3">
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
                },
                setBundleOptions
              );
              setLicenseValue(e.target.value);
            }}
          >
            <option>Select License Type</option>
            {licenseOPtions.map((op, key) => {
              return <option key={key}>{op}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="form-group row flex-nowrap">
        <div className="col-md-3">
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
      <div className="form-group row flex-nowrap">
        <div className="col-md-3">
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
                },
                e.target.value
              );
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
  );
};
