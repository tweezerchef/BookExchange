import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { ChangeEvent, FC } from "react";

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

interface ProfileAvatarProps {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ onFileChange }) => (
  <Wrapper>
    <HiddenFileInput
      accept='image/*'
      id='icon-button-file'
      type='file'
      onChange={onFileChange}
    />

    <IconButton color='primary' aria-label='upload picture' component='span'>
      <LargeAvatar src='https://www.w3schools.com/howto/img_avatar.png' />
    </IconButton>
  </Wrapper>
);

export default ProfileAvatar;
