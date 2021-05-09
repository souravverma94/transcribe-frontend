import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { downloadAsTxtFile } from "./util";
import axios from "axios";

const AutomatedText = ({ isStart, filename, setIsLoading, setNotes }) => {
  const [transcript, setTranscript] = useState("");
  const [rawText, setRawText] = useState([]);
  const [textrate, setTextrate] = useState(500);

  useEffect(() => {
    const fetchData = async (file_name) => {
      axios
        .get(`http://127.0.0.1:5000/transcribe/${file_name}`)
        .then(function (response) {
          // handle success
          setIsLoading(false);
          const raw_text = response.data.raw_text.split(" ");
          setRawText(raw_text);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };

    if (filename && filename !== "") fetchData(filename);
    if (isStart && rawText.length > 0) {
      rawText.forEach((word, i) => {
        setTimeout(() => {
          setTranscript((prev) => `${prev} ${word}`);
        }, i * textrate);
      });
    }
  }, [filename, isStart]);

  const handleChange = (event) => {
    setTranscript(event.target.value);
  };

  const handleClear = () => {
    setTranscript([""]);
  };

  const handleSaveAs = (data, fname) => {
    fname = `${fname.split(".")[0]}_transcript`;
    downloadAsTxtFile(data, fname);
  };

  const handleCopyToNotes = () => {
    setNotes(transcript);
  };

  return (
    <form id="auto-text" noValidate autoComplete="off">
      <TextField
        id="outlined-multiline-static"
        label="Automated Text"
        multiline
        rows={16}
        variant="outlined"
        value={transcript}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleClear}>
        Clear
      </Button>
      &nbsp;
      <Button variant="contained" color="primary" onClick={handleCopyToNotes}>
        Copy to Notes
      </Button>
      &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSaveAs(transcript, filename)}
      >
        Save As
      </Button>
    </form>
  );
};

export default AutomatedText;
