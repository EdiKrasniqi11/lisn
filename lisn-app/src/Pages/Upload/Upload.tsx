import { useState, useEffect } from "react";
import Background from "../../Components/Home-Components/Background/Background";
import style from "./Upload.module.css";
import FileComponent from "../../Components/Home-Components/FileComponent/FileComponent";
import FileComponentImage from "../../Components/Home-Components/FileComponentImage/FileComponentImage";
import { fetchGenres } from "../../Data/dataFetching";
import { FileDrop } from "../../Components/Icons/MyIcons";

function Upload() {
  const [audioFile, setAudioFile] = useState<any>();
  const [imageFile, setImageFile] = useState<any>();
  const [audioVisibility, setAudioVisibility] = useState<boolean>(true);
  const toggleSwitch = document.getElementById(`${style.toggle}`);

  useEffect(() => {
    if (audioVisibility && toggleSwitch) {
      toggleSwitch.style.marginLeft = "0px";
    } else if (!audioVisibility && toggleSwitch) {
      toggleSwitch.style.marginLeft = "35.5px";
    }
  }, [audioVisibility]);

  useEffect(() => {
    if (audioFile && !audioFile.type.startsWith("audio/")) {
      alert("The file you are trying to upload is not a valid audio file.");
      setAudioFile(null);
    } else {
      console.log(audioFile);
    }
  }, [audioFile]);

  return (
    <Background id={style.background}>
      <div className={style.containerModal}>
        <div className={style.audioDrop}>
          <FileComponent
            fileDropComponent={<FileDrop id="icon-style" />}
            onChange={(e) => setAudioFile(e.target.files?.[0])}
            text={
              audioFile
                ? `Successfully uploaded ${audioFile.name}`
                : `Drag and drop your audio track`
            }
          />
        </div>
        <form method="POST" className={style.otherData}>
          <div className={style.leftSide}>
            <div className={style.inputContainer}>
              <label className={style.inputLabel}>song name</label>
              <br />
              <input type="text" />
            </div>
            <div className={style.inputContainer}>
              <FileComponentImage
                fileDropComponent={<FileDrop id="icon-style" />}
                onChange={(e) => setImageFile(e.target.files?.[0])}
                text={
                  audioFile
                    ? `Successfully uploaded ${audioFile.name}`
                    : `Drag and drop your image file`
                }
              />
            </div>
          </div>
          <div className={style.middleDiv}>
            <div className={style.inputContainer}>
              <label className={style.inputLabel}>description</label>
              <br />
              <textarea />
            </div>
          </div>
          <div className={style.rightSide}>
            <div className={style.inputContainer}>
              <label
                className={style.inputLabel}
                title="Although it is preferred to input your own BPM (if known) for more accurate placing in playlists. If this field is not filled our system will analyze the audio file inputed to detect a specific tempo"
              >
                bpm <i>(optional)</i>
              </label>
              <br />
              <input type="number" />
            </div>
            <div className={style.inputContainer}>
              <label
                className={style.inputLabel}
                title="Although it is preferred to input your own song key (if known) for more accurate placing in playlists. If this field is not filled our system will analyze the audio file inputed to detect a specific key"
              >
                key <i>(optional)</i>
              </label>
              <br />
              <input type="text" />
            </div>

            <div className={style.inputContainer}>
              <label className={style.inputLabel}>is visible</label>
              <br />
              <div className={style.radioContainer}>
                <div
                  className={style.visibilityToggle}
                  onClick={() => setAudioVisibility(!audioVisibility)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className={style.eyeOpen}
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    className={style.eyeClosed}
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                  <div id={style.toggle}></div>
                </div>
              </div>
            </div>
            <button className={style.uploadButton}>Upload</button>
          </div>
        </form>
      </div>
    </Background>
  );
}

export default Upload;
