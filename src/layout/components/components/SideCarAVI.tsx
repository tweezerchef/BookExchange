import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useEffect, FC, useState } from "react";
import { Toolbar } from "@mui/material";
import ToolTip from "@mui/material/Tooltip";

interface SideCarAviProps {
  picture: string;
  userName: string;
}
interface SignedUrlResponse {
  url: string;
}

export const SideCarAVI: FC<SideCarAviProps> = ({ picture, userName }) => {
  const [aviURL, setAviURL] = useState<string>("");

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const response = await fetch(
          `/api/AWS/signedURL?fileNames=${encodeURIComponent(picture)}`
        );
        const data = (await response.json()) as SignedUrlResponse;
        if (!data) return;
        if (!("url" in data)) {
          throw new Error("Invalid response structure");
        }

        setAviURL(data.url);
      } catch (err) {
        console.error(err);
      }
    };
    void fetchSignedUrl();
  });

  return (
    <ToolTip title={userName} arrow placement='top-end'>
      <Avatar
        src={aviURL}
        sx={{
          width: 50,
          height: 50,
          margin: 1,
        }}
      />
    </ToolTip>
  );
};
