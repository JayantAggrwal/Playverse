import React, { useState } from "react";
import { Modal } from "@mui/material";

import "./UserAddress.css";
import {
  ActionButton,
  ActionIcon,
  AddressCard,
  AddressForm,
} from "../../../../Component";
import { useData } from "../../../../Context/DataContext";
import { Add } from "@mui/icons-material";

function UserAddress() {
  const [isAddAddress, setIsAddAddress] = React.useState(false);
  const handleAddAddressOpen = () => setIsAddAddress(true);
  const handleAddAddressClose = () => setIsAddAddress(false);
  const { state } = useData();
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

  return (
    <div className="address">
      <ActionIcon
        className="add_new_address_btn"
        handleClick={() => handleAddAddressOpen(true)}
      >
        <Add />
      </ActionIcon>

      <Modal
        open={isAddAddress}
        onClose={handleAddAddressClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={styleOut}>
          <AddressForm closeAdd={handleAddAddressClose} />
        </div>
      </Modal>

      <div className="address_list">
        {state.addressList.length !== 0 ? (
          [...state.addressList].reverse().map((currentAddress, index) => {
            return <AddressCard {...currentAddress} key={index} />;
          })
        ) : (
          <div className="address_list_empty">No Address Data Found</div>
        )}
      </div>
    </div>
  );
}

export default UserAddress;
