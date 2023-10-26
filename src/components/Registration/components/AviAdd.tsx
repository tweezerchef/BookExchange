import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  FC,
  ChangeEvent,
  useState,
  createRef,
  useRef,
  MouseEvent,
} from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import { ReactCropperElement } from "react-cropper";
import { useFormData } from "../../../context/regContext";
import { HiddenFileInput, LargeAvatar, Wrapper } from "./regCompStyles";
import "cropperjs/dist/cropper.css";
import { CropperComp } from "./CropperComp";

interface CropperInstance {
  cropper: Cropper;
  getCroppedCanvas(): HTMLCanvasElement | null;
}

const ProfileAvatar: FC = () => {
  const { formData, updateFormData } = useFormData();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const [cropper, setCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const webcamRef = createRef<Webcam>();
  const cropperRef = useRef<
    HTMLImageElement | CropperInstance | ReactCropperElement
  >(null);
  const cropperInstance = useRef<Cropper>(null);

  const onCropperClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCropper(true);
  };

  const onCropperReady = (instance: Cropper) => {
    cropperInstance.current = instance;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    // eslint-disable-next-line no-useless-return
    if (!file) return;

    // void handleFileUpload(file);
  };

  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setOriginalImage(imageSrc); // Set original image
    setCapturedImage(imageSrc);
    setAvatarUrl(imageSrc || avatarUrl);
    setIsCameraOpen(false);
  };

  const handleUseCapturedImage = async (): Promise<void> => {
    setCropper(false);

    if (cropperRef.current) {
      const newCropperInstance = (cropperRef.current as ReactCropperElement)
        .cropper;
      const canvas = newCropperInstance.getCroppedCanvas();
      if (!canvas) {
        console.error("Failed to get cropped canvas");
        return;
      }
      const croppedImage = canvas.toDataURL();
      setAvatarUrl(croppedImage);
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      // add User.id to "capturedImage"
      const file = new File([blob], "captured-image.jpg", { type: blob.type });

      void setCapturedImage(null);
      void setIsCameraOpen(false);
    } else {
      // Handle other cases
      console.error(
        "Unexpected type for cropperRef.current:",
        cropperRef.current
      );
    }
  };

  return (
    <Wrapper>
      {isCameraOpen ? (
        <>
          <Webcam ref={webcamRef} screenshotFormat='image/jpeg' />
          <IconButton color='default' onClick={handleCameraCapture}>
            <CameraAltIcon />
          </IconButton>
          <IconButton color='default' onClick={() => setIsCameraOpen(false)}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          {avatarUrl !== "https://www.w3schools.com/howto/img_avatar.png" && (
            <>
              <Button onClick={onCropperClick}>Crop Your Photo</Button>
              {cropper && (
                <CropperComp
                  cropperRef={cropperRef}
                  cropperInstance={cropperInstance}
                  originalImage={originalImage}
                  onCropperReady={onCropperReady}
                  setCapturedImage={setCapturedImage}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  handleUseCapturedImage={handleUseCapturedImage}
                />
              )}
            </>
          )}
          <LargeAvatar src={avatarUrl} />
          <HiddenFileInput
            accept='image/*'
            id='icon-button-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='icon-button-file'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            />
          </label>
          <IconButton color='default' onClick={() => setIsCameraOpen(true)}>
            <CameraAltIcon />
          </IconButton>
        </>
      )}
    </Wrapper>
  );
};

export default ProfileAvatar;

// const handleFileUpload = async (file: File) => {
//   const formDataNew = new FormData();
//   formDataNew.append("file", file);

//   try {
//     const response = await fetch("/api/AWS/uploadS3", {
//       method: "POST",
//       body: formDataNew,
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to upload file: ${response.statusText}`);
//     }

//     const data = (await response.json()) as { url: string };
//     const fileUrl = data.url;
//     setAvatarUrl(fileUrl);
//     updateFormData({ avatarUrl: fileUrl });
//     // Update the avatar URL to display the new image
//   } catch (error) {
//     console.error("Error uploading file: ", error);
//   }
// };

// try {
//   await handleFileUpload(file);
// } catch (error) {
//   console.error("Failed to upload file:", error);
// }
