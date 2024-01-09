import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClubPage(props) {
  const router = useRouter();
  const { clubId } = router.query;
  const getClub = async () => {
    const res = await fetch(`/api/clubs/getClub?clubId=${clubId}`);
    const json = await res.json();
    console.log(json);
  };
  useEffect(() => {
    if (!clubId) return;
    getClub();
  });

  return (
    <div>
      <h1>Club Page</h1>
      <p>Club ID: {clubId}</p>
    </div>
  );
}
