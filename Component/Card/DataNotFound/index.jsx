import Lottie from "lottie-react";
import "./DataNotFound.css";

import DataNotFoundLottie from "../../../Asset/Lottie/DataNotFound.json";

function DataNotFound() {
  return (
    <article className="DNF_card">
      <Lottie
        animationData={DataNotFoundLottie}
        loop={true}
        style={{ width: "400px" }}
        className="DNF_card_lottie"
      />
    </article>
  );
}

export default DataNotFound;
