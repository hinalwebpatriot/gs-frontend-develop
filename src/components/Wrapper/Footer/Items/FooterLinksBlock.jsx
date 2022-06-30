import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../config/routing";

export default class FooterLinksBlock extends React.Component {
  render() {
    return (
      <div className="sub-nav sub-nav--f-type mobile-f-line ">
        <ul className="sub-nav__list">
          <li>
            <Link to={routing().startWith4ct}>Guide</Link>
            {/*<Link to={routing().guide}>Guide</Link>*/}
          </li>
          {/* <li>
            <Link to={routing().giftIdeas}>Gift Ideas</Link>
          </li> */}
          <li>
            <Link to={routing().sitemap}>Sitemap</Link>
          </li>
          
          <li>
            <Link to={routing().blog} className="nav-sale-link">
              Blog
            </Link>
          </li>
          <li>
            <Link to={routing().sale} className="nav-sale-link">
              Sale
            </Link>
          </li>
          <li>
            <Link to={routing().reviews}>Customer Reviews</Link>
          </li>
          <li>
            <Link to={routing().privacyPolicy} className="reg-link">
              Privacy Policy
            </Link>
          </li>
        </ul>
        <ul className="sub-nav__list">
          <li>
            <Link to={routing().customerCare}>Customer Care</Link>
          </li>
          <li>
            <Link to={routing().about}>About</Link>
          </li>
          <li>
            <Link to={routing().contactUs}>Contact Us</Link>
          </li>
          <li>
            <Link to={routing().ourGuarantees}>Our Guarantees</Link>
          </li>
          <li>
            <Link to={routing().faq}>Frequently Asked Questions</Link>
          </li>
          <li>
            <Link to={routing().terms} className="reg-link">
              Terms And Conditions
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
