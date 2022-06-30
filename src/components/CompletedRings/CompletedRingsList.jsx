import React, { Fragment } from "react";
import CompletedRing from "./Items/CompletedRing";
import routing from "../../config/routing";
import CompleteRingShareButton from './Items/CompleteRingShareButton';
import GoogleEE from '../_common/GoogleEE/GoogleEE';
import { openHubspotChat } from "../../config/hubspot";

export default class CompletedRingsList extends React.Component {
  render() {
    const { keys, items, handleDelete, handleUpdate, history, isSharing, sharingId } = this.props;

    let rings = [];

    if (isSharing) {
      rings = items.map((item, index) => (
        <CompletedRing
          isSharing={isSharing}
          isOne={items.length === 1}
          index={index}
          data={item}
          key={`completed_share_${index}`}
        />
        ))
    } else {
      rings = keys.map((key, index) =>
        items[key].isDeleting ? null : (
          <CompletedRing
            isOne={keys.length === 1}
            index={index}
            data={items[key]}
            position={ index * 2 + 1}
            list={GoogleEE.LIST_RING_CONSTRUCTOR}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={`completed_${items[key].id}`}
          />
        ))
    }

    return (
      <section className="complete-section">
        <div className="container">
          {rings.length ? (
            <Fragment>
              <p className="section-title section-title--type2">
                {isSharing ? `Shared list #${sharingId}` : 'Great choice!'}
              </p>
              {!isSharing && <CompleteRingShareButton/>}
            </Fragment>
          ) : (
            <p className="section-title section-title--type2 text-center">
              No items
            </p>
          )}
          {rings}
          <div className="complete-btns">
            <button className="theme-btn" onClick={() => openHubspotChat()}>Chat with expert</button>

            <button
              className="theme-btn bold"
              onClick={() =>
                history.push(
                  Number(Math.random().toFixed())
                    ? routing().diamondsFeed
                    : routing().engagementFeed
                )
              }
            >
              Create a new ring
            </button>
          </div>
        </div>
      </section>
    );
  }
}
