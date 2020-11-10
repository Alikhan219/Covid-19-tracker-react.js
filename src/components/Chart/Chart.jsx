import React, { useState, useEffect } from "react";
import { fetchDailyData, fetchData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Charts = () => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    console.log(dailyData)
    fetchAPI();
  },[dailyData]);
  const lineChart = dailyData.length!==0 ? (
    <Line
      data={{
        labels: dailyData(({date})=> date),
        datasets: [{
            data: dailyData(({confirmed})=> confirmed),
            label:'Infected',
            borderColor: "#3333ff",
            fill: true,
        }, {
            data: dailyData(({deaths})=> deaths),
            label:'Deaths',
            borderColor: "rgba(255,0,0,0.5)",
            fill: true,
        }],
      }}
    />
  ) : null;

  return (
  <div className={styles.container}>
      {lineChart}
  </div>
  )
};
export default Charts;
