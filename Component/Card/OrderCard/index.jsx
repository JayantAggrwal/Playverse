import React from "react";

import "./OrderCard.css";

const OrderCard = (props) => {
  const { id, amount, address, productsList } = props;
  return (
    <article className="order_card">
      <div className="order_card_head">
        <p className="order_card_item">
          <span className="order_card_item_key">Payment ID</span>
          <span className="order_card_item_value">{id}</span>
        </p>
        <p className="order_card_item">
          <span className="order_card_item_key">Amount Paid</span>
          <span className="order_card_item_value">{amount}</span>
        </p>
        <p className="order_card_item">
          <span className="order_card_item_key">Address</span>
          <span className="order_card_item_value">
            {address.addressFormAddress}
          </span>
        </p>
        <p className="order_card_item">
          <span className="order_card_item_key">Mobile</span>
          <span className="order_card_item_value">
            {address.addressFormNumber}
          </span>
        </p>
      </div>
      <div className="order_card_body">
        <span className="order_card_body_head">Products Ordered:</span>
        <ul className="order_card_list">
          {productsList.map((current) => {
            return (
              <div className="order_sub_card" key={current._id}>
                <p className="order_sub_card_item">
                  <strong>Name</strong>
                  <span>{current.title}</span>
                </p>
                <p className="order_sub_card_item">
                  <strong>Price</strong>
                  <span>{current.price}</span>
                </p>
                <p className="order_sub_card_item">
                  <strong>Quantity</strong>
                  <span>{current.qty}</span>
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    </article>
  );
};

export default OrderCard;

// age
// :
// "18+"
// createdAt
// :
// "2023-05-31T02:19:04-07:00"
// description
// :
// "The Grand Theft Auto V: Premium Edition includes the complete GTAV story, Grand Theft Auto Online and all existing gameplay upgrades and content. You’ll also get the Criminal Enterprise Starter Pack, the fastest way to jumpstart your criminal empire in GTA Online."
// developer
// :
// "Rockstar Games"
// downloads
// :
// "55"
// esrb
// :
// "R"
// genre
// :
// "Adventure"
// id
// :
// "1"
// imageList
// :
// []
// logo
// :
// "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_400x400_GameLogo-1000x1000-f6c47a98454049a5e63959f7b6f898c4fc22829c.png?h=270&quality=medium&resize=1&w=480"
// price
// :
// "2321"
// publisher
// :
// "Rockstar Games"
// qty
// :
// 1
// rating
// :
// "5"
// release
// :
// "05/14/20"
// requirement
// :
// {minimum: {…}, recommended: {…}}
// status
// :
// "online"
// thumbnail
// :
// "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/GTAOnline.jpg"
// title
// :
// "Grand Theft Auto V"
// updatedAt
// :
// "2023-05-31T02:19:04-07:00"
// _id
// :
// "0"
