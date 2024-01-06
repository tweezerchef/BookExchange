import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClubPage(props) {
  const router = useRouter();
  const { clubId } = router.query;

  return (
    <div>
      <h1>Club Page</h1>
      <p>Club ID: {clubId}</p>
    </div>
  );
}
