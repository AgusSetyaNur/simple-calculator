import { useCalc } from "./calcContext";

const operand = ["/", "*", "+", "-", "="];
function Operand() {
  const { handleOperand, handleOperation } = useCalc();
  return (
    <div className="operand">
      {operand.map((val) => (
        <div
          className="operand-item"
          onClick={() => (val !== "=" ? handleOperand(val) : handleOperation())}
          key={val}
        >
          <strong>{val}</strong>
        </div>
      ))}
    </div>
  );
}

export default Operand;
