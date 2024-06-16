const axios = require("axios");

async function getAudioBPM(requestFile) {
  songInfo = await axios.post("http://localhost:5003/api/analyze-audio", {
    file: {
      file: requestFile,
    },
  });
}

module.exports = {
  getAudioBPM,
};
