import React from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

import InputLabel from "../../Forms/CreateListingForm/InputLabel";

class Editor extends React.Component {
  render() {
    return (
      <div
        style={{ height: "300px" }}
        ref={editorRef => {
          if (editorRef) {
            editorRef.children[1].children[1].style.border = "none";
            this.props.onRef(editorRef);
          }
        }}
      >
        <InputLabel label={this.props.label} />
        <ReactQuill
          style={{ height: "200px", background: "white" }}
          theme="snow"
          onChange={this.props.onChange}
          value={this.props.value}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

Editor.modules = {
  toolbar: [
    //[{ header: "4" }, { header: "5" }, { header: "6" }, { font: [] }],
    [],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

Editor.propTypes = {
  placeholder: PropTypes.string
};

export default Editor;
