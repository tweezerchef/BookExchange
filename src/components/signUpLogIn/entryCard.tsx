import Box from "@mui/material/Box";
import Image from "next/image";
const EntryCard: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        padding: "50px",
        margin: "-20px auto 60px",
        boxShadow:
          "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundSize: "cover",
        backgroundImage:
          "url(https://nobe.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2023-05-21+11.31.24+-+create+a+backround+for+the+bottom+of+a+website+that+is+a+social+media+app+for+books.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "start",
          mt: "0",
          width: "280px",
          height: "auto",
          marginTop: "-30px",
          marginBottom: "10px",
          filter: "brightness(1.2) contrast(1.2)",
        }}
      >
        <Image
          src="https://nobe.s3.us-east-2.amazonaws.com/Nobe_Logo.png"
          alt="logo"
          width={280} // You need to provide a width
          height={280} // You need to provide a height, adjust this based on your image's aspect ratio
          layout="responsive" // This will make the image scale based on its parent's width
        />
      </Box>
    </Box>
  );
};
export default EntryCard;
