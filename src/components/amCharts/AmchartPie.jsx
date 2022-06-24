
// export default AmchartPie;
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/amcharts";
import { formatDataForAmChartPie } from "../../services/helpers/amChart.helper";


export default function AmchartPie({
  data,
  tagName,
  raduis,
  noLabel,
  viewLegend,
  height,
}) {



  am4core.useTheme(am4themes_dataviz);
  am4core.useTheme(am4themes_animated);
  const chart = am4core.create(tagName, am4charts.PieChart);
  chart.data = formatDataForAmChartPie(data);
  // raduis
  raduis ? (chart.innerRadius = this.props.raduis) : (chart.innerRadius = 29);
  chart.width = am4core.percent(90);
  chart.height = am4core.percent(90);
  // Création des series
  let pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "nombre";
  pieSeries.dataFields.category = "label";
  // pieSeries.ticks.template.disabled = true;

  // view label
  if (noLabel) pieSeries.labels.template.disabled = true;

  // legend
  if (viewLegend) {
    chart.legend = new am4charts.Legend();
    // chart.legend.position = "right";
    chart.legend.maxHeight = 75;
    chart.legend.scrollable = true;
  }
  return (
    <div>
      <div
        id={tagName}
        style={{
          width: "100%",
          height: height ? height : "300px",
        }}
      ></div>
    </div>
  );
}
