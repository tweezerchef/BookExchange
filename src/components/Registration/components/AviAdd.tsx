import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { FC, ChangeEvent, useState, createRef, useRef } from "react";
import Webcam from "react-webcam";
import Modal from "@mui/material/Modal";
import Cropper from "react-cropper";
import { useFormData } from "../../../context/regContext";
import { HiddenFileInput, LargeAvatar, Wrapper } from "./regCompStyles";
import "cropperjs/dist/cropper.css"; // import styles

const ProfileAvatar: FC = () => {
  const { formData, updateFormData } = useFormData();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const webcamRef = createRef<Webcam>();
  const cropperRef = useRef<Cropper>(null);
  const cropperInstance = useRef<Cropper>(null);

  const onCropperReady = (instance: Cropper) => {
    cropperInstance.current = instance;
  };

  const handleFileUpload = async (file: File) => {
    const formDataNew = new FormData();
    formDataNew.append("file", file);

    try {
      const response = await fetch("/api/AWS/uploadS3", {
        method: "POST",
        body: formDataNew,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const data = (await response.json()) as { url: string };
      const fileUrl = data.url;
      console.log(fileUrl);
      setAvatarUrl(fileUrl);
      updateFormData({ avatarUrl: fileUrl });
      // Update the avatar URL to display the new image
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    void handleFileUpload(file);
  };
  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc);
  };
  const handleUseCapturedImage = async () => {
    if (cropperRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const cropperInstance = cropperRef.current.cropper; // Access the cropperjs instance
      const canvas = cropperInstance.getCroppedCanvas(); // Now call getCroppedCanvas on the cropperjs instance
      if (!canvas) {
        // handle error
        return;
      }
      const croppedImage = canvas.toDataURL();
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], "captured-image.jpg", { type: blob.type });

      await handleFileUpload(file);

      setCapturedImage(null); // Reset the captured image URL
      setIsCameraOpen(false); // Close the camera
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
            >
              <LargeAvatar src={avatarUrl} />
            </IconButton>
          </label>
          <IconButton color='default' onClick={() => setIsCameraOpen(true)}>
            <CameraAltIcon />
          </IconButton>
        </>
      )}
      <Modal open={!!capturedImage} onClose={() => setCapturedImage(null)}>
        <div>
          {capturedImage && (
            <>
              <Cropper
                src={capturedImage}
                ref={cropperRef}
                ready={() => onCropperReady(cropperInstance.current)}
                style={{ height: 400, width: "100%" }}
                aspectRatio={1}
                guides={false}
              />
              <button type='button' onClick={handleUseCapturedImage}>
                Use this photo
              </button>
              <button type='button' onClick={() => setCapturedImage(null)}>
                Retake
              </button>
            </>
          )}
        </div>
      </Modal>
    </Wrapper>
  );
};

export default ProfileAvatar;
