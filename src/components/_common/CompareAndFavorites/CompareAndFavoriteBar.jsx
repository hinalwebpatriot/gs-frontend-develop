import React from "react";
import logoGray from "../../../img/svg/logo_grey.svg";
import closeSvg from "../../../img/svg/close_f.svg";
import routing from "../../../config/routing";
import ImageLoader from "../ImageLoader";

const BarItem = ({ type, remove, item, push }) => {
  let link;
  switch (type) {
    case "diamond":
      link = routing({ slug: item.slug, id: item.id }).diamondProduct;
      break;
    case "engagement":
      link = routing({ slug: item.slug, id: item.id }).engagementProduct;
      break;
    case "wedding":
      link = routing({ slug: item.slug, id: item.id }).engagementProduct;
      break;
    case 'pendant':
      link = routing({slug: item.slug, id: item.id }).catalogProduct;
      break;
    case 'ring':
      link = routing({slug: item.slug, id: item.id}).catalogProduct;
      break;
    case 'earring':
      link = routing({slug: item.slug, id: item.id }).catalogProduct;
    break;
    case 'bracelet':
      link = routing({slug: item.slug, id: item.id }).catalogProduct;
    break;
    default:;
  }

  return (
    <div className="compar">
      <div className="compar__img" onClick={() => push(link)}>
        <ImageLoader
          preloadStyles={{ height: "40px", margin: "5px auto" }}
          src={item.preview_image ? item.preview_image.path.thumb : ""}
          alt={`compare and favorite bar: ${item.slug}`}
        />
      </div>
      <div className="compar__info" onClick={() => push(link)}>
        <p>{item.title}</p>
        <p>{item.subtitle}</p>
      </div>
      <button className="compar__close" onClick={() => remove(item)}>
        <img src={closeSvg} alt="compare and favorite bar close" />
      </button>
    </div>
  );
};

const CompareAndFavoriteBar = ({
  data,
  type,
  lastAction,
  remove,
  removeAll,
  push
}) => {
  const items = data
    .slice(0, 3)
    .map((item, index) => (
      <BarItem
        type={type}
        remove={remove}
        push={push}
        item={item}
        key={`${item.id}_bar_item${index}`}
      />
    ));
  return (
    <div className="compar-row">
      <div className="container">
        <div className="compare-banner">
          {items}

          {data.length > 3 && (
            <div
              className="compar compar--more"
              onClick={() =>
                push(
                  lastAction === "favorite"
                    ? routing(type).favoriteTab
                    : routing(type).compareTab
                )
              }
            >
              {/*<Link to={lastAction === 'favorite' ? routing(type).favoriteTab : routing(type).compareTab}>*/}
              <div className="compar-more">
                <p className="compar-more__number">
                  <span>+</span>
                  {data.length - 3}
                </p>
                <span className="compar-more__text">more products</span>
              </div>
              <div className="compar__img">
                <img src={logoGray} alt="" />
              </div>
              {/*</Link>*/}
            </div>
          )}

          <div className="compar compar--action">
            <div className="compar-action">
              <button
                className="more-btn compar-action__apply"
                onClick={() =>
                  push(
                    lastAction === "favorite"
                      ? routing(type).favoriteTab
                      : routing(type).compareTab
                  )
                }
              >
                {lastAction === "favorite" ? "Watch" : "Compare"} These Items
              </button>
              <button className="compar-action__remove" onClick={removeAll}>
                Clear All Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareAndFavoriteBar;
