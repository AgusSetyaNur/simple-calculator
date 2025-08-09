import Header from "./Header";
import Operation from "./Operation";
import OutputField from "./OutputField";
import { CalcProvider } from "./calcContext";

function App() {
  const tes = "";
  console.log(tes.at(-1));
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
