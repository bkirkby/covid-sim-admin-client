import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { isPropertySignature } from 'typescript';


const Styles = styled.div`
  padding: 3px;
  form {
    border: solid 2px black;
    text-align: center;
  }
`;

const SearchForm = ({ setSearchParams }) => {
  const [population, updatePopulation] = useState(100);
  const [socialDistance, updateSocialDistance] = useState(0.0);
  const [isolation, updateIsolation] = useState(0);
  const [populationOperator, updatePopulationOperator] = useState('=');

  const socialDistanceOptions = useMemo(() => {
    const ret = [];
    for (let i = 0.0; i.toFixed(1) <= 8.0; i += .2) {
      ret.push(i.toFixed(1))
    }
    return ret;
  }, []);

  const isolationOptions = useMemo(() => {
    const ret = [];
    for (let i = 0; i <= 100; i++) {
      ret.push(i);
    }
    return ret;
  }, [])

  const populationOptions = useMemo(() => {
    const ret = [];
    for (let i = 20; i <= 200; i += 20) {
      ret.push(i);
    }
    return ret;
  })

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
    setSearchParams({ population, social_distance: socialDistance, isolation })
  }

  const handlePopulationChange = e => {
    updatePopulation(e.target.value);
  }

  const handleIsolationChange = e => {
    updateIsolation(e.target.value);
  }

  const handleSocialDistanceChange = e => {
    updateSocialDistance(e.target.value);
  }

  const handlePopulationOperatorChanges = e => {
    updatePopulationOperator(e.target.value);
  }

  return (
    <Styles>
      <div>
        <form onSubmit={handleSubmit}>
          {/*<div>isolation: <select name="isolation" onChange={handleIsolationChange}>
            {isolationOptions.map(opt => {
              return <option value={opt}>{opt}</option>
            })}
          </select>
          </div>
          <div>social_distance: <select name="social_distance" onChange={handleSocialDistanceChange}>
            {socialDistanceOptions.map(opt => {
              return <option value={opt}>{opt}</option>
            })}
          </select>
          </div> */}
          <div>population: <select name="population" onChange={handlePopulationChange}>
            {populationOptions.map(opt => {
              return <option value={opt}>{opt}</option>
            })}
          </select>
          </div>
          <button>Search</button>
        </form>
      </div>
    </Styles>
  )
}

export default SearchForm;