import React from "react";
import Button from "@material-ui/core/Button";

const SelectButton = ({ setFilename, setIsLoading }) => {
  const handleUpload = (event) => {
    const val = event.target.value.split("\\");
    setFilename(val[val.length - 1]);
    setIsLoading(true);
  };

  return (
    <div>
      <input
        accept="videos/*"
        id="contained-button-file"
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={(event) => handleUpload(event)}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Select File
        </Button>
      </label>
    </div>
  );
};

export default SelectButton;
