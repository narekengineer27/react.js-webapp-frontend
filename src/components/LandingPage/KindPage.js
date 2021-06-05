import React from "react";
var Translate = require('react-redux-i18n').Translate;

class KindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      recActive: false,
      verActive: false,
      entActive: false,
      proActive: false,
      sorActive: false
    };
  }

  showImage = activeName => {
    const state = this.state;
    state.recActive = false;
    state.verActive = false;
    state.entActive = false;
    state.proActive = false;
    state.sorActive = false;
    state[activeName] = true;
    this.setState(state);
  };

  render() {
    const {
      recActive,
      verActive,
      entActive,
      proActive,
      sorActive
    } = this.state;
    return (
      <div className="landing-main">
        <span
          className={`rec-deactive ${recActive && "rec-active"}`}
          onMouseEnter={() => this.showImage("recActive")}
        >
          <Translate value="landing.kind_recycle" />
        </span>
        <span
          className={`ver-deactive ${verActive && "rec-active"}`}
          onMouseEnter={() => this.showImage("verActive")}
        >
          <Translate value="landing.kind_processors" />
        </span>
        <span
          className={`ent-deactive ${entActive && "ent-active"}`}
          onMouseEnter={() => this.showImage("entActive")}
        >
          <Translate value="landing.kind_disposers" />
        </span>
        <span
          className={`pro-deactive ${proActive && "pro-active"}`}
          onMouseEnter={() => this.showImage("proActive")}
        >
          <Translate value="landing.kind_producers" />
        </span>
        <span
          className={`sor-deactive ${sorActive && "pro-active"}`}
          onMouseEnter={() => this.showImage("sorActive")}
        >
          <Translate value="landing.kind_sorters" />
        </span>
        <img
          className={`kind-logo-img ${!recActive &&
            !verActive &&
            !entActive &&
            !proActive &&
            !sorActive &&
            "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/PlastPlace_Logo_white.png"}
          alt=""
        />
        <img
          className={`landing-image ${recActive && "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/recycle.png"}
          alt=""
        />
        <img
          className={`landing-image ${verActive && "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/gear.png"}
          alt=""
        />
        <img
          className={`landing-image ${entActive && "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/process.png"}
          alt=""
        />
        <img
          className={`landing-image ${proActive && "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/produce.png"}
          alt=""
        />
        <img
          className={`landing-image ${sorActive && "show-image"}`}
          src={"https://plast-asset.s3.amazonaws.com/filter.png"}
          alt=""
        />
      </div>
    );
  }
}

export default KindPage;
