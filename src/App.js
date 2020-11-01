import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import ReportList from './component/GraphList';

function App() {

  console.log('bk: App.js: process.env: ', process.env);
  useEffect(()=>{
    // axios.post(`${process.env.REACT_APP_SERVER_API}/getGraph`, {
    //   isolation: 77,
    //   social_distance: 6.6,
    //   population: 100
    // }).then(res => console.log('bk: App.js: api.post: res: ', res))
    // .catch(err => console.error('error getting graph data: ', err))
  }, []);
  return (
    <div className="App">
      <Router>
        <Route path="/graph-list" component={ReportList} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
      </Router>
    </div>
  );
}

export default App;
