import React from "react";

import "./SelectAddressCard.css";
import { Radio } from "@mui/material";
import { useData } from "../../../Context/DataContext";

const SelectAddressCard = (props) => {
  const { state, dispatch } = useData();

  const {
    _id,
    addressFormName,
    addressFormNumber,
    addressFormPin,
    addressFormCity,
    addressFormAddress,
    addressFormAlternateNumber,
    addressFormState,
  } = props;
  return (
    <article className="select_address_card">
      <fieldset>
        <label className="select_address_wrap">
          <Radio
            checked={state?.selectedAddress._id === _id}
            onChange={() => {
              dispatch({
                type: "ADDRESS_SELECTED",
                payload: { addressId: _id },
              });
            }}
            value={_id}
            sx={{
              color: "#fcaf17",
              "&.Mui-checked": {
                color: "#fcaf17",
              },
            }}
          />
          <div className="select_address_content">
            <h2 className="select_address_name">{addressFormName}</h2>
            <p className="select_address_location">
              {addressFormAddress}, {addressFormCity}, {addressFormState},{" "}
              {addressFormPin}
            </p>
            <p className="select_address_number">
              Mobile Number : +91{addressFormNumber}, +91
              {addressFormAlternateNumber}
            </p>
          </div>
        </label>
      </fieldset>
    </article>
  );
};

export default SelectAddressCard;
