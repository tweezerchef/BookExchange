// Next.js API route: /pages/api/friend/combinedData.js

import type { NextApiRequest, NextApiResponse } from 'next';
import {User} from '@prisma/client'
import { getRandomFriends, getFriendList } from '../../../utils/friendsFunctions';

type Friend = Partial<User>
type ErrorResponse = { message: string };
type CombinedDataResponse = {
    randomFriendsRes: Friend[];
    friendIdsRes: string[];
    };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CombinedDataResponse | ErrorResponse>
    ) {
  const userId = req.query.userId as string;
    try {
    const [randomFriendsData, friendIdsData] = await Promise.all([
      getRandomFriends(),
      getFriendList(userId),
    ]);

    // Return both datasets in a single response object
    res.status(200).json({
      randomFriendsRes: randomFriendsData,
      friendIdsRes: friendIdsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve data' });
  }
}
