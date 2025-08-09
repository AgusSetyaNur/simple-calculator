import { useCalc } from "./calcContext";

function OutputField() {
  const { value1, value2, operand, output, chainingValue, chainingMode } =
    useCalc();
  return (
    <div className="output-field">
      {chainingMode ? (
        <p>{chainingValue}</p>
      ) : (
        <p>
          {value1}
          {operand}
          {value2}
        </p>
      )}

      {output !== null && <p> = {output}</p>}
    </div>
  );
}

export default OutputField;
