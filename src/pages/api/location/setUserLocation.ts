import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prismaClient";

interface LocationData {
  userId: string;
  address: string;
}

interface GeocodeResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, address }: LocationData = req.body as LocationData;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: GeocodeResponse = await response.json();

      const { location } = data.results[0].geometry;
      const { lat, lng } = location;
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          latitude: lat,
          longitude: lng,
        },
      });
      res.status(200).json({ userId, address });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add location" });
    }
  }
}
