import {useState} from "react";
import {toast} from "sonner";

export const useUploadFileToCloud = () => {
    const [file, setFile] = useState<string | undefined>(undefined);
    const [fileId, setFileId] = useState<string | undefined>(undefined);

    const onFileUploadError = (error: any) => {
        console.log("File Upload Error", error);
        toast.error(error?.message || "Error uploading File");
        toast.dismiss();
    };
    const onFileUploadSuccess = (success: any) => {
        console.log("File Upload Success", success);
        const fileUrl = success.url;
        const fileId = success.fileId;
        setFile(fileUrl);
        setFileId(fileId);
        toast.success("File uploaded successfully");
        toast.dismiss();
    };
    const onFileUploadProgress = (progress: ProgressEvent) => {
        console.log("File Upload Progress", progress);
        toast.loading("Uploading File...");
    };

    return {file,fileId, onFileUploadError, onFileUploadSuccess, onFileUploadProgress}
}