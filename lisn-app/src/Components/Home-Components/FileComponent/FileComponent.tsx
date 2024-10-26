import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import "./FileComponent.css";

interface FileComponentProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  fileDropComponent: React.ReactNode; // Add the file drop component as a prop
}

function FileComponent({
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
      className={`centered-flex custom-flex ${dragActive ? "drag-active" : ""}`}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <Label htmlFor="dropzone-file" className="custom-flex">
        <div className="centered-flex-padding">
          {fileDropComponent} {/* Use the passed file drop component here */}
          <p className="small-text-margin font-semibold">
            {text ? text : `Click or drag & drop your audio file here`}
          </p>
          <p className="smaller-text-margin font-semibold">
            or choose your file to upload
          </p>
        </div>
        <FileInput id="dropzone-file" className="hidden" onChange={onChange} />
      </Label>
    </div>
  );
}

export default FileComponent;
