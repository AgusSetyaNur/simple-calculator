import { useCalc } from "./calcContext";

function HelperButton() {
  const { handleClear, handleDelete } = useCalc();
  return (
    <div className="helper-container">
      <button onClick={handleClear}>clear</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

export default HelperButton;
