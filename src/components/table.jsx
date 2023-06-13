import React from "react";
import { useState } from "react";
import { FormDesign1 } from "./priceTable";
import { FormDesign2 } from "./priceTable1";
import { FormDesign3 } from "./priceTable2";
import { FormDesign4 } from "./priceTable3";
import { SecondTable } from "./secondTable";
export const Table = () => {
  const [licenseValue, setLicenseValue] = useState([]);
  const [bundleValue, setBundleValue] = useState([]);
  const [licenseValue1, setLicenseValue1] = useState([]);
  const [bundleValue1, setBundleValue1] = useState([]);
  const [instanceFamilyValue, setinstanceFamilyValue] = useState([]);
  const [instanceTypeValue, setinstanceTypeValue] = useState([]);
  const [operatingSystemValue, setoperatingSystemValue] = useState([]);
  const [instanceLabType, setInstanceLabType] = useState([]);
  const [configurationValue, setConfigurationValue] = useState([]);
  const [configurationValue1, setConfigurationValue1] = useState([]);
  const [virtualHourlyPrice, setVirtualHourlyPrice] = useState(1);
  const [virtualMonthlyPrice, setVirtualMonthlyPrice] = useState(1);
  const [virtualApplicationPrice, setVirtualApplicationPrice] = useState(1);
  const [labInstancePrice, setlabInstancePrice] = useState(1);

  return (
    <div>
      <FormDesign1
        licenseValue={licenseValue}
        setLicenseValue={setLicenseValue}
        bundleValue={bundleValue}
        setBundleValue={setBundleValue}
        setConfigurationValue={setConfigurationValue}
        setVirtualHourlyPrice={setVirtualHourlyPrice}
      />
      <FormDesign2
        licenseValue={licenseValue1}
        setLicenseValue={setLicenseValue1}
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
    </div>
  );
};
