## Game Explorer

Game Explorer is a React application that allows users to explore popular, upcoming, and new video games using the RAWG Video Games Database API. Users can click on games to view detailed information in a modal and browse games by genre using arrow navigation.

## Features

- **View Popular Games**: Browse a list of popular games based on user ratings.
- **Upcoming Games**: Explore games that are set to release in the near future.
- **New Games**: Check out the latest releases in the gaming world.
- **Game Details Modal**: Click on a game to view its detailed information, including screenshots and descriptions.
- **Genre Navigation**: Use arrow keys to navigate through different game genres and see the respective games in each genre.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **React Hooks**: For managing state and side effects.
- **CSS**: For styling the application.
- **RAWG API**: For fetching game data.

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:
     git clone git@github.com:larissioana/video-games.git
  
2. Navigate to the project directory:
    cd video-games

3. Install dependencies:
    npm install
   
4. Set up your environment variables:
    Create a .env file in the root of the project and add your RAWG API key:
    VITE_API_KEY=your_api_key_here

5. Start the development server:
     npm run dev
