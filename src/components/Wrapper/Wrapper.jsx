import React from "react";
import TopHeader from "./TopHeader";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import ShowroomBlockContainer from "../_common/ShowroomBlock/ShowroomBlockContainer";
import CookieNotification from "../_common/CookieNotification";
import ScrollTopButton from '../_common/ScrollTopButton';
import Footer from './Footer/Footer'


export default class Wrapper extends React.Component {

  showRoomRef = React.createRef()
  handleScrollToShowrooms = (elRef) => {
    const el = elRef.current ? elRef.current : null;
    if(el){
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  render() {
    const { children, showroom = true, path } = this.props;

    return (
      <div className="wrapper sticky-header">
        <div className="content">
          {/*<MainMetaTags />*/}
          <TopHeader handleScrollToShowrooms={this.handleScrollToShowrooms} showRoomRef={this.showRoomRef} path={path}/>
          <HeaderMenu path={path} />
          {children}
          {showroom && <ShowroomBlockContainer showRoomRef={this.showRoomRef} />}
          <CookieNotification />
          <ScrollTopButton/>
          <Footer handleScrollToShowrooms={this.handleScrollToShowrooms} showRoomRef={this.showRoomRef}/>
        </div>
      </div>
    );
  }
}
