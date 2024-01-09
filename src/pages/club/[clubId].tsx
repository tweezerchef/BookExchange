import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ClubHeader } from "../../components/clubs/clubPage/ClubHeader";

export default function ClubPage(props) {
  const router = useRouter();
  const { clubId } = router.query;

  const [clubData, setClubData] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      if (clubId) {
        try {
          const res = await fetch(`/api/clubs/getClub?clubId=${clubId}`);
          const json = await res.json();
          setClubData(json);
        } catch (error) {
          console.error("Failed to fetch club data", error);
        }
      }
    };

    fetchClubData();
  }, [clubId]);
  if (!clubData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Club Page</h1>
      <p>Club ID: {clubData.name}</p>
    </div>
  );
}
