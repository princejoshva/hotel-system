# Hotel Management System

This is a Hotel Management System built using React.

The application allows users to view hotels, search and filter hotels, add new hotels, edit hotel details, delete hotels, and view hotel locations on a map.

## Features

- View all hotels
- Search hotels by title
- Filter hotels by price
- Add a new hotel
- Edit hotel details
- Delete hotels
- View hotel details
- Display hotel location on a map
- Get the user's current location
- Pagination
- Loading and error messages
- Responsive design

## Technologies Used

- React
- React Router
- Redux Toolkit
- React Redux
- Axios
- React Leaflet
- Leaflet
- React Helmet Async
- CSS
- Node.js backend API

## Getting Started

First, install the required packages:

```bash
npm install
````

Then start the frontend:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

## Available Scripts

### `npm start`

Runs the application in development mode.

### `npm test`

Runs the test files using the React testing environment.

### `npm run build`

Creates an optimized production build inside the `build` folder.

### `npm run eject`

Removes the Create React App configuration and gives full control over the project configuration.

This command is normally not required.

## API Configuration

Create a `.env` file in the frontend project and add:

```text
REACT_APP_API_URL=http://localhost:5000/api
```

Make sure the backend server is running before using the application.

## Project Structure

```text
src/
├── components/
│   ├── Footer/
│   ├── HotelCard/
│   ├── HotelForm/
│   ├── Loading/
│   ├── Navbar/
│   ├── Pagination/
│   ├── SearchFilter/
│   └── Toast/
│
├── pages/
│   ├── AddHotelPage/
│   ├── EditHotelPage/
│   ├── HotelDetailPage/
│   ├── HotelListPage/
│   └── NotFoundPage/
│
├── store/
│   ├── hotelSlice.js
│   └── store.js
│
├── App.jsx
├── index.js
└── index.css
```

## Hotel Management Operations

The application communicates with the backend API using Axios.

The main operations are:

* Get hotels
* Get a single hotel
* Add hotel
* Update hotel
* Delete hotel

Hotel information includes the hotel title, description, price, latitude, longitude and image.

## Map

The hotel detail page displays the hotel location using map coordinates.

The application can also request the user's current location through the browser's geolocation feature.

## Production Build

To create the production version:

```bash
npm run build
```

The generated files will be available inside the `build` folder.
