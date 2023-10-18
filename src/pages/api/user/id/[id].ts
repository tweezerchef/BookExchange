import { findUserByIdDetailed } from "../../../../utils/userService";

export default async function handler(req: { method: string; query: { id: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (req.method === "GET") {
    const id: string = req.query.id as string;
    try {
      console.log(`Retrieving user with id ${id}`);
      const user = await findUserByIdDetailed(id);
      console.log(`Retrieved user with id ${id}`);
      res.status(200).json(user);
    } catch (error) {
      console.error("There was a problem:", error.message);
      res.status(500).json({ message: "Error retrieving user data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
