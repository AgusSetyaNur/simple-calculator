import HelperButton from "./HelperButton";
import NumberInput from "./NumberInput";
import Operand from "./Operand";

function Operation() {
  return (
    <div className="operation">
      <div className="box1">
        <HelperButton />
        <NumberInput />
      </div>
      <Operand />
    </div>
  );
}

export default Operation;
