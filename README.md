# Movie Recommendation System

This is a full-stack web application that uses a React frontend and a Flask backend to provide personalized movie recommendations. The app integrates the TMDb API to fetch movie data and allows users to maintain a watchlist. Additional features like authentication and movie trailers can be added for an enhanced experience.

---
NOTES FOR SELF -> use material ui skeleton when api is fetching data 
## Features

### Frontend:
- React app to display personalized movie recommendations.
- Responsive UI built with Tailwind CSS or Material UI.
- Navigation and state management using `react-router-dom` and React hooks.

### Backend:
- Flask API providing recommendations using collaborative filtering or K-Means clustering.
- TMDb API integration for movie data.
- SQLite or PostgreSQL for user and movie data storage.
- RESTful endpoints for movie recommendations and watchlist management.

---

## Project Setup

### 1. Set Up the Project Environment

#### Frontend:
- Initialize the frontend using `create-react-app`:
  ```bash
  npx create-react-app movie-recommendation-frontend
  ```
- Install required libraries:
  ```bash
  npm install axios react-router-dom tailwindcss
  ```
- Configure Tailwind CSS or Material UI for styling.

#### Backend:
- Set up a Flask backend:
  ```bash
  mkdir movie-recommendation-backend
  cd movie-recommendation-backend
  python -m venv venv
  source venv/bin/activate # On Windows: venv\Scripts\activate
  pip install flask flask-restful pandas scikit-learn requests
  ```

---

### 2. TMDb API Integration

1. **Register**:
   - Create an account on [TMDb](https://www.themoviedb.org/) and obtain your API key.

2. **Endpoints to Use**:
   - **Popular movies**: `/movie/popular`
   - **Movie details**: `/movie/{movie_id}`
   - **Search movies**: `/search/movie`

3. **Testing the API**:
   - Use Postman or `curl` to verify the endpoints.

---

### 3. Backend Implementation

#### Database:
- Use SQLite or PostgreSQL to manage data.
- Tables to create:
  - **Users**: Store user information.
  - **Movies**: Store movie metadata.
  - **Recommendations**: Store recommendation results.
  - **Watchlist**: Store user-specific watchlist data.

#### Recommendation Logic:
- **Collaborative Filtering**:
  - Recommend movies based on preferences of users with similar tastes.
- **K-Means Clustering**:
  - Group users or movies based on features like genres and ratings.
- Store user-movie ratings to train the recommendation model.

#### Endpoints to Create:
- **GET** `/movies/popular`: Fetch popular movies.
- **POST** `/movies/recommend`: Provide personalized recommendations based on user preferences.
- **POST** `/watchlist`: Add a movie to the user’s watchlist.
- **GET** `/watchlist`: Fetch the user’s saved watchlist.

---

### 4. Frontend Implementation

#### Pages to Build:
1. **Home**:
   - Display popular movies and recommendations.
2. **Search**:
   - Allow users to search for movies using the TMDb API.
3. **Watchlist**:
   - Show the user’s saved movies.

#### Components:
- **MovieCard**:
  - Displays movie details like poster, title, and rating.
- **Navbar**:
  - Provides navigation links to Home, Search, and Watchlist pages.

#### State Management:
- Use `useState` and `useEffect` for local state management.
- Use `axios` for API communication with the Flask backend.

---

### 5. Bonus Features
- Add authentication (e.g., user login/signup).
- Integrate YouTube API to display movie trailers.
- Allow users to rate movies and refine recommendations further.

---

## How to Run

### Frontend:
1. Navigate to the frontend directory:
   ```bash
   cd movie-recommendation-frontend
   ```
2. Start the development server:
   ```bash
   npm start
   ```

### Backend:
1. Navigate to the backend directory:
   ```bash
   cd movie-recommendation-backend
   ```
2. Run the Flask app:
   ```bash
   flask run
   ```

---

## Technologies Used

- **Frontend**: React, Tailwind CSS/Material UI, Axios
- **Backend**: Flask, Flask-RESTful
- **Database**: SQLite/PostgreSQL
- **APIs**: TMDb API, YouTube API (bonus)
- **ML Libraries**: Pandas, Scikit-learn

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements
- [TMDb API Documentation](https://developers.themoviedb.org/3)
- [Flask Documentation](https://flask.palletsprojects.com/en/latest/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)



