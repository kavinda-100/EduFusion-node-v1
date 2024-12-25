import {useState} from "react";
import {toast} from "sonner";


export const useUploadImageToCloud = () => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [imageFileId, setImageFileId] = useState<string | undefined>(undefined);

    const onImageUploadError = (error: any) => {
        console.log("Image Upload Error", error);
        toast.error(error?.message || "Error uploading Image");
        toast.dismiss();
    };
    const onImageUploadSuccess = (success: any) => {
        console.log("Image Upload Success", success);
        const fileUrl = success.url;
        const fileId = success.fileId;
        setImage(fileUrl);
        setImageFileId(fileId);
        toast.success("Image uploaded successfully");
        toast.dismiss();
    };
    const onImageUploadProgress = (progress: ProgressEvent) => {
        console.log("Image Upload Progress", progress);
        toast.loading("Uploading Image...");
    };

    return {image,imageFileId, onImageUploadError, onImageUploadSuccess, onImageUploadProgress}
}