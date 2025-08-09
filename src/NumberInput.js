import { useCalc } from "./calcContext";

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
function NumberInput() {
  const { handleValue } = useCalc();
  return (
    <div className="number-input">
      {number.map((val) => (
        <div
          className={`number-item item-${val === "." ? "dot" : val}`}
          onClick={() => handleValue(val)}
          key={val}
        >
          {val}
        </div>
      ))}
    </div>
  );
}

export default NumberInput;
