import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import { searchGraphListByPopulation } from '../api';

import Graph from './Graph';

const GraphList = () => {
  const [graphs, setGraphs] = useState([]);
  const [error, setError] = useState('');
  const [searchParams, _setSearchParams] = useState(null); //{isolation: 0, social_distance: 0.0, population: 100}

  const setSearchParams = sp => {
    setError('');
    _setSearchParams(sp);
  };

  useEffect(() => {
    // getGraphList()
    if (searchParams != null) {
      console.log('bk: GrphList.js: useEffect: searchPArams: ', searchParams);
      searchGraphListByPopulation(searchParams.isolation, searchParams.social_distance, searchParams.population)
        .then(data => setGraphs(data))
        .catch(err => {
          setError(`unable to get graph list: ${err.toString()}`);
        });
    }
  }, [searchParams]);

  return (
    <>
      <h1>Search Aggregate Covid Sims</h1>
      <SearchForm setSearchParams={setSearchParams} />
      {
        error ? <div style={{ color: 'red' }}>{error}</div>
          : graphs.length == 0
            ? <div><b>** no graphs found **</b></div>
            : graphs.map(graph => (
              <Graph key={`${graph.isolation}-${graph.population}-${graph.social_distance}`} graph={graph} />
            ))
      }
    </>
  )
}

export default GraphList;