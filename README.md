# Assignment 2 - STREAM

STREAM is a Series and Movies streaming platform. It allows users to browse the latest content, 
view movie details, and create a list of their favorite titles all in one website.



## Website Link
[Visit STREAM](https://stream-fk5o.onrender.com/)

## Features

- **Browse Latest Content** – View trending movies and TV shows from TMDB.
- **Favorites List** *(Private)* – Logged-in users can save movies/series to a personal favorites list. This list is stored in their account and can be managed by adding or removing titles anytime.
- **Profile Page** *(Private)* – Logged-in users can view their account details, see the number of items in their favorites, and update personal info such as their **bio** and **favorite genres**.
- **Search** – Find movies or shows by title using TMDB API.
- **Movie Info Pages** – View posters, genres, ratings, release date, runtime, and full descriptions for each movie or series.
- **Authentication** – Secure login using Local accounts, GitHub, or Google. Required to access private pages.
- **Contact Page** – Send messages to the site admin directly through the website.
---
## Private Pages

Two pages are only accessible to logged-in users:

1. **Favorites**  
   - Displays the user's saved movies and TV shows.  
   - Allows removal of items from favorites.  
   - Uses data stored in the user's account.

2. **Profile**  
   - Shows account details (username, bio, favorite genres, favorites count).  
   - Allows updating profile information directly from the page.  
   - Saves updates in the database so changes persist across logins.

---

## Additional Features

- **Search** functionality to search with movie titles
- **Google** Authentication as an option besides GitHub
---

## Code References
- ChatGPT was used as a coding assistant for brainstorming and structuring the logic behind the **Trending movies** section and the **Carousel display** on the Latest page.
---
## Bootstrap Template References
#### Shared
- [Header](https://getbootstrap.com/docs/5.3/examples/headers/)
- [Footer](https://getbootstrap.com/docs/5.3/examples/footers/)
#### Index
- [Hero Image](https://mdbootstrap.com/docs/standard/extended/hero/)
- [Search Bar](https://bootstrapexamples.com/@anonymous/search-bar)
### Latest/Movies/Series/Favorites
- [Carousel](https://getbootstrap.com/docs/5.3/components/carousel/)
- [Movie Card](https://dev.to/tilakjain123/animated-movie-card-w-html-and-css-ekh)
### Log-In Form
- [Form](https://mdbootstrap.com/docs/standard/extended/login/)
### Sign-In Form
- [Form](https://mdbootstrap.com/docs/standard/extended/registration/)
### Contact/Profile
- [Form](https://bootstrapbrain.com/demo/components/contacts/contact-1/)




