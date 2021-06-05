import React from "react";
import { MDBIcon } from "mdbreact";

export default function NextButton(props) {
  return (
    <div className="text-center pt-5">
      <div className="button button-blue mb-5 next" onClick={props.onClickNext}>
        {props.loadingSave && (
          <MDBIcon icon="circle-notch" spin size="2x" fixed />
        )}
        {!props.loadingSave && <h4>Next</h4>}
      </div>
    </div>
  );
}
