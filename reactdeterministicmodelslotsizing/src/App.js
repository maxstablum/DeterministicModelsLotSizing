import logo from './logo.svg';
import './App.css';
import BasicCalculation from './components/basicCalculation';
import Sidebar from './components/Sidebar';
import Header from './components/header';

function App() {
  return (
    
    <div style={{ display: 'flex', backgroundColor: '#eee'}}>
      <div style={{ width: '15%'}}>
      <Sidebar />
        <p>Hier steht der Inhalt des linken Bereichs.</p>
      </div>
      <div style={{ width: '85%', backgroundColor: '#eee' }}>
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
      
        <p>Hier steht der Inhalt des rechten Bereichs.</p>
      </div>
    </div>
        
      
      

  );
}


/*

function App() {
  return (
    
    <div className="border">
      <Header/>
      
      <div className='border'>
      <Sidebar />
      </div>
        <div className='border' style={width}>

        
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
    </div>

  );
}
*/
export default App;
