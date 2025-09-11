import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const Markdown = ({ value, onChange }) => {
  const handleEditorChange = ({ html, text }) => {
    onChange({ html, text });
  };

  return (
    <MdEditor
      value={value}
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default Markdown;
