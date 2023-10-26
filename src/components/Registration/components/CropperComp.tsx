import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { FC, RefObject, MutableRefObject } from "react";
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
  setCapturedImage: (image: string | null) => void;
  handleUseCapturedImage: () => void;
}

export const CropperComp: FC<CropperCompProps> = ({
  originalImage,
  onCropperReady,
  setCapturedImage,
  handleUseCapturedImage,
  cropperRef,
  cropperInstance,
}) => (
  <>
    <Cropper
      src={originalImage}
      ref={cropperRef as RefObject<ReactCropperElement>}
      ready={() => onCropperReady(cropperInstance.current)}
      modal={false}
      viewMode={1}
    />
    <Button type='button' onClick={handleUseCapturedImage as () => void}>
      Use this photo
    </Button>
    <Button type='button' onClick={() => setCapturedImage(null)}>
      Retake
    </Button>
  </>
);
