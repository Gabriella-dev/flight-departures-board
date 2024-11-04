# flight-departures-board

A responsive, single-page application for displaying and updating flight departures information. Built with Vue.js v2 and Nuxt.js, this app consumes data from the provided [flights data API](https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata). 


## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#Installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [External Packages](#packages)
- [Conclusion](#conclusion)


## Overview

The Flight Departures Board is designed to provide up-to-date flight information, with the ability for users to update the status of each flight. The design is responsive and optimized for all major browsers. The application dynamically fetches flight data using Axios and offers an intuitive user interface for status updates.

## Requirements

- **Vue.js**: Version 2
- **Nuxt.js**: Version 2.15.8
- **Browsers**: Chrome, Firefox, Safari, Edge

## Installation

Make sure Node.js is installed on your system. You can check by running:

```bash
# check node version
$ node -v
```

1. **Clone the Repository**:

```bash
# Clone the Repository
$ git clone https://github.com/Gabriella-dev/flight-departures-board
```
    
2. **Navigate to the Project Directory**:

```bash
$ cd flight-departures-board
```

3. **Install Dependencies**:

```bash
# install dependencies
$ npm install
# or
$ npm i
```

## Running the Application

### To start the app in development mode:

```bash
# serve with hot reload at localhost:3000
$ npm run dev
```
Then, open your browser and visit http://localhost:3000 to see the application.

### build for production and launch server

```bash
# build for production
$ npm run build

#launch server
$ npm run start
```

### generate static project

```bash
# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).


## Features

- **Departures Board**: Displays real-time flight details, including scheduled time, destination city, flight code, airline, gate, and status. Flights are sorted by departure time for easy viewing and quick access.
- **Interactive Status Update**: Users can click on any flight card to open a form that allows updating the flight status. Available options include:
  - Custom text
  - Departed
  - Diverted
  - Delayed
  - Cancelled
- **Responsive Design**: Optimized for both mobile and desktop devices, ensuring a seamless experience across various screen sizes and devices.
- **Dynamic Data Handling**: Efficiently fetches and updates flight data from the API, providing real-time information to keep users informed and up-to-date.


## Error Handling

The Flight Departures Board includes effective error handling mechanisms to ensure a smooth user experience:

- **Error Modal**: When an API call fails, a modal appears displaying a message alongside a "SadAirplane" visual. Users can dismiss this alert by clicking the "Close" button.
- **Fallback State**: If `flightData` is invalid, the app gracefully shows an empty state, preserving core functionality.
- **Custom Error Messages**: The `handleError` function generates specific messages based on the error type, including detailed feedback for HTTP status codes and network issues.
- **Error Logging**: All errors are logged to the console, making it easier for developers to debug and resolve issues.

### Example
Here's a Vue.js snippet that illustrates the error handling setup:

```vue
<section v-if="errorMessage" class="error-modal">
  <h2>We are sorry...</h2>
  <SadAirplane />
  <p>{{ errorMessage }}</p>
  <button @click="closeErrorModal">Close</button>
</section>
```

## Testing

The app includes both unit and end-to-end tests to ensure robust performance and reliability.

### Unit Tests
- **Framework**: Jest
- **Description**: Unit tests are used to verify the functionality of individual Vue components, ensuring that each part of the app behaves as expected.
- **Command**:
```bash
npm run test
```

## Packages

This project uses several key packages to streamline development and maintain high code quality:

- **@nuxtjs/axios**: Simplifies API requests within the Nuxt.js framework, making data fetching efficient and easy to manage.
- **Nuxt.js**: Provides a robust structure for building Vue.js applications, offering features like server-side rendering, automatic routing, and code splitting for efficient and scalable development.
- **Vue.js**: The core JavaScript library used for building a reactive and dynamic user interface, ensuring a smooth and interactive user experience.
- **Cypress & Jest**: 
  - **Cypress**: end-to-end testing
  - **Jest**: Used for unit testing Vue components, helping to catch bugs early and ensure the reliability of individual parts of the application.
- **ESLint & Prettier**: 
  - **ESLint**: Enforces consistent code style and helps identify potential issues in the codebase.
  - **Prettier**: Formats code automatically, ensuring uniform style and improving readability across the project.

## Conclusion

This project demonstrates the essential features of a Flight Departures Board, providing real-time flight information and user-friendly status updates. It successfully meets the core requirements of the tech test but also leaves room for future enhancements and improvements.

Thank you for taking the time to review this project!
