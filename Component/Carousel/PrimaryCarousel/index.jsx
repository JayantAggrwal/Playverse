import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./PrimaryCarousel.css";
import ActionButton from "../../Action/ActionButton";

function PrimaryCarousel(props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const trendingList = props.carouselData.filter((currentGame) => {
    return currentGame.isTrending;
  });

  const maxSlide = trendingList.length - 1;

  const incrementSlide = () => {
    if (maxSlide === activeSlide) {
      return setActiveSlide(0);
    }
    setActiveSlide(activeSlide + 1);
  };

  const decrementSlide = () => {
    if (activeSlide === 0) {
      return setActiveSlide(maxSlide);
    }
    setActiveSlide(activeSlide - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      incrementSlide();
    }, 5000);
  }, [activeSlide]);

  return (
    <div className="primary_carousel">
      <div className="primary_carousel_slider">
        {trendingList.map((currentSlide, index) => {
          return (
            <div
              className="primary_carousel_slide"
              key={currentSlide._id}
              style={{
                transform: `translateX(${(index - activeSlide) * 100}%)`,
              }}
            >
              <img
                className="primary_carousel_img"
                src={currentSlide.thumbnail}
                alt=""
              />
              <img
                className="primary_carousel_tab_img"
                src={currentSlide.landscape}
                alt=""
              />
            </div>
          );
        })}

        {/* <button
          className="primary_carousal_btn primary_carousal_next_btn"
          onClick={() => incrementSlide()}
        >
          +
        </button>
        <button
          className="primary_carousal_btn primary_carousal_prev_btn"
          onClick={() => decrementSlide()}
        >
          -
        </button> */}

        {/* <div className="primary_carousal_slider_action_wrap">
          {trendingList.map((current, index) => {
            return (
              <button
                className="primary_carousal_slider_action"
                key={current.id}
                onClick={() => setActiveSlide(index)}
              >
                <Circle />
              </button>
            );
          })}
        </div> */}
      </div>
      <div className="primary_carousel_detail_wrap">
        {trendingList
          .filter((currentGame) => {
            return currentGame._id == activeSlide;
          })
          .map((current) => {
            return (
              <div className="primary_carousel_detail" key={current.id}>
                <h2 className="primary_carousel_title">{current.title}</h2>
                <ActionButton
                  handleClick={() => navigate(`/productList/${current._id}`)}
                >
                  GET IT NOW!
                </ActionButton>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PrimaryCarousel;
