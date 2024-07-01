"use client";
import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

interface IFile {
  preview: string;
  name: string;
}

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const Dropzone: React.FC<any> = ({ files, setFiles }) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles(newFiles);
      },
    });

  useEffect(() => {
    if (isDragReject) {
      toast.error("You cannot add more than one image.");
    }
  }, [isDragReject]);

  useEffect(() => {
    return () =>
      files.forEach((file: Partial<IFile>) =>
        URL.revokeObjectURL(file.preview!)
      );
  }, [files]);

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ ...style, transition: "border 0.2s ease-in-out" }}
        className="flex items-center justify-center flex-col gap-5 h-40 border-4 border-dotted rounded-lg"
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <aside className="flex flex-wrap gap-2 my-5">
          {files.map((file: Partial<IFile>) => (
            <div key={file.name}>
              <div className="w-32 h-32 border rounded-md p-1">
                <img
                  src={file.preview}
                  className="w-full h-full object-cover"
                  onLoad={() => URL.revokeObjectURL(file.preview!)}
                />
              </div>
            </div>
          ))}
        </aside>
      )}
      <Toaster />
    </div>
  );
};

export default Dropzone;
