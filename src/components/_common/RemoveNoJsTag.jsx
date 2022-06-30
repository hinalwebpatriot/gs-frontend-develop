import React from 'react';

export default class RemoveNoJsTag extends React.Component {
  componentDidMount() {
    //remove ssr tag for hidden images
    document.documentElement.classList.remove('no-js');
  }

  render() {
    return null
  }
}
