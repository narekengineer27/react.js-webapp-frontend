import React from "react";
import PropTypes from "prop-types";

import {
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from "mdbreact";

const BidderListModal = props => {
  const biddersOnlineStatus = props.biddersOnlineStatus;
  return (
    <MDBModal
      isOpen={props.isOpen}
      toggle={props.toggle}
      contentClassName="rounded-lg"
      centered
      size="lg"
    >
      <MDBModalHeader toggle={props.toggle}>Bidders</MDBModalHeader>
      <MDBModalBody>
        {renderTable(
          props.bidders,
          props.listingCurrency,
          biddersOnlineStatus,
          props.isAdmin
        )}
      </MDBModalBody>
    </MDBModal>
  );
};

const renderTable = (bidders, currency, biddersOnlineStatus, isAdmin) => (
  <MDBTable hover>
    {renderTableHead(currency, isAdmin)}
    {renderTableBody(bidders, biddersOnlineStatus, isAdmin)}
  </MDBTable>
);

const renderTableHead = (currency, isAdmin) => (
  <MDBTableHead color="primary-color" textWhite>
    <tr>
      <th>#</th>
      <th>Name</th>
      {isAdmin && <th>Status</th>}
      <th>Country</th>
      <th>{`Price(${currency})`}</th>
      <th>Bidded at</th>
    </tr>
  </MDBTableHead>
);

const renderTableBody = (items, biddersOnlineStatus, isAdmin) => {
  let isOnline = [];
  for (let item of biddersOnlineStatus) {
    isOnline[item.UserId] = item.status;
  }
  return (
    <MDBTableBody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {isAdmin
              ? `${item.User.first_name} ${item.User.last_name}`
              : "**********"}
          </td>
          {isAdmin && isOnline[item.User.id] && (
            <td style={{ color: "#0f0" }}>Online</td>
          )}
          {isAdmin && !isOnline[item.User.id] && (
            <td style={{ color: "#f00" }}>Offline</td>
          )}
          <td>{isAdmin ? item.User.Company.Country.name : "*******"}</td>
          <td>{item.price}</td>
          <td>{new Date(item.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </MDBTableBody>
  );
};

BidderListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default BidderListModal;
