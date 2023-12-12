import logo from './logo.svg';
import './App.css';
import BasicCalculation from './components/basicCalculation';
import Sidebar from './components/Sidebar';
import Header from './components/header';

function App() {
  return (
    
    <div className="App">
      <Header/>
      <Sidebar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input></input>
        <BasicCalculation/>
      </header>
      

    </div>

  );
}

export default App;
