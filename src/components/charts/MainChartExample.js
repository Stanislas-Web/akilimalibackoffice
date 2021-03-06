import React, { useState, useEffect } from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";


import {
  formatVbg,
  formatCasSoumis,
  groupByMonth,
  
} from "../../services/helpers/api.data.helper";
import { formatDataForAmChartPie,formatDataForAmChartMainByMonth } from "../../services/helpers/amChart.helper";
import API from "../../services/api";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = (attributes) => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const [dataAll, setDataAll] = useState({
    dataVbg: [],
    dataCasSoumis: [],
  });
  const [dataAmchart, setDataAmchart] = useState([]);

  useEffect( () => {
    (async function(){
      //Le code de await doit être ici
      const dataVbg = await API.get("ouvrages").then((res) =>
      formatDataForAmChartPie(
        groupByMonth(formatVbg(res.data), "genre_ouvrage")
      )
    );
    const dataCasSoumis = await API.get("ouvrages").then((res) =>
    formatDataForAmChartPie(
      groupByMonth(formatCasSoumis(res.data), "genre_ouvrage")
    )
  );
  setDataAll({
    dataVbg: dataVbg,
    dataCasSoumis: dataCasSoumis,
  });
      } ) ()
  }, []);

  const defaultDatasets = (() => {
    let elements = 12;
    const data1 = dataAll.dataVbg.map((element)=>element.nombre);
    const data2 = dataAll.dataCasSoumis.map((element)=>element.nombre);
    const data3 = [];

    return [
      {
        label: "Livre",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: [10, 20, 123, 40, 110, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        label: "BD",
        backgroundColor: "transparent",
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: [120, 190, 3, 5, 2, 3, 30, 3, 5, 2, 3, 20],
      },
      // {
      //   label: 'My Third dataset',
      //   backgroundColor: 'transparent',
      //   borderColor: brandDanger,
      //   pointHoverBackgroundColor: brandDanger,
      //   borderWidth: 1,
      //   borderDash: [8, 5],
      //   data: data3
      // }
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              // stepSize: Math.ceil(250 / 5),
              // max: 250
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        line: {
          tension: 0.000001,
        },
        // point: {
        //   radius: 0,
        //   hitRadius: 10,
        //   hoverRadius: 4,
        //   hoverBorderWidth: 3
        // }
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels="months"
    />
  );
};

export default MainChartExample;
