import { useCalc } from "./calcContext";

function OutputField() {
  const { value1, value2, operand, output } = useCalc();
  return (
    <div className="output-field">
      <p>
        {value1}
        {operand}
        {value2}
      </p>

      {output !== null && <p> = {output}</p>}
    </div>
  );
}

export default OutputField;
