import { NextApiRequest, NextApiResponse } from 'next';

interface LocationData {
    userId: string;
    address: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        const { userId, address }: LocationData = req.body as LocationData;
        try {
            // eslint-disable-next-line no-console
            console.log('location', address, 'userId', userId);
            res.status(200).json({ userId, address });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: 'Failed to add location' });
        }
    }
}
