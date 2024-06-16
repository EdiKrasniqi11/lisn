import os
from flask import Flask, request, jsonify
import librosa
import numpy as np

app = Flask(__name__)

@app.route('/api/analyze-audio', methods=['POST'])
def analyze_audio():
    try:
        uploaded_file = request.files['file']
        if not uploaded_file:
            return jsonify(error='No file provided'), 400

        temp_path = './temp_audio.wav'
        uploaded_file.save(temp_path)

        y, sr = librosa.load(temp_path, sr=None)

        tempo = librosa.beat.tempo(y=y, sr=sr)[0]

        chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
        chroma_vals = np.sum(chroma, axis=1)
        most_common_pc = np.argmax(chroma_vals)
        note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        key = note_names[most_common_pc]

        os.remove(temp_path)

        return jsonify(tempo=round(tempo), key=key)

    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5007, debug=True)
