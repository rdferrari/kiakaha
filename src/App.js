import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { data } from "./data";
import { dhbs } from "./dhbs";

import "./App.css";

const App = () => {
  const [dhbsNames, setDhbsNames] = useState([]);
  const [dhbsLongitudes, setDhbsLongitudes] = useState([]);
  const [dhbsLatitudes, setDhbsLatitudes] = useState([]);
  const [totalDhbCases, setTotalDhbCases] = useState([]);
  const [dhbsNamesTotal, setDhbsNamesTotal] = useState([]);
  const [dataDhbs, setDataDhbs] = useState([]);
  const [dateDhbs, setDateDhbs] = useState([]);
  const [dateTotalCases, setDateTotalCases] = useState([]);
  const [totalNZCases, setTotalNZCases] = useState([]);

  useEffect(() => {
    getData();
    getTotalDhbCases();
    totalCasesPerData();
  }, []);

  const getData = () => {
    setDhbsNames(dhbs.map(item => item.name));
    setDhbsLongitudes(dhbs.map(item => item.long));
    setDhbsLatitudes(dhbs.map(item => item.lat));
    setDataDhbs(data.map(item => item.DHB));
    setDateDhbs(data.map(item => item.Report_Date));
    setTotalNZCases(data.length);
  };

  const getTotalDhbCases = () => {
    const dhbsNames = dhbs.map(item => item.name);

    let totalDhbCasesArray = [];
    let dhbsNamesTotalArray = [];

    for (let i = 0; i < dhbsNames.length; i++) {
      let total = data.filter(item => item.DHB === dhbsNames[i]);
      if (total.length === null) {
        totalDhbCasesArray.push(0);
        dhbsNamesTotalArray.push(`${dhbsNames[i]}: 0 cases`);
      }

      totalDhbCasesArray.push(total.length);
      dhbsNamesTotalArray.push(`${dhbsNames[i]}: ${total.length} cases`);
    }
    setTotalDhbCases(totalDhbCasesArray);
    setDhbsNamesTotal(dhbsNamesTotalArray);
  };

  const totalCasesPerData = () => {
    const dateList = data.map(item => item.Report_Date);
    console.log(dateList);
    let count = 1;
    const dateTotalCasesArray = [];
    const dateArray = [];
    for (let i = 0; i < dateList.length; i++) {
      if (dateList[i] === dateList[i + 1]) {
        count = count + 1;
      }
      dateTotalCasesArray.push(count);
      dateArray.push(dateList[i]);
    }
    setDateDhbs(dateArray.reverse());
    setDateTotalCases(dateTotalCasesArray);
  };

  console.log(totalDhbCases);

  return (
    <div className="app-container">
      <p>teste</p>
    </div>
  );
};

export default App;
