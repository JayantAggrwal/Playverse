import React, { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./PrimaryCard.css";
import { ActionIcon } from "../../Action";
import { ToastHandler } from "../../../Component/Utils";

import {
  ShoppingCart,
  Favorite,
  Delete,
  ArrowForward,
  Add,
} from "@mui/icons-material";
import { PostCart } from "../../../Service/CartService";
import { useAuth } from "../../../Context/AuthContext";
import { useData } from "../../../Context/DataContext";
import { PostWish, DeleteWish } from "../../../Service/WishService";
import { UpdateCart } from "../../../Service/CartService";

function PrimaryCard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { state, dispatch } = useData();
  const { _id, title, rating, price, genre, esrb, age, thumbnail, isWishList } =
    props;

  const isCarted = state.cartList.findIndex((currentProduct) => {
    return currentProduct._id == _id;
  });

  const isWished = state.wishList.findIndex((currentProduct) => {
    return currentProduct._id == _id;
  });

  const starList = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

  const HandleAddCart = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      }
      const addCartResponse = await PostCart({
        product: props,
        encodedToken: token,
      });
      if (addCartResponse.status == 201) {
        dispatch({
          type: "GET_CART",
          payload: { cart: addCartResponse.data.cart },
        });
        ToastHandler("success", "Added to Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleAddWish = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
      }
      const addWishResponse = await PostWish({
        product: { ...props },
        encodedToken: token,
      });
      if (addWishResponse.status == 201) {
        dispatch({
          type: "GET_WISH",
          payload: { wishlist: addWishResponse.data.wishlist },
        });
        ToastHandler("success", "Added to Wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDeleteWish = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
      }
      const deleteWishResponse = await DeleteWish({
        productId: _id,
        encodedToken: token,
      });
      if (deleteWishResponse.status == 200) {
        dispatch({
          type: "GET_WISH",
          payload: { wishlist: deleteWishResponse.data.wishlist },
        });
        ToastHandler("warn", "Removed from Wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CART INCREMENT:

  const HandleCartIncrement = async () => {
    try {
      const incrementResponse = await UpdateCart({
        productId: _id,
        encodedToken: token,
        type: "increment",
      });
      if (incrementResponse.status == 200) {
        dispatch({
          type: "GET_CART",
          payload: { cart: incrementResponse.data.cart },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCartRef = useRef();
  const addWishRef = useRef();
  const deleteWishRef = useRef();
  const incrementCartRef = useRef();

  const DelayHandleAddCart = (actionHandler, duration) => {
    clearTimeout(addCartRef.current);
    addCartRef.current = setTimeout(() => {
      actionHandler();
    }, duration);
  };

  const DelayHandleAddWish = (actionHandler, duration) => {
    clearTimeout(addWishRef.current);
    addWishRef.current = setTimeout(() => {
      actionHandler();
    }, duration);
  };

  const DelayHandleRemoveWish = (actionHandler, duration) => {
    clearTimeout(deleteWishRef.current);
    deleteWishRef.current = setTimeout(() => {
      actionHandler();
    }, duration);
  };

  const DelayHandleCartIncrement = (actionHandler, duration) => {
    clearTimeout(incrementCartRef.current);
    incrementCartRef.current = setTimeout(() => {
      actionHandler();
    }, duration);
  };

  return (
    <article className="primary_card">
      <img className="primary_card_img" src={thumbnail} alt={title} />
      <div className="primary_card_content">
        <div className="primary_card_actions">
          {isCarted !== -1 ? (
            <ActionIcon
              handleClick={() => {
                navigate("/cart");
              }}
            >
              <ArrowForward />
            </ActionIcon>
          ) : (
            <ActionIcon
              handleClick={() => {
                DelayHandleAddCart(HandleAddCart, 600);
              }}
            >
              <ShoppingCart />
            </ActionIcon>
          )}
          {!isWishList &&
            (isWished !== -1 ? (
              <ActionIcon
                handleClick={() => DelayHandleRemoveWish(HandleDeleteWish, 600)}
              >
                <Favorite style={{ color: "red" }} />
              </ActionIcon>
            ) : (
              <ActionIcon
                handleClick={() => DelayHandleAddWish(HandleAddWish, 600)}
              >
                <Favorite />
              </ActionIcon>
            ))}
          {isWishList && (
            <ActionIcon
              handleClick={() => DelayHandleRemoveWish(HandleDeleteWish, 600)}
            >
              <Delete />
            </ActionIcon>
          )}
          {isCarted !== -1 && isWishList && (
            <ActionIcon
              handleClick={() => DelayHandleCartIncrement(HandleCartIncrement)}
            >
              <Add />
            </ActionIcon>
          )}
          {isCarted !== -1 && isWishList && (
            <div className="wish_cart_count">
              {state.cartList[isCarted].qty}
            </div>
          )}
        </div>
        <div className="primary_card_text">
          <h3 className="primary_card_title">{title}</h3>
          <div className="primary_card_tags">
            <p className="primary_card_tag">
              <strong>Price:</strong>
              <span>₹{price}</span>
            </p>
            <p className="primary_card_tag">
              <strong>ESRB:</strong>
              <span>{esrb}</span>
            </p>
            <p className="primary_card_tag">
              <strong>Genre:</strong>
              <span>{genre}</span>
            </p>
            <p className="primary_card_tag">
              <strong>Age:</strong>
              <span>{age}</span>
            </p>
            <p className="primary_card_tag">
              <strong>Rating:</strong>
              <span>
                {starList.find((currentStar, index) => {
                  return index + 1 == rating;
                })}
              </span>
            </p>
          </div>
          <div className="primary_card_view">
            <Link className="primary_card_view_btn" to={`/productList/${_id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PrimaryCard;
