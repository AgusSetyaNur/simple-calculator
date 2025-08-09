import { useCalc } from "./calcContext";

function HelperButton() {
  const { handleClear, handleDelete, handleChaining, chainingMode } = useCalc();
  return (
    <div className="helper-container">
      <button onClick={handleClear}>clear</button>
      <button onClick={handleDelete}>delete</button>
      <button
        className={chainingMode ? "chain-active" : ""}
        onClick={handleChaining}
      >
        {chainingMode ? "chain" : "simple"}
      </button>
    </div>
  );
}

export default HelperButton;
