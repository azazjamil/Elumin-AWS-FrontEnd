import React, { useEffect } from "react";
import { useState } from "react";
import { FormDesign1 } from "./priceTable";
import { FormDesign2 } from "./priceTable1";
import { FormDesign3 } from "./priceTable2";
import { FormDesign4 } from "./priceTable3";
import { SecondTable } from "./secondTable";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Table = ({ setUserInfo, userInfo }) => {
  const [licenseValue, setLicenseValue] = useState([]);
  const [operatingSystemValueT1, setOperatingSystemValueT1] = useState([]);
  const [bundleValue, setBundleValue] = useState([]);
  const [licenseValue1, setLicenseValue1] = useState([]);
  const [operatingSystemValueT2, setOperatingSystemValueT2] = useState([]);
  const [bundleValue1, setBundleValue1] = useState([]);
  const [instanceFamilyValue, setinstanceFamilyValue] = useState([]);
  const [instanceTypeValue, setinstanceTypeValue] = useState([]);
  const [operatingSystemValue, setoperatingSystemValue] = useState([]);
  const [instanceLabType, setInstanceLabType] = useState([]);
  const [configurationValue, setConfigurationValue] = useState([]);
  const [configurationValue1, setConfigurationValue1] = useState([]);
  const [virtualHourlyPrice, setVirtualHourlyPrice] = useState();
  const [virtualMonthlyPrice, setVirtualMonthlyPrice] = useState();
  const [virtualApplicationPrice, setVirtualApplicationPrice] = useState();
  const [labInstancePrice, setlabInstancePrice] = useState();
  const [monthlycost1, setmonthlycost1] = useState();

  const logOut = () => {
    googleLogout();
    setUserInfo(null);
    navigate("/login");
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileInfo = async () => {
      const userInfo = window.localStorage.getItem("userInfo");
      // userInfo = JSON.parse(userInfo);
      if (userInfo && userInfo !== "undefined") {
        debugger;
        try {
          const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                Accept: "application/json",
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else navigate("/login");
    };

    fetchProfileInfo();
  }, [userInfo]);
  return (
    <div className="row">
      <FormDesign1
        licenseValue={licenseValue}
        setLicenseValue={setLicenseValue}
        bundleValue={bundleValue}
        setBundleValue={setBundleValue}
        setConfigurationValue={setConfigurationValue}
        setVirtualHourlyPrice={setVirtualHourlyPrice}
        operatingSystemValueT1={operatingSystemValueT1}
        setOperatingSystemValueT1={setOperatingSystemValueT1}
        monthlycost1={monthlycost1}
        setmonthlycost1={setmonthlycost1}
      />
      <FormDesign2
        licenseValue={licenseValue1}
        setLicenseValue={setLicenseValue1}
        operatingSystemValueT2={operatingSystemValueT2}
        setOperatingSystemValueT2={setOperatingSystemValueT2}
        bundleValue={bundleValue1}
        setBundleValue={setBundleValue1}
        setConfigurationValue1={setConfigurationValue1}
        setVirtualMonthlyPrice={setVirtualMonthlyPrice}
      />
      <FormDesign3
        instanceFamilyValue={instanceFamilyValue}
        setinstanceFamilyValue={setinstanceFamilyValue}
        instanceTypeValue={instanceTypeValue}
        setinstanceTypeValue={setinstanceTypeValue}
        setVirtualApplicationPrice={setVirtualApplicationPrice}
      />
      <FormDesign4
        operatingSystemValue={operatingSystemValue}
        setoperatingSystemValue={setoperatingSystemValue}
        setInstanceLabType={setInstanceLabType}
        setlabInstancePrice={setlabInstancePrice}
      />
      <SecondTable
        monthlycost1={monthlycost1}
        setmonthlycost1={setmonthlycost1}
        configurationValue={configurationValue}
        configurationValue1={configurationValue1}
        instanceTypeValue={instanceTypeValue}
        operatingSystemValue={operatingSystemValue}
        instanceLabType={instanceLabType}
        virtualHourlyPrice={virtualHourlyPrice}
        virtualMonthlyPrice={virtualMonthlyPrice}
        virtualApplicationPrice={virtualApplicationPrice}
        labInstancePrice={labInstancePrice}
      />
      <div className="text-right">
        <button className=" btn-pdf" onClick={logOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};
