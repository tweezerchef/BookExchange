import { NextApiRequest, NextApiResponse } from "next";
import { getActivities } from "../../utils/sideBar/getActivities";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const activities = await getActivities();
  res.status(200).json(activities);
}