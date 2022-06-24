
// export default AmchartBar;
import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/amcharts";
import { formatDataForAmChartPie } from "../../services/helpers/amChart.helper";

export default function AmchartBar({ data, tagName, height }) {
    am4core.useTheme(am4themes_dataviz);
  am4core.useTheme(am4themes_animated);
  am4core.color("#FF6F91");
  const chart = am4core.create(tagName, am4charts.XYChart);

  // Add data
  chart.data = formatDataForAmChartPie(data);
  // Create axes

  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "label";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  // categoryAxis.renderer.line.strokeWidth = 2;
  categoryAxis.fontSize = 12
  categoryAxis.renderer.labels.template.adapter.add("dy", function (
    dy,
    target
  ) {
    if (target.dataItem && target.dataItem.index & (2 == 2)) {
      return dy + 25;
    }
    return dy;
  });

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.fontSize = 12
  // Create series
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "nombre";
  series.dataFields.categoryX = "label";
  series.name = "Nombre";
  series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = 0.8;
  series.columns.template.stroke= am4core.color("#56bbd6");
  series.columns.template.fill= am4core.color("#56bbd6");

  let columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

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
