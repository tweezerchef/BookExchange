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
    address_components: {
      long_name: string;
      types: string[];
    }[];
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
      const data: GeocodeResponse = await response.json() as GeocodeResponse;

      const { location } = data.results[0].geometry;
      const { lat, lng } = location;

      const cityComponent = data.results[0].address_components.find(
        component => component.types.includes('locality')
      );

      const city = cityComponent ? cityComponent.long_name : '';

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          latitude: lat,
          longitude: lng,
          city,
        },
      });

      res.status(200).json({ userId, address, city });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add location" });
    }
  }
}