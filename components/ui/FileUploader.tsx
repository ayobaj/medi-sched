"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
    files: File[] | undefined;
        onChange: (files: File[]) => void;
    };

    export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
        const onDrop = useCallback((acceptedFiles: File[]) => {
            onChange(acceptedFiles);
    }, []); // Empty dependecy to run once

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

return (
    <div {...getRootProps()} className="file-upload">
    <input {...getInputProps()} />
    {files && files?.length > 0 ? (
        <Image
        src={convertFileToUrl(files[0])}
        width={1000}
        height={1000}
        alt="uploaded image"
        className="max-h-[400px] overflow-hidden object-cover"
        />
    ) : (
        <>

        <IoCloudUploadOutline className="text-xl text-indigo-500"/>

        <div className="file-upload_label">
            <p className="text-14-regular ">
            <span className="text-indigo-500">click or drag or drop to upload </span>
            </p>
        </div>
        </>
    )}
    </div>
);
};