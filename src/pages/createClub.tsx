import { useEffect, useState } from "react";
import { Books } from "@prisma/client";
import { useHomeState } from "../context/context";

export default function CreateClub() {
  const { user, randomBooks } = useHomeState();
  const [books, setBooks] = useState<Books[]>(randomBooks);
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubImage, setClubImage] = useState("");

  return <h1>Create Club</h1>;
}
