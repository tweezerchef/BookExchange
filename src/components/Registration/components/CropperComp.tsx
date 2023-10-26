import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FC, RefObject, MutableRefObject, MouseEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface CropperInstance {
  getCroppedCanvas(): HTMLCanvasElement | null;
  cropper: Cropper;
}

interface CropperCompProps {
  cropperRef: RefObject<
    HTMLImageElement | CropperInstance | ReactCropperElement
  >;
  cropperInstance: MutableRefObject<Cropper>;
  originalImage: string;
  onCropperReady: (instance: Cropper) => void;
  onCropperClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCroppedImage: () => void;
}

export const CropperComp: FC<CropperCompProps> = ({
  originalImage,
  onCropperReady,
  onCropperClick,
  handleCroppedImage,
  cropperRef,
  cropperInstance,
}) => (
  <Modal
    open // Adjust this according to your state management for opening and closing the modal.
    onClose={onCropperClick} // Assuming that onCropperClick is the function to close the modal.
    aria-labelledby='cropper-modal-title'
    aria-describedby='cropper-modal-description'
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
      <Cropper
        src={originalImage}
        ref={cropperRef as RefObject<ReactCropperElement>}
        ready={() => onCropperReady(cropperInstance.current)}
        viewMode={1}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          marginTop: "auto",
        }}
      >
        <Button variant='contained' onClick={handleCroppedImage as () => void}>
          Crop
        </Button>
        <Button variant='contained' onClick={onCropperClick}>
          Go Back
        </Button>
      </Box>
    </Box>
  </Modal>
);
