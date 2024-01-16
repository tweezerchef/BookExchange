# Book Exchange

Book Exchange revolutionizes the way book enthusiasts connect, share, and discover literature in a digital age. Designed as a virtual library that spans both global and local scales, the app blends the joy of reading with the convenience and connectivity of modern technology. At its core, Book Exchange is about creating a community of readers. It facilitates easy sign-up using email or Google accounts, allowing users to create a profile that reflects their reading preferences. Users can personalize their experience by selecting avatars, setting precise locations for local book matches via Google Maps, and choosing their favorite genres to receive customized book recommendations. The home page of the app is a hub of interaction and discovery, featuring intuitive carousels that display books available in the user's vicinity, personalized recommendations based on their literary tastes, and books they've expressed interest in. A comprehensive search function enhances the user experience, enabling the exploration of specific titles, authors, and connections with other readers.

The app's innovative approach extends to its recommendation engine, which harnesses the power of OpenAI to generate a curated list of books tailored to individual preferences. This feature searches the app's database and, when needed, taps into the Google Books API to find the perfect match for users, allowing them to add these finds to their personal library or request them from fellow users. Book Exchange isn't just about reading; it's about interaction. Each book card on the platform offers options to rate the book, add it to a personal library or wishlist, and delve into more detailed information including user reviews and critical insights. Social features are deeply integrated, enabling users to form friendships, share libraries, and participate in book clubs. These clubs serve as vibrant discussion forums, complete with polls and online meetups, enriching the collective reading experience. Additionally, the app includes messaging for seamless communication and a comprehensive book lending system that ensures a reliable and enjoyable book exchange among users. Book Exchange stands out as more than an app; it's a dynamic, communal space that intertwines the love for books with the possibilities of digital innovation.

Both the app and this page are a work in progress.

If you would like to clone this and run it locally, it needs several environmental variables, without those, it will not run.  To receive those variables please contact me at <ltomblock@gmail.com>

## Brief Run Down of the App and its Features So Far

## Login

This is the login page.  You can either login with your email and password or you can login with your Google account.  If you do not have an account, you can click the link to sign up.
![Log In Page](/LogIn.png)

## Sign Up

![Second Page of Sign Up](/signUp2.png)

There are three pages for signing up.  The first is the sign up page.  You can sign up with your email and password or you can sign up with your Google account. The second alow the user to select an Avatar name and picture.  Then the user selects their address with built in localized autosuggest from google maps. This data is recorded with latitude and longitude in order to match the user with books and users in their area.  Lastly, the user can select their favorite genres.  This data is used to match the user with books in their area that they might like.

Taking the picture with your camera
![Take Picture with camera](/takeAviPic.png)

Cropping the picture
![Cropping the picture](/cropPhoto.png)

The final page of sign up, guides the user through the basic features of the app with a series of modals.
![First Modal](/modal1.png)
![Second Modal](/modal2.png)
![Third Modal](/modal3.png)
The user is asked to rate 10 books in order to get a feel for their taste in books, we will use this data in our recommendation engine.
![Rate Books Page](/rateBooks.png)
Finally the user can find and add friends of theirs that already use the app.
![Add Friends Page](/FindFriends.png)

## Home Page

The home page contains elusively custom built carousals for easy navigation. Each one contains unique information, books available near the user, books that the user might like, and books that the user has requested.  The user can also search for books by title or author. Friends they have, or potential friends to connect with. On the top is a navigation bar and on the side is the users "feed" which contains recent activity from their friends.
![Home Page](/homePage.png)

## Recommended Books

To recommend books to people we take all their genre and book preferences, what they like and don't like. This is then sent to Open AI to generate a list of books that the user might like. The books are then searched for in our DB and if not found we search the Google Books API.  The user can then add the book to their library or request it from another user.

## Book Cards

Each book card has the ability to rate the book, add it to your library, add it to you wishlist, and the ability to see more information about the book.  Each card is clickable to view a larger more in depth version.  This includes a description of the book, users who have the book in their library locally, clubs discussing the book, reviews by users of the book, NY times reviews of the book, and the ability to write your own review.

![Book Card](/bookCard.png)
This is a work in progress large view of the book card.
![Book Card Large](/bigBook.png)

## Friends

Users can make friends with each other, for either on line or real world purposes.  They can also see their friends libraries and borrow books from them.  They can also see their friends wish lists and buy them books.  They can also see their friends clubs and join them. Any time a users avi appears anywhere on the page it is a link to their profile page.

## Clubs

Book Clubs are another feature in our app.  Users can create clubs around any subject, pick an Image, name and description for the club.  They can then invite their friends to join the club or users can find the club for themselves.  Once a club is created, the user can create discussions for the club.  The user can also create polls for the club.  These polls can be used to decide what book to read next, or what to do at the next event.  The user can also create a discussion post for the club.  This can be used to discuss the current book, or anything else the club members want to discuss. There will always be an assigned book for the time period for every club and the club will meet online to discuss it either periodically or at the end of the time period.

## Messaging

Users can message their friends and club members.  They can also create group chats with multiple users. In addition they can send requests to borrow books from other users.  There is a form for book lending that is tracked by the site, including when the book is loaned, due, the condition the book was received in, and the condition the book was returned in.  User will be able to rate each other on their book lending experience.
