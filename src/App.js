import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { data } from "./covid/data";
import { dhbs } from "./covid/dhbs";

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
      <div className="info-container">
        <img className="logo" src="/logo.svg" />
        <p>
          Kia kaha, stay strong New Zealand in this COVID-19 pandemic crisis.
          The aim of this project is to inform and help!
        </p>
        <p>Data source: New Zealand Ministry of Health - Manatū Hauora</p>

        <div className="card-container">
          <div className="card-text">
            <h2>Total cases per reported date</h2>
            <p>Let's fight the exponential grow staying in home :).</p>
          </div>
          <div className="card-chart">
            <Plot
              config={{ displayModeBar: false }}
              data={[
                {
                  x: dateDhbs,
                  y: dateTotalCases,
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { opacity: 0.4, color: "#EE0014" }
                }
              ]}
              layout={{
                autosize: true,
                showlegend: false,
                margin: {
                  l: 50,
                  r: 50,
                  b: 100,
                  t: 20,
                  pad: 0
                }
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card-text">
            <h2>Total cases per District Health Board - DHS</h2>
            <p>
              {" "}
              There is {totalNZCases} in New Zealand -
              {totalDhbCases[2] +
                totalDhbCases[19] +
                totalDhbCases[4] +
                totalDhbCases[12]}{" "}
              of the cases are concentrated in Ackland - {totalDhbCases[2]},
              Southern - {totalDhbCases[19]}, Waikato - {totalDhbCases[4]},
              Capital & Coast - {totalDhbCases[12]}.
            </p>
          </div>
          <div className="card-chart">
            <Plot
              config={{ displayModeBar: false }}
              data={[
                {
                  values: totalDhbCases,
                  labels: dhbsNames,
                  type: "pie"
                }
              ]}
              layout={{
                autosize: true,
                showlegend: false,
                margin: {
                  l: 20,
                  r: 80,
                  b: 20,
                  t: 20,
                  pad: 0
                }
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
      <div className="map-container">
        <Plot
          config={{ displayModeBar: false }}
          data={[
            {
              type: "scattermapbox",
              lat: dhbsLatitudes,
              lon: dhbsLongitudes,
              mode: "markers",
              marker: {
                size: totalDhbCases,
                opacity: 0.4,
                color: "#EE0014"
              },
              text: dhbsNamesTotal,
              hoverinfo: "text"
            }
          ]}
          layout={{
            autosize: true,
            margin: {
              r: 0,
              t: 0,
              b: 0,
              l: 0
            },
            hovermode: "closest",
            mapbox: {
              style: "mapbox://styles/rdferrari/ck86h7c3506s61imq9a71xph7",
              accesstoken:
                "pk.eyJ1IjoicmRmZXJyYXJpIiwiYSI6ImNpcDQ4Nm12YjAwNnJsZ20zOXdmc29obmcifQ.Shb8a3P1XAV8cPWR1yGDTA",
              bearing: 0,
              center: {
                lon: 172.518088,
                lat: -41.751291
              },
              pitch: 0,
              zoom: 4.06
            }
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default App;
