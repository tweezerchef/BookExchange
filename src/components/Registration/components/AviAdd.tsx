import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { FC, ChangeEvent } from "react";
import { uploadToS3 } from "../../../utils/s3Upload";
import { useFormData } from "../../../context/regContext";

const Wrapper = styled("div")(({ theme }) => ({
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const HiddenFileInput = styled("input")({
  display: "none",
});

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const ProfileAvatar: FC = () => {
  const { formData, updateFormData } = useFormData();

  const handleFileUpload = async (file: File) => {
    try {
      const fileUrl = await uploadToS3(file);
      updateFormData({ avatarUrl: fileUrl });
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the type here
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    void handleFileUpload(file);
  };

  return (
    <Wrapper>
      <HiddenFileInput
        accept='image/*'
        id='icon-button-file'
        type='file'
        onChange={handleFileChange}
      />

      <IconButton color='primary' aria-label='upload picture' component='span'>
        <LargeAvatar src='https://www.w3schools.com/howto/img_avatar.png' />
      </IconButton>
    </Wrapper>
  );
};

export default ProfileAvatar;
