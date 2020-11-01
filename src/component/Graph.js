import React, { useMemo, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Line } from 'react-chartjs-2';
import { getGraphData } from '../api';
import Report from './Report';
import { CovidMillisecondReport, CovidSecondReport } from '../api/reporting';

const Graph = ({ graph }) => {
  const [graphData, setGraphData] = useState({
    dead_array: [], healthy_array: [], infected_array: [], immune_array: []
  });
  const [showReport, setShowReport] = useState(false);
  const [reportType, setReportType] = useState('ms'); // ms or sec

  const reportTitle = useMemo(() => {
    return `Covid Sim Avg: ${graph.isolation}-${graph.social_distance}-${graph.population}`
  }, graph);

  useEffect(() => {
    getGraphData(graph)
      .then(graph_data => setGraphData(graph_data))
  }, [graph]);

  return <>
    <div style={{
      padding: '5px',
      fontWeight: 'bold',
      textAlign: 'left',
      borderLeft: 'solid black 20px',
    }}>isolation: {graph.isolation}<br />social_distance: {graph.social_distance}<br />population: {graph.population}</div>
    { graphData.healthy_array.length > 0 ?
      <div style={{
        borderBottom: 'solid black 30px',
        borderLeft: 'solid black 20px',
        borderRight: 'solid black 4px',
        height: 400,
        width: 800
      }
      }>
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
                backgroundColor: "rgb(102, 102, 155, .6)",
                data: graphData.healthy_array.map(cnt => (cnt / graphData.total_runs).toFixed(1))
              },
              {
                label: "infected",
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "red",
                backgroundColor: "rgb(155, 102, 102, .6)",
                data: graphData.infected_array.map(cnt => (cnt / graphData.total_runs).toFixed(1))
              },
              {
                label: "immune",
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                borderColor: "green",
                backgroundColor: "rgb(155, 102, 102, .6)",
                data: graphData.immune_array.map(cnt => (cnt / graphData.total_runs).toFixed())
              }
            ]
          }}
        />
        <button onClick={() => { setReportType('ms'); setShowReport(true); }}>ms report</button>
        <button onClick={() => { setReportType('sec'); setShowReport(true); }}>sec report</button>
        <ReactModal isOpen={showReport} contentLabel="minimal modal">
          <button onClick={() => setShowReport(false)}>close</button>
          <Report report={
            reportType == 'sec' ?
              new CovidSecondReport(reportTitle, graphData)
              : new CovidMillisecondReport(reportTitle, graphData)
          } />
          <button onClick={() => setShowReport(false)}>close</button>
        </ReactModal>
      </div>
      : <div>no graph data</div>
    }
  </>
}

export default Graph;