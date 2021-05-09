import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ReactPlayer from "react-player/lazy";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SavedNotes from "./SavedNotes";
import AutomatedText from "./AutomatedText";
import SelectButton from "./SelectButton";
import { downloadAsTxtFile, addTranscript } from "./util";
import "./Home.css";

const Home = ({ user }) => {
  const [value, setValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleSaveAs = (data, fname) => {
    fname = `${fname.split(".")[0]}_notes`;
    downloadAsTxtFile(data, fname);
  };

  const handleStart = () => {
    setIsStart((prevState) => !prevState);
  };

  const handleSave = (fname, notes, user) => {
    addTranscript(fname, notes, user);
  };

  const handleSeek = (Ref, val) => {
    const currTime = Ref.current.getCurrentTime();
    Ref.current.seekTo(currTime + val, "seconds");
  };

  const handleOnProgress = (current) => {
    setCurrentTime(current.playedSeconds);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div style={{ backgroundColor: "black" }}>
            <ReactPlayer
              ref={playerRef}
              url={`videos/${filename}`}
              controls={true}
              playing={isPlaying}
              onPause={handlePause}
              onProgress={(e) => {
                handleOnProgress(e);
              }}
            />
          </div>
          <div id="upload-btn">
            <SelectButton
              setFilename={setFilename}
              setIsLoading={setIsLoading}
            />
            &nbsp;
            {isLoading ? <CircularProgress /> : null}
            <ButtonGroup
              className="seekbtngrp"
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button
                startIcon={<ArrowBackIosIcon />}
                onClick={() => handleSeek(playerRef, -0.3)}
              >
                30ms
              </Button>
              <Button
                startIcon={<ArrowBackIosIcon />}
                onClick={() => handleSeek(playerRef, -0.2)}
              >
                20ms
              </Button>
              <Button
                startIcon={<ArrowBackIosIcon />}
                onClick={() => handleSeek(playerRef, -0.1)}
              >
                10ms
              </Button>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => handleSeek(playerRef, 0.1)}
              >
                10ms
              </Button>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => handleSeek(playerRef, 0.2)}
              >
                20ms
              </Button>
              <Button
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => handleSeek(playerRef, 0.3)}
              >
                30ms
              </Button>
            </ButtonGroup>
            <p id="elapsedtime">Elapsed: {currentTime.toFixed(2)} seconds</p>
          </div>
          &nbsp;
          <div>
            <Button variant="contained" disabled={false} onClick={handleStart}>
              Start
            </Button>
          </div>
        </Grid>
        <Grid item xs={3}>
          <AutomatedText
            updateIsPlaying={setIsPlaying}
            isPlaying={isPlaying}
            isStart={isStart}
            filename={filename}
            setIsLoading={setIsLoading}
            setNotes={setValue}
          />
        </Grid>
        <Grid item xs={3}>
          <form id="txt-notes" noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows={16}
              value={value}
              onChange={handleChange}
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleClear}>
              Clear
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(filename, value, user)}
            >
              Submit
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveAs(value, filename)}
            >
              Save As
            </Button>
          </form>
        </Grid>
      </Grid>
      <SavedNotes filename={filename} />
    </div>
  );
};

export default Home;
