import React, { useState } from "react";

import "./AddressCard.css";
import { DeleteAddress } from "../../../Service/AddressService";
import { useAuth } from "../../../Context/AuthContext";
import { useData } from "../../../Context/DataContext";
import Modal from "@mui/material/Modal";
import AddressForm from "../../Form/AddressForm";
import { ActionIcon } from "../../Action";
import { Edit, Delete } from "@mui/icons-material";

function AddressCard(props) {
  const { token } = useAuth();
  const { dispatch } = useData();

  const [isEditAddress, setIsEditAddress] = React.useState(false);
  const handleEditAddressOpen = () => setIsEditAddress(true);
  const handleEditAddressClose = () => setIsEditAddress(false);

  const styleOut = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    backgroundColor: "#2b2b2b",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "16px",
  };

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

  const handleRemoveAddress = async () => {
    try {
      const removeAddressResponse = await DeleteAddress({
        addressId: _id,
        encodedToken: token,
      });
      if (removeAddressResponse.status == 200) {
        dispatch({
          type: "GET_ADDRESS",
          payload: removeAddressResponse.data.address,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="address_card">
      <div className="address_card_body">
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">Name:</span>
          <span className="address_card_body_item_value">
            {addressFormName}
          </span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">Mobile Number:</span>
          <span className="address_card_body_item_value">
            {addressFormNumber}
          </span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">Pincode:</span>
          <span className="address_card_body_item_value">{addressFormPin}</span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">Alternate Number:</span>
          <span className="address_card_body_item_value">
            {addressFormAlternateNumber}
          </span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">City:</span>
          <span className="address_card_body_item_value">
            {addressFormCity}
          </span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">State:</span>
          <span className="address_card_body_item_value">
            {addressFormState}
          </span>
        </p>
        <p className="address_card_body_item">
          <span className="address_card_body_item_key">Address:</span>
          <span className="address_card_body_item_value">
            {addressFormAddress}
          </span>
        </p>
      </div>
      <div className="address_card_actions">
        <ActionIcon
          className="address_card_edit"
          handleClick={handleEditAddressOpen}
        >
          <Edit />
        </ActionIcon>
        <Modal
          open={isEditAddress}
          onClose={handleEditAddressClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={styleOut}>
            <AddressForm
              {...props}
              isEdit
              openEdit={handleEditAddressOpen}
              closeEdit={handleEditAddressClose}
            />
          </div>
        </Modal>
        <ActionIcon
          className="address_card_delete"
          handleClick={handleRemoveAddress}
        >
          <Delete />
        </ActionIcon>
      </div>
    </div>
  );
}

export default AddressCard;
