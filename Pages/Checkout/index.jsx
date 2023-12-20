import React from "react";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../../Asset/Navbar/NavLogo.png";
import { ToastHandler } from "../../Component/Utils";

import "./Checkout.css";

import {
  PageContainer,
  SectionContainer,
  ActionButton,
  AddressForm,
  SelectAddressCard,
  ModalContentWrapper,
} from "../../Component";

import { useData } from "../../Context/DataContext";

import {
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useAuth } from "../../Context/AuthContext";

function Checkout() {
  const { state, dispatch } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAddAddress, setIsAddAddress] = React.useState(false);
  const handleAddAddressOpen = () => setIsAddAddress(true);
  const handleAddAddressClose = () => setIsAddAddress(false);

  const grossTotal = state.cartList.reduce((total, currentProduct) => {
    return (total += currentProduct.price * currentProduct.qty);
  }, 0);

  const netTotal = grossTotal - (grossTotal * 10) / 100;

  const getDeliveryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handlePaymentSuccess = (response) => {
    const orderDetail = {
      id: response.razorpay_payment_id,
      productsList: [...state.cartList],
      address: state.selectedAddress,
      amount: netTotal,
      date: new Date(),
      deliveryDate: getDeliveryDate(),
    };
    dispatch({ type: "GET_ORDER", payload: orderDetail });
    navigate("/orderSuccess");
    dispatch({ type: "CLEAR_CART" });
    setTimeout(() => {
      navigate("/profile/orders");
    }, 4000);
  };

  const razorpayOptions = {
    key: "rzp_test_00dP2uDP2yHZOB",
    amount: netTotal * 100,
    name: "Playverse",
    description: "Thank You For Ordering",
    image: BrandLogo,
    handler: (response) => handlePaymentSuccess(response),
    prefill: {
      name: currentUser?.firstName,
      email: currentUser?.email,
      contact: state.selectedAddress.addressFormNumber,
    },
    notes: {
      address: state.selectedAddress,
    },
    theme: {
      color: "#fcaf17",
    },
  };

  const handleOrderBtn = () => {
    if (state.selectedAddress._id) {
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } else {
      ToastHandler("warn", "Select Address");
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2d2d2d",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <PageContainer>
      <SectionContainer className="checkout_section">
        <h1 className="checkout_section_head">CHECKOUT</h1>(
        <div className="checkout_section_body">
          {/* CHECKOUT PRICE */}
          <div className="checkout_price">
            <h2 className="checkout_price_title">Order Details</h2>
            <div className="checkout_price_body">
              <TableContainer component={Paper} sx={{ borderRadius: "unset" }}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Item Name</StyledTableCell>
                      <StyledTableCell align="center">
                        Item Price
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Item Quantity
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Item Amount
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.cartList.map((currentProduct) => (
                      <StyledTableRow key={currentProduct._id}>
                        <StyledTableCell component="th" scope="row">
                          {currentProduct.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {currentProduct.price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {currentProduct.qty}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {currentProduct.qty * currentProduct.price}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="checkout_price_summary">
                <p className="checkout_price_item">
                  <span className="checkout_price_key">GROSS TOTAL</span>
                  <span className="checkout_price_value">₹{grossTotal}</span>
                </p>
                <p className="checkout_price_item checkout_price_discount">
                  <span className="checkout_price_key">DISCOUNT</span>
                  <span className="checkout_price_value">
                    (₹{(grossTotal * 10) / 100})
                  </span>
                </p>
                <p className="checkout_price_item">
                  <span className="checkout_price_key checkout_price_strong">
                    NET TOTAL
                  </span>
                  <span className="checkout_price_value checkout_price_strong">
                    ₹{netTotal}
                  </span>
                </p>
              </div>
            </div>
            <div className="checkout_price_action">
              <ActionButton
                handleClick={() => {
                  handleOrderBtn();
                }}
              >
                PLACE ORDER
              </ActionButton>
            </div>
          </div>
          {/* <EmptyCart /> */}
          <div className="checkout_address">
            <h2 className="checkout_address_head">ADDRESS DETAILS</h2>
            <div className="checkout_address_list">
              {state.addressList.map((currentAddress) => {
                return (
                  <SelectAddressCard
                    {...currentAddress}
                    key={currentAddress._id}
                  />
                );
              })}
            </div>
            <div className="checkout_address_action">
              <ActionButton handleClick={() => handleAddAddressOpen(true)}>
                ADD NEW ADDRESS
              </ActionButton>
            </div>
            <Modal open={isAddAddress} onClose={handleAddAddressClose}>
              <ModalContentWrapper>
                <AddressForm closeAdd={handleAddAddressClose} />
              </ModalContentWrapper>
            </Modal>
          </div>
        </div>
        )
      </SectionContainer>
    </PageContainer>
  );
}

export default Checkout;
