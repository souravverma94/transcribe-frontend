import firebase from "./firebase";

export const downloadAsTxtFile = (data, fname) => {
  const element = document.createElement("a");
  const file = new Blob([data], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${fname}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export const addTranscript = (pfname = "b2b.mp4", content, user) => {
  pfname = `${pfname.split(".")[0]}_transcript`;
  var postTranscrptRef = firebase.database().ref("transcripts");
  const newPostRef = postTranscrptRef.child(pfname);
  const dttm = new Date().toISOString().replaceAll(".", "");
  const cfname = `${user.email.split("@")[0]}_${dttm}`;
  console.log(cfname);
  newPostRef.child(cfname).set({
    value: content,
  });
};

export const removeTranscript = (pfname = "b2b.mp4", cfname, type) => {
  pfname = `${pfname.split(".")[0]}_${type}`;
  var postTranscrptRef = firebase.database().ref("transcripts");
  const newPostRef = postTranscrptRef.child(pfname);
  newPostRef.child(cfname).remove();
};
