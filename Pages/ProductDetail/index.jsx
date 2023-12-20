import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import "./ProductDetail.css";
import { PageContainer, SectionContainer, ActionButton } from "../../Component";
import { PostCart } from "../../Service/CartService";
import { PostWish } from "../../Service/WishService";
import { useData } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import { ToastHandler } from "../../Component/Utils";

function ProductDetail() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { state, dispatch } = useData();
  const starList = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];

  const getGame = state?.productList?.find((currentGame) => {
    return currentGame?._id == productId;
  });

  const HandleAddCart = async () => {
    try {
      if (!token) {
        navigate("/login", { state: { from: location } });
        return;
      }
      const addCartResponse = await PostCart({
        product: { ...getGame, qty: 1 },
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
        product: { ...getGame },
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

  const isCarted = state.cartList.findIndex((currentProduct) => {
    return currentProduct._id === getGame._id;
  });

  const isWished = state.wishList.findIndex((currentProduct) => {
    return currentProduct._id === getGame._id;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <PageContainer>
      <SectionContainer className="detail_section">
        <div className="detail_content">
          <div className="detail_content_intro">
            <h1 className="detail_content_intro_head">{getGame?.title}</h1>
            <div className="detail_content_intro_body">
              <div className="detail_content_intro_thumbnail">
                <img src={getGame?.thumbnail} alt={getGame?.title} />
              </div>
              <div className="detail_content_intro_text">
                <p>{getGame?.description}</p>
                <div className="detail_content_bread">
                  <div className="detail_content_bread_item">
                    <span>Rating</span>
                    <strong>
                      {starList.find((currentStar, index) => {
                        return index + 1 == getGame?.rating;
                      })}
                    </strong>
                  </div>
                  <div className="detail_content_bread_item">
                    <span>Genre</span>
                    <strong>{getGame?.genre}</strong>
                  </div>
                  <div className="detail_content_bread_item">
                    <span>ESRB</span>
                    <strong>{getGame?.esrb}</strong>
                  </div>
                  <div className="detail_content_bread_item">
                    <span>Downloads</span>
                    <strong>{getGame?.downloads} Million</strong>
                  </div>
                  <div className="detail_content_bread_item">
                    <span>Status</span>
                    <strong>{getGame?.status}</strong>
                  </div>
                  <div className="detail_content_bread_item">
                    <span>Age</span>
                    <strong>{getGame?.age}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail_content_specs">
            <div className="detail_content_specs_column">
              <span className="detail_content_specs_column_head">Minimum</span>
              <div className="detail_content_specs_column_item">
                <span>PROCESSOR</span>
                <p>{getGame?.requirement.minimum.cpu}</p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>HDD SPACE</span>
                <p>{getGame?.requirement.minimum.storage} GB </p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>VIDEO CARD</span>
                <p>{getGame?.requirement.minimum.gpu}</p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>MEMORY</span>
                <p>{getGame?.requirement.minimum.memory} GB RAM</p>
              </div>
            </div>
            <div className="detail_content_specs_column">
              <span className="detail_content_specs_column_head">Maximum</span>
              <div className="detail_content_specs_column_item">
                <span>PROCESSOR</span>
                <p>{getGame?.requirement.recommended.cpu}</p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>HDD SPACE</span>
                <p>{getGame?.requirement.recommended.storage} GB </p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>VIDEO CARD</span>
                <p>{getGame?.requirement.recommended.gpu}</p>
              </div>
              <div className="detail_content_specs_column_item">
                <span>MEMORY</span>
                <p>{getGame?.requirement.recommended.memory} GB RAM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_action">
          <div className="detail_action_thumbnail">
            <img src={getGame?.logo} alt={getGame?.title} />
          </div>
          <span className="detail_action_price">₹{getGame?.price}</span>
          <div className="detail_action_btn">
            {isCarted === -1 ? (
              <ActionButton handleClick={HandleAddCart}>
                ADD TO CART
              </ActionButton>
            ) : (
              <ActionButton handleClick={() => navigate("/cart")}>
                GO TO CART
              </ActionButton>
            )}

            {isWished === -1 ? (
              <ActionButton handleClick={HandleAddWish}>
                ADD TO WISHLIST
              </ActionButton>
            ) : (
              <ActionButton handleClick={() => navigate("/wishList")}>
                GO TO WISHLIST
              </ActionButton>
            )}
          </div>

          <div className="detail_action_meta">
            <div className="detail_action_meta_item">
              <span className="detail_action_meta_item_title">Developer</span>
              <span>{getGame?.developer}</span>
            </div>
            <div className="detail_action_meta_item">
              <span className="detail_action_meta_item_title">Publisher</span>
              <span>{getGame?.publisher}</span>
            </div>
            <div className="detail_action_meta_item">
              <span className="detail_action_meta_item_title">
                Release Date
              </span>
              <span>{getGame?.release}</span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}

export default ProductDetail;
