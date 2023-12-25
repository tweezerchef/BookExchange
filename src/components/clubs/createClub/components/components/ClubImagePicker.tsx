import { ChangeEvent, FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";

interface ClubImagePickerProps {
  clubImage: string;
  setClubImage: React.Dispatch<React.SetStateAction<string>>;
  clubName: string;
}

export const ClubImagePicker: FC<ClubImagePickerProps> = ({
  clubImage,
  setClubImage,
  clubName,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setClubImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        accept='image/*'
        style={{ display: "none" }}
        id='icon-button-file'
        type='file'
        onChange={handleFileChange}
      />
      <label htmlFor='icon-button-file'>
        <Tooltip title='Choose From An Existing File' arrow placement='top-end'>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='span'
          >
            <UploadFileIcon style={{ fontSize: "3.3rem" }} />
          </IconButton>
        </Tooltip>
      </label>
      {/* Image Preview */}
      {clubImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={clubImage}
            alt='Club'
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
};
