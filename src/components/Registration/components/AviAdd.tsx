import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ToolTip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  FC,
  ChangeEvent,
  useState,
  createRef,
  useRef,
  MouseEvent,
} from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import { ReactCropperElement } from "react-cropper";
import { Typography } from "@mui/material";
import { dataURLtoBlob } from "../../../utils/clientUtils/dataURLtoBlob";
import { useFormData } from "../../../context/regContext";
import { HiddenFileInput, LargeAvatar, Wrapper } from "./regCompStyles";
import "cropperjs/dist/cropper.css";
import { CropperComp } from "./CropperComp";

interface CropperInstance {
  cropper: Cropper;
  getCroppedCanvas(): HTMLCanvasElement | null;
}

const ProfileAvatar: FC = () => {
  const { updateAviFileData } = useFormData();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  const [cropper, setCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const webcamRef = createRef<Webcam>();
  const cropperRef = useRef<
    HTMLImageElement | CropperInstance | ReactCropperElement
  >(null);
  const cropperInstance = useRef<Cropper>(null);

  const onCropperClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (cropper === false) {
      setCropper(true);
    } else {
      setCropper(false);
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
    setIsCameraOpen(true); // Set isCameraOpen to true when modal opens
  };

  const handleClose = () => {
    setOpenModal(false);
    setIsCameraOpen(false); // Set isCameraOpen to false when modal closes
  };

  const onCropperReady = (instance: Cropper) => {
    cropperInstance.current = instance;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    updateAviFileData(file);
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    const imageBlob = dataURLtoBlob(imageSrc);
    const file = new File([imageBlob], "userAvi.jpg", { type: imageBlob.type });

    updateAviFileData(file);
    setOriginalImage(imageSrc); // Set original image
    setCapturedImage(imageSrc);
    setAvatarUrl(imageSrc || avatarUrl);
    setIsCameraOpen(false);
    setOpenModal(false);
  };

  const handleCroppedImage = () => {
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
      // add User.id to "capturedImage"
      const imageBlob = dataURLtoBlob(croppedImage);
      const file = new File([imageBlob], "userAvi.jpg", {
        type: imageBlob.type,
      });
      updateAviFileData(file);

      void setCapturedImage(null);
      void setIsCameraOpen(false);
    } else {
      console.error(
        "Unexpected type for cropperRef.current:",
        cropperRef.current
      );
    }
  };

  return (
    <Box>
      <Typography variant='h6'>Create Your Avatar</Typography>
      <Wrapper>
        <>
          {avatarUrl !== "https://www.w3schools.com/howto/img_avatar.png" && (
            <>
              {cropper === false && (
                <Button
                  variant='contained'
                  size='small'
                  onClick={onCropperClick}
                  sx={{ marginRight: "1rem" }}
                >
                  Crop
                  <br />
                  Your
                  <br />
                  Photo
                </Button>
              )}
              {cropper && (
                <CropperComp
                  cropperRef={cropperRef}
                  cropperInstance={cropperInstance}
                  originalImage={originalImage}
                  onCropperReady={onCropperReady}
                  onCropperClick={onCropperClick}
                  handleCroppedImage={handleCroppedImage}
                />
              )}
            </>
          )}
          <ToolTip title='AVI Preview' arrow>
            <LargeAvatar src={avatarUrl} />
          </ToolTip>
          <HiddenFileInput
            accept='image/*'
            id='icon-button-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='icon-button-file'>
            <ToolTip title='Choose From An Existing File' arrow>
              <IconButton
                size='large'
                color='primary'
                aria-label='upload picture'
                component='span'
              >
                <UploadFileIcon style={{ fontSize: "3.3rem" }} />
              </IconButton>
            </ToolTip>
          </label>
          <ToolTip title='Take a photo with your webcam' arrow>
            <IconButton color='primary' size='large' onClick={handleOpen}>
              <CameraAltIcon style={{ fontSize: "3.3rem" }} />
            </IconButton>
          </ToolTip>

          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby='webcam-modal-title'
            aria-describedby='webcam-modal-description'
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                width: "640px",
                height: "525px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Webcam ref={webcamRef} screenshotFormat='image/jpeg' />
              <Box sx={{ display: "flex", marginTop: "auto" }}>
                <IconButton
                  color='success'
                  size='large'
                  onClick={handleCameraCapture}
                >
                  <CameraAltIcon style={{ fontSize: "2.7rem" }} />
                </IconButton>
                <IconButton color='error' size='large' onClick={handleClose}>
                  <CloseIcon style={{ fontSize: "2.7rem" }} />
                </IconButton>
              </Box>
            </Box>
          </Modal>
        </>
      </Wrapper>
    </Box>
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
