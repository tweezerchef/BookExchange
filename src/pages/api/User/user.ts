import { findUserByEmailDetailed } from '../../../utils/userService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { email } = req.query;
    try {
      const user = await findUserByEmailDetailed(email);
      res.status(200).json(user);
    } catch (error) {
      console.error('There was a problem:', error.message);
      res.status(500).json({ message: 'Error retrieving user data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}