import React, { Fragment } from "react";
import Breadcrumbs from "../../_common/Breadcrumbs/Breadcrumbs";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import IconFA from '../../_common/IconFA';
import MetaTags from '../../_common/SEO/MetaTags';

export default class QuestionsPage extends React.Component {
  state = {
    opened: []
  };

  handleToggle = id => {
    const { opened } = this.state;
    if (opened.includes(id)) {
      this.setState({
        opened: opened.filter(item => item !== id)
      });
    } else {
      this.setState({
        opened: [...opened, id]
      });
    }
  };

  render() {
    const { opened } = this.state;
    const { data = [], fullPage=false } = this.props;
    if (!data) return null;
    const tabs = data.map((item, index) => {
      const isActive = opened.includes(index);

      return (
        <div
          className={`faq-item ${isActive ? "active" : ""}`}
          key={`faq_${index}`}
          onClick={() => this.handleToggle(index)}
        >
          <a className="faq-item__title">
            {item.title}
            <span className="faq-icon">
              <IconFA  icon={faAngleDown} transform={{ rotate: isActive ? 180 : 0 }}/>
            </span>
          </a>
          <div className="faq-text">
            <p className="info-p info-p--type2">{item.text || item.content}</p>
          </div>
        </div>
      );
    });

    return (
      <Fragment>
        <section className="faq-section" style={{ minHeight: fullPage ? "100vh" : 'max-content' }}>
          <div className="container">
            <p className="section-title">Frequently Asked Questions</p>
            <div className="faq-container">{tabs}</div>
          </div>
        </section>
      </Fragment>
    );
  }
}
