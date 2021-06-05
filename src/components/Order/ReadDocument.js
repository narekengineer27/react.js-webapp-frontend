import React from "react";
import { MDBTabPane } from "mdbreact";
import { createNotification } from "../../utils/notification";
import NextButton from "./NextButton";

class ReadDocument extends React.Component {
  state = {
    checkedRead: false
  };

  handleCheckRead = checked => {
    this.setState({ checkedRead: checked });
  };

  handleClickNext = e => {
    if (this.state.checkedRead) this.props.onClickNext(e);
    else createNotification("⚠️ Confirm below if you have read.", "info");
  };

  render = () => {
    return (
      <MDBTabPane tabId="3" role="tabpanel">
        <div className="order-wrapper">
          {this.renderTitle()}
          {this.renderShortText()}
          {this.renderDocumentContainer()}
          {this.renderNextButton()}
        </div>
      </MDBTabPane>
    );
  };

  renderTitle = () => <div className="title text-center">Documents</div>;

  renderShortText = () => (
    <div className="short-text text-center mb-5">
      Check below that you read the necessary documents.
    </div>
  );

  renderDocumentContainer = () => (
    <div className="document-container">
      {this.renderDocument()}
      {this.renderCheckBox()}
    </div>
  );

  renderDocument = () => (
    <div className="document">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo
      vel orci. Tristique senectus et netus et malesuada fames ac turpis
      egestas. Sit amet nisl purus in. Et malesuada fames ac turpis egestas sed
      tempus urna et. Sit amet volutpat consequat mauris nunc congue nisi vitae
      suscipit. Tellus in metus vulputate eu scelerisque. Urna cursus eget nunc
      scelerisque viverra mauris in aliquam. Leo in vitae turpis massa sed
      elementum. A pellentesque sit amet porttitor. Eu nisl nunc mi ipsum
      faucibus vitae aliquet nec ullamcorper. Arcu non odio euismod lacinia at
      quis risus sed vulputate. Quis viverra nibh cras pulvinar mattis nunc sed
      blandit. Adipiscing elit pellentesque habitant morbi. Ipsum dolor sit amet
      consectetur adipiscing. Lorem ipsum dolor sit amet consectetur adipiscing
      elit. Eget mauris pharetra et ultrices neque ornare aenean euismod
      elementum. Nullam eget felis eget nunc. Vel risus commodo viverra maecenas
      accumsan lacus. Aliquam nulla facilisi cras fermentum. Urna duis convallis
      convallis tellus id interdum velit laoreet. Adipiscing elit ut aliquam
      purus sit. Maecenas ultricies mi eget mauris pharetra et ultrices. Vitae
      elementum curabitur vitae nunc. Commodo sed egestas egestas fringilla
      phasellus faucibus scelerisque. Ut consequat semper viverra nam libero
      justo. Ultrices in iaculis nunc sed augue lacus. Arcu bibendum at varius
      vel. Maecenas pharetra convallis posuere morbi leo urna molestie at.
      Volutpat odio facilisis mauris sit amet massa vitae tortor condimentum.
      Sed risus ultricies tristique nulla aliquet enim tortor at auctor. A
      scelerisque purus semper eget duis at tellus at. Nunc sed velit dignissim
      sodales ut eu sem. Diam sit amet nisl suscipit adipiscing. In arcu cursus
      euismod quis viverra nibh cras. Amet volutpat consequat mauris nunc
      congue. In fermentum posuere urna nec tincidunt. Vitae elementum curabitur
      vitae nunc sed velit. Tristique risus nec feugiat in fermentum posuere
      urna nec. Mauris nunc congue nisi vitae suscipit tellus mauris a diam.
      Consequat ac felis donec et odio. Nibh sed pulvinar proin gravida
      hendrerit lectus. Urna et pharetra pharetra massa massa. Viverra nam
      libero justo laoreet sit. Nec feugiat nisl pretium fusce id velit ut
      tortor. Tristique risus nec feugiat in. Magna sit amet purus gravida quis
      blandit turpis cursus. Scelerisque felis imperdiet proin fermentum leo vel
      orci. Gravida cum sociis natoque penatibus et. Euismod lacinia at quis
      risus sed vulputate odio ut enim. Adipiscing at in tellus integer feugiat
      scelerisque varius morbi enim. Eleifend quam adipiscing vitae proin
      sagittis nisl rhoncus mattis. Tortor id aliquet lectus proin. Scelerisque
      in dictum non consectetur a erat nam. Ullamcorper morbi tincidunt ornare
      massa eget egestas purus viverra. Pulvinar mattis nunc sed blandit libero
      volutpat sed cras ornare. Lacus sed turpis tincidunt id aliquet. Sed
      libero enim sed faucibus. Ultrices in iaculis nunc sed. Massa massa
      ultricies mi quis hendrerit dolor magna. Suspendisse ultrices gravida
      dictum fusce ut. Proin nibh nisl condimentum id venenatis. Tortor pretium
      viverra suspendisse potenti nullam ac tortor. Bibendum enim facilisis
      gravida neque convallis a cras semper auctor. Et ultrices neque ornare
      aenean euismod elementum nisi quis. Risus ultricies tristique nulla
      aliquet. A lacus vestibulum sed arcu non odio euismod lacinia. Malesuada
      pellentesque elit eget gravida. Duis ut diam quam nulla. Enim ut tellus
      elementum sagittis vitae et leo. Sapien eget mi proin sed libero enim sed
      faucibus turpis. Vel facilisis volutpat est velit egestas. Bibendum at
      varius vel pharetra vel turpis nunc eget. Pretium aenean pharetra magna ac
      placerat vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt.
      Neque laoreet suspendisse interdum consectetur libero id faucibus nisl
      tincidunt. In hendrerit gravida rutrum quisque non tellus orci ac auctor.
    </div>
  );

  renderCheckBox = () => (
    <div className="checkbox-container">
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id="checkRead"
          onChange={e => this.handleCheckRead(e.target.checked)}
        />
        <label className="custom-control-label" htmlFor="checkRead">
          I have read the documents.
        </label>
      </div>
    </div>
  );

  renderNextButton = () => <NextButton onClickNext={this.handleClickNext} />;
}

export default ReadDocument;
