import logo from './logo.svg';
import './App.css';
import CountryCapitalGame from './CountryCapitalGame';

function App() {
  return (
    <div className="App">
      <CountryCapitalGame data={{ Germany: "Berlin", Azerbaijan: "Baku" }} />
    </div>
  );
}

export default App;
