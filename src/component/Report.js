import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getGraphData } from '../api';

const Report = ({graph}) => {
  const [ graphData, setGraphData ] = useState({
    dead_array: [], healthy_array: [], infected_array: [], immune_array: []
  });

  useEffect(() => {
    getGraphData(graph)
      .then(graph_data => setGraphData(graph_data))
  }, [graph]);

  return <>
    {graph.social_distance}
    { graphData.healthy_array.length > 0 ?
      <div style={{height: 400, width: 800}}>
      <Line
          data={{
            // labels: ["one","two","three","four","five","six","seven"],
            labels: graphData.healthy_array.map((h, idx) => parseInt(idx, 10)),
            datasets: [
              {
                label: "normal",
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "blue",
                backgroundColor:"rgb(102, 102, 155, .6)",
                data: graphData.healthy_array.map(cnt => (cnt/graphData.total_runs).toFixed(1))
              },
              {
                label: "infected",
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "red",
                backgroundColor:"rgb(155, 102, 102, .6)",
                data: graphData.infected_array.map(cnt => (cnt/graphData.total_runs).toFixed(1))
              },
              {
                label: "immune",
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "green",
                backgroundColor:"rgb(155, 102, 102, .6)",
                data: graphData.immune_array.map(cnt => (cnt/graphData.total_runs).toFixed())
              }
            ]
          }}
          // width={800}
          // height={400}
          // options={{ maintainAspectRatio: false }}
        /> 
        </div>
      : <div>no graph data</div>
    }
  </>
}

export default Report;