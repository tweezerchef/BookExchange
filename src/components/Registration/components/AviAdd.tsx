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
import { useHomeState } from "../../../context/context";
import { dataURLtoBlob } from "../../../utils/clientUtils/dataURLtoBlob";
import { useFormData } from "../../../context/regContext";
import {
  HiddenFileInput,
  LargeAvatar,
  Wrapper,
  BigIconButton,
} from "./regCompStyles";
import "cropperjs/dist/cropper.css";
import { CropperComp } from "./CropperComp";

interface CropperInstance {
  cropper: Cropper;
  getCroppedCanvas(): HTMLCanvasElement | null;
}

const ProfileAvatar: FC = () => {
  const { user } = useHomeState();
  const { updateAviFileData, updateFormData } = useFormData();
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
  const userId = user?.id;

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
  const handleFileUpload = async (file: File) => {
    const fileName = `${userId}userAvi.jpg`;
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
      updateFormData({ avatarUrl: fileName });
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const blob = file.slice(0, file.size, file.type);
    const newFileName = `${userId}userAvi.jpg`;
    const newFile = new File([blob], newFileName, { type: file.type });
    updateAviFileData(newFile);
    void handleFileUpload(newFile);
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
    const file = new File([imageBlob], `${userId}userAvi.jpg`, {
      type: imageBlob.type,
    });

    updateAviFileData(file);
    void handleFileUpload(file);
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
      const file = new File([imageBlob], `${userId}userAvi.jpg`, {
        type: imageBlob.type,
      });
      updateAviFileData(file);
      void handleFileUpload(file);
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
              <BigIconButton
                color='primary'
                aria-label='upload picture'
                onClick={() =>
                  document.getElementById("icon-button-file").click()
                }
              >
                <UploadFileIcon style={{ fontSize: "3.3rem" }} />
              </BigIconButton>
            </ToolTip>
          </label>
          <ToolTip title='Take a photo with your webcam' arrow>
            <BigIconButton color='primary' onClick={handleOpen}>
              <CameraAltIcon style={{ fontSize: "3.3rem" }} />
            </BigIconButton>
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
