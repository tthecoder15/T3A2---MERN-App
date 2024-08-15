# T3A2-A

Documentation by Michael Sheppard and Tom Tutone

## R1 Description of your website, including

- Purpose
- Functionality / features
- Target audience
- Tech stack

**Business:**

A hypothetical Melbourne veterinary clinic, _Pawfect Care_.

**Purpose:**

_Pawfect Care_ is a family-run business that wants to create a website to advertise its services and allow booking appointments online. The website will allow users to create an account, register their pet and select bookings from available appointment slots. With their account, users can access an update future appointments and view their history of appointments. The clinic's admin users can user the account data to adjust appointments for clients over the phone and search patient history as well.

**Functionality/Features:**

- User registration linking contact information, pet info and upcoming appointments and past appointments
- A contact page with the ability to send a message to the clinic's email account
- Admin functionality and the ability to access booking data and search user information, appointments and pet data
- A home page featuring clinic news such as seasonal promotions
- An “about us” page describing the veterinary team
- Appointment booking, an interactive calendar page for choosing dates and making bookings

**Target Audience:**

The website is built for the clinic’s clients who will transition their appointment management from in-person/phone calls to an online account system. The website is also built for new customers who find the website from a web search or recommendation. For this reason, the website will clearly offer ways to engage with the business.

The website will be built for users with low-moderate tech skills, so it is easily accessible and usable. The website will also be available on desktops and mobile devices with responsive design for each.

**Tech Stack:**

The website will be built using the MERN stack (MongoDB, Express, React, Node.js) and will leverage Mongoose schemas and validation. In addition testing will be developed using vitest and Jest.

## R2 Dataflow Diagram /6

There are various dataflow processes that occur within the _Pawfect Care_ web application. The application connects the user, their account and database instances when interacting with Users, Appointments, Pets and Vets.

This diagram describes the different entities recorded in the database:

![A database diagram describing the how account, vets, pets and appointments are all tracked in the app's database](/T3A2-A/docs/pawfect-care-db-relationships.drawio.png)

A User account has a one to many relationship with Pets and Appointments. Both Pets and Vets have a one to many relationship with Appointments. This database structure allows for easy querying and populating.

The database is configured with an API which serves data according to the following endpoints:

![A diagram descibing the different endpoints of the back end's server](/T3A2-A/docs/pawfect-care-api-diagram.drawio.png)

These endpoints allow for complete CRUD functionality for the database's different entities.

### Dataflow

There are a variety of processes that require data to be passed between users, session state and the database.

The following dataflow diagrams adhere to Yourdon & Demarco's notation conventions:

![An image explaining Yourdon & Demarco's dataflow diagram conventions](/T3A2-A/docs/df-diagram-key.drawio.png)

#### Contact Dataflow Diagram

The application's data-driven processes are described broadly in the following diagram:

![A diagram of how data is passed between processes in the application](/T3A2-A/docs/pawfect-care-context-df-diagram.drawio.png)

The application, the user inputs data which control the processes such as searching or logging in. Data that needs to be stored between processes such as the user's authentication and registered pet data is stored and carried throughout the app in the session state. Finally, the website's backend consists of an API and connected database which records data long term and returns it upon requests.

#### User Account Dataflow Processes

Within the app, a user can register for an account, login to validate alter appointments and see appointment history and update their account as well. The various user account functionality processes data transfers like so:

![A digram describing the dataflow of the various User account functions](/T3A2-A/docs/pawfect-care-user-df-diagram.drawio.png)

#### Appointment Booking Dataflow

Elsewhere, the key function of the application is a user's ability to book appointments. This diagram describes the dataflow for the booking process:

![A dataflow diagram describing the appointment booking process](/T3A2-A/docs/pawfect-care-v2-appointment-booking-df-diagram.drawio.png)

First, the user makes a request for the available appointment data which is retrieved from the database. The available appointments are presented to the user based on which appointments are booked in the database and the user chooses an appointment from these options. Because a user can engage the booking process with or without being logged in, the data transferred between steps can vary, but ultimately, the user must be logged in so that they can link one of their registered pets (or yet to be registered pets) to the appointment. Once the appointment object is completely filled in with the user's ID, a vet ID, a pet ID and the date and time, it is sent to the database to be recorded. Confirmation from the database is forwarded to the user.

#### Appointment Update Dataflow

Updating an appointment is a similar process to creating a new appointment only, because the user must inherently be logged in, their appointment data and ID are carried through update steps:

![A dataflow diagram describing the appointment update process](/T3A2-A/docs/pawfect-care-v2-appointment-update-df-diagram.drawio.png)

Essentially, updating an appointment is very similar to scheduling one, however, at the final step, the new appointment is saved and the old appointment is deleted at the same time.

#### Admin Search Dataflow

Within the app, admin accounts can access and endpoint to search for different instance data including Users, Pets and Appointments. The dataflow for this process is simply described as such:

![A dataflow diagram describing the appointment update process](/T3A2-A/docs/pawfect-care-search-df.drawio.png)

## R3 Application Architecture Diagram /6

The website can be broken down into the front end, back end and data layers which will be created using the MERN stack (MongoDB, Express, React and Node.js). The front end will utilise a React framework using Vite for bundling. The back end will utilise an Express framework and Mongoose schemas for handling requests to the data layer and to deliver retrieved data to the front end. The back end will be executed within a Node.js environment.  Centrally, the database will be NoSQL and hosted using MongoDB's cloud service.

![A diagram explaining out tech stack containing React for the frontend, Node.js and Express for the back end and MongoDB for the database layer](/T3A2-A/docs/pawfect-care-aa--diagram.drawio.png)

## R4 User Stories /6

## R5 Wireframes for multiple standard screen sizes, created using industry standard software /6

## R6 Screenshots of your Trello (or similar kanban system) board throughout the duration of the project /6
