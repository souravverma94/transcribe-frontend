import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { blue } from "@material-ui/core/colors";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import TextField from "@material-ui/core/TextField";
import { removeTranscript } from "./util";
import firebase from "./firebase";

const SavedNotes = ({ filename }) => {
  const [transcripts, setTranscripts] = useState(null);
  const [currentVal, setCurrentVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const ref = firebase.database().ref().child("transcripts");

  const getTranscripts = (filename) => {
    if (filename !== "") filename = `${filename.split(".")[0]}_transcript`;
    //console.log(filename);
    ref.on("value", (querySnapshot) => {
      const items = querySnapshot.val();
      if (items) {
        setTranscripts(items[filename]);
        setIsLoading(false);
      }
    });
  };

  const handleLoadClick = (event) => {
    setCurrentVal(transcripts[event.currentTarget.value].value);
  };

  const handleDelClick = (event) => {
    removeTranscript(filename, event.currentTarget.value, "transcript");
  };

  const handleSaveText = (event) => {
    setCurrentVal(event.target.value);
  };

  const getListofTranscripts = () => {
    if (transcripts !== undefined) {
      return (
        <List>
          {Object.entries(transcripts).map((ver) => {
            return (
              <ListItem key={ver[0]} button={true}>
                <ListItemAvatar>
                  <Avatar style={{ color: "#fff", backgroundColor: blue[800] }}>
                    <SpeakerNotesIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ver[0]} />
                <ListItemIcon>
                  <IconButton
                    edge={false}
                    aria-label="add"
                    onClick={handleLoadClick}
                    value={ver[0]}
                  >
                    <ExpandLessIcon color="primary" />
                  </IconButton>
                </ListItemIcon>
                {/* <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    value={ver[0]}
                    onClick={handleDelClick}
                  >
                    <DeleteIcon color="primary" />
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
            );
          })}
        </List>
      );
    }
    return <ul></ul>;
  };

  useEffect(() => {
    getTranscripts(filename);
  }, [filename]);

  return (
    <div id="saved-container">
      <h3>Saved Notes:</h3>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {isLoading ? <List></List> : getListofTranscripts()}
        </Grid>

        <Grid item xs={6}>
          <form id="auto-text" noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-static"
              label="Saved Text"
              multiline
              rows={16}
              variant="outlined"
              value={currentVal}
              onChange={handleSaveText}
            />
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SavedNotes;
