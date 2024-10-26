import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import "./FileComponentImage.css";

interface FileComponentProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  fileDropComponent: React.ReactNode; // Add the file drop component as a prop
}

function FileComponentImage({
  onChange,
  text,
  fileDropComponent,
}: FileComponentProps) {
  const [dragActive, setDragActive] = useState(false);

  // Handle drag events
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const fileInput = document.getElementById(
        "dropzone-file"
      ) as HTMLInputElement;
      if (fileInput) {
        const fileList = event.dataTransfer.files;
        fileInput.files = fileList;
        // Trigger the onChange event manually
        const changeEvent = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(changeEvent);
      }
    }
  };

  return (
    <div
      className={`centered-flex-2 custom-flex-2 ${dragActive ? "drag-active" : ""}`}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <Label htmlFor="dropzone-file" className="custom-flex-2">
        <div className="centered-flex-padding-2">
          {fileDropComponent} {/* Use the passed file drop component here */}
          <p className="small-text-margin-2 font-semibold-2">
            {text ? text : `Click or drag & drop your audio file here`}
          </p>
          <p className="smaller-text-margin-2 font-semibold-2">
            or choose your file to upload
          </p>
        </div>
        <FileInput id="dropzone-file-2" className="hidden" onChange={onChange} />
      </Label>
    </div>
  );
}

export default FileComponentImage;
