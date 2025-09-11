import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const Markdown = () => {
  const [markdownText, setMarkdownText] = useState("");

  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
    setMarkdownText(text);
  };

  return (
    <MdEditor
      value={markdownText}
      style={{ height: "400px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default Markdown;
