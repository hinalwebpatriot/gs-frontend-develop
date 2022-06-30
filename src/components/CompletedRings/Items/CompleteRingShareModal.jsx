import React from "react";
import EnvelopeSvg from "../../../img/jsSvg/EnvelopeSvg";
import CopySvg from "../../../img/jsSvg/CopySvg";
import api from '../../../config/api';
import routing from '../../../config/routing';
import qs from 'qs';
import localeStore from '../../../config/LocalesStore';
import notification from '../../../utils/notification';


export default class CompleteRingShareModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shareUrl: '',
      mailUrl: '',
      status: 'none',
      id: null
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeModalHandler);
    this.setState({
      status: 'request'
    })
    api.constructor.getShareId()
      .then(res => {
        const mailBody = 'See my completed rings here: ';
        const basename = localeStore.localeCode !== "en" ? `${localeStore.localeCode}/` : "";
        const shareUrl = `${document.location.origin}${basename}${routing(res.data.id).completedRingsShare}`;
        const mailUrl = 'mailto:?' + qs.stringify({ body: `${mailBody} ${shareUrl}`, subject: 'My completed rings'});

        this.setState({
          shareUrl: shareUrl,
          mailUrl: mailUrl,
          status: 'success',
          id: res.data.id
        })
      })
      .catch(err => {
        notification('error', 'Something went wrong');
        this.props.handleModal();
      })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeModalHandler)
  }

  closeModalHandler = ({ target }) => {
    if (!target.closest(".share-block") && !target.classList.contains('complete-action__btn')) {
      this.props.handleModal();
    }
  };

  handleCopy = () => {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.clipboard.writeText(this.state.shareUrl).then(() => {
          notification('success', 'Successfully copied')
        }, function() {
          notification('info', 'No permission to copy')
        });
      } else {
        notification('info', 'No permission to copy')
      }
    });
  }

  render() {
    const { shareUrl, mailUrl, status } = this.state;
    const isFetched = status === 'success';
    return (
      <div className="share-block active">
        <div className="share-form">
          <input
            type="text"
            className="share-form__input"
            readOnly
            value={isFetched ? shareUrl : 'Generating...'}
            disabled={!isFetched}
          />
          <button className="theme-btn share-form__btn" disabled={!isFetched} onClick={this.handleCopy}>
            <span>
              <CopySvg />
            </span>
            Copy
          </button>
        </div>

        { isFetched && (
          <div className="share-block__action">
            <a href={mailUrl} className="share-action">
            <span className="share-action__item">
              <span className="share-action__icon">
                <EnvelopeSvg width="24" height="19" />
              </span>
              Email a friend
            </span>
            </a>
            {/*<button className="share-action">*/}
            {/*<span className="share-action__item">*/}
              {/*<span className="share-action__icon">*/}
                {/*<HintHerSvg width="27" height="23" />*/}
              {/*</span>*/}
              {/*Hint him / her*/}
            {/*</span>*/}
            {/*</button>*/}
          </div>
        )}
      </div>
    );
  }
}
