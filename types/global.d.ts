interface Book {
    books: {
        id: string;
        title: string;
        author: string;
        image: string;
      }
      author: string;
      UserBooks: UserBook[];
      id: string;
      wishlist: boolean;
      owned: boolean;
      image: string;
      title: string;
}
namespace React {
  interface ChildrenProps {
      children: React.ReactNode;
  }
}

interface User {
  id: string;
  firstName: string;
  userName: string;
  username: string;
  email: string;
  email: string;
  googleId: string;
  lastName: string;
  picture: string;
  token: string;
  latitude: number;
  longitude: number;
  radius: number;
  NotificationCount: number;
  Activity: Activity[];
  clubMembers: ClubMembers[];
  DirectMessages: DirectMessages[];
  Discussion: Discussions[];
  DiscussionUsers: DiscussionUsers[];
  friendships: Friendship[];
  friends: Friendship[]
  LendingTable: LendingTable[];
  Notifications: Notifications[];
  Posts: Posts[];
  PostsUsers: PostsUsers[];
  UserBooks: UserBooks[];
  User_Places: UserPlaces[];
  Conversations: Conversations[];
}
