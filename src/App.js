import Header from "./Header";
import Operation from "./Operation";
import OutputField from "./OutputField";
import { CalcProvider } from "./calcContext";

function App() {
  return (
    <div className="app-container">
      <Header />
      <CalcProvider>
        <OutputField />
        <Operation />
      </CalcProvider>
    </div>
  );
}

export default App;
