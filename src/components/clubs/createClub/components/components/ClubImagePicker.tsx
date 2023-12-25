import { ChangeEvent, FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

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
  const resetImage = () => {
    setClubImage("");
  };

  return (
    <>
      {!clubImage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "200px",
            marginTop: "20px",
            border: "1px dashed grey", // Optional: adds border to the box
          }}
        >
          <input
            accept='image/*'
            style={{ display: "none" }}
            id='icon-button-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='icon-button-file'>
            <Tooltip
              title='Choose From An Existing File'
              arrow
              placement='top-end'
            >
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
              >
                <UploadFileIcon style={{ fontSize: "3.3rem" }} />
              </IconButton>
            </Tooltip>
          </label>
        </Box>
      )}
      {clubImage && (
        <Box
          style={{
            position: "relative",
            height: "200px",
            width: "200px",
            marginTop: "20px",
          }}
        >
          <Image src={clubImage} alt='Club' fill sizes='200px, 200px' />

          <IconButton
            onClick={resetImage}
            size='large'
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "red",
            }}
            aria-label='reset image'
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};
