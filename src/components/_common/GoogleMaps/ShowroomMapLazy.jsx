import React from 'react';
import LazyLoadWithServer from '../LazyLoadWithServer';
import loadable from '@loadable/component';
import { Preloader } from '../Preloader';

const ShowroomMap = loadable(
  () =>
    import(/* webpackChunkName: 'google_map'*/ "./ShowroomMap"),
  { fallback: <Preloader /> }
);

export default function ShowroomMapLazy({ location, initialZoom }) {
  return (
    <LazyLoadWithServer height="411px" offset={50} once>
      <ShowroomMap location={location} initialZoom={initialZoom} />
    </LazyLoadWithServer>
  )
}
