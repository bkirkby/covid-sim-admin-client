import React, { useState, useEffect } from 'react';
import { getGraphList } from '../api';

import Report from './Report';

            // data: [1, 4, 8, 32, 39, 45, 35, 35]
            // data: [99, 96, 92, 58, 21, 25, 25, 14]
            // data: [0, 0, 0, 10, 20, 30, 40, 51]

const ReportList = props => {
  const [ graphs, setGraphs ] = useState([]);
  const [ error, setError ] = useState('');

  useEffect(()=>{
    getGraphList()
      .then(data => setGraphs(data))
      .catch(err => {
        console.log('bk: ReportList.js: err: ', err);
        setError(err);
        // if (err.response) {
        //   setError(`error getting graph list: ${err}`);
        // }
      });
  }, []);

  return (
    <>
      {
        error ? <div style={{color: 'red'}}>{error}</div> 
        : graphs.map(graph => (
          // <div key={`${graph.isolation}-${graph.population}-${graph.social_distance}`}>{graph.isolation}</div>
          <Report key={`${graph.isolation}-${graph.population}-${graph.social_distance}`} graph={graph} />
        ))
      }
    </>
  )
}

export default ReportList;