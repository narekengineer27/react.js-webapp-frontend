import React from "react";
import PasswordResetNoteModal from "../../components/Modals/PasswordResetNoteModal";

const PasswordResetNote = props => (
  <PasswordResetNoteModal isOpen={props.isOpen} toggle={props.toggle} />
);

export default PasswordResetNote;
