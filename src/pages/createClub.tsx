import { useState } from "react";

export default function CreateClub() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImage, setClubImage] = useState("");

  return <h1>Create Club</h1>;
}
