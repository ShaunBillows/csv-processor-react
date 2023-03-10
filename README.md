# CSVProcessor

CSVProcessor is a React component that allows users to upload a CSV file, process the data using a custom function from utils/processData.js, and download the updated CSV file. This project was created to provide a reusable and customisable solution for handling CSV file uploads and data processing in React applications.

## Motivation

The motivation behind this project was to provide a template for a CSV Processor app that can be reused to help friends and family automate the tedious tasks I always catch them performing on Excel. By using this app as a template, it allows for the creation of a single JavaScript function that can be customised to fit specific use cases, ultimately empower individuals to streamline their workflows and make data processing more efficient.

## Features

- User can select a CSV file to upload
- Error handling for invalid file format
- Error handling whilst processing the CSV data
- Data processing functionality using custom function
- Download updated CSV file

## Getting Started

- Install the necessary dependencies by running 'npm install' or 'yarn install'
- Import the CSVProcessor component into your App.js file
- Use the component in your app by adding '&lt;CSVProcessor /&gt;' to your JSX code
- Customise the data processing function in utils/processData.js to fit your specific use case

## Customisation

- The handleProcessData function in utils/processCSVData.js can be customised to fit your specific use case. This function is called when the user clicks the "Process Data" button and is responsible for processing the data before it is downloaded.

## Dependencies

- react-csv
