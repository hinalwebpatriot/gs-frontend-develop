import React from "react";
import axios from "axios";

const withFetch = (fetchUrl, params) => Component => {
  return class WithFetchHOC extends React.Component {
    state = {
      status: "request",
      data: null
    };

    componentDidMount() {
      if (typeof this._source !== typeof undefined) {
        this._source.cancel("Double request");
      }

      this._source = axios.CancelToken.source();

      let args = [];
      const config = {
        cancelToken: this._source.token
      };

      if (params) {
        args = [params, config];
      } else {
        args = [config];
      }

      fetchUrl(...args)
        .then(res => {
          if (res.status === 200) {
            this.setState({
              status: "success",
              data: res.data
            });
          }
        })
        .catch(err => {
          if (axios.isCancel(err)) {
          } else {
            this.setState({
              status: "failure"
            });
          }
        });
    }

    componentWillUnmount() {
      if (typeof this._source != typeof undefined) {
        this._source.cancel(
          `Unmount component ${Component.displayName || Component.name || ""}`
        );
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
};

export default withFetch;
