# CSV Importer API

A simple Node.js application to convert CSV files to JSON, insert them into a PostgreSQL database, and calculate age distribution.  

This project uses **Express.js** for the API, **pg** for PostgreSQL connectivity, and a **custom CSV parser** without external CSV libraries.

---

## Features

- Convert CSV rows into nested JSON objects (supports dot notation for complex properties)
- Insert mandatory fields into PostgreSQL columns and store additional fields in JSON
- Calculate age distribution of users and print to console
- Supports large CSV files (50,000+ rows)
- No external CSV parsing libraries used

---

## Project Structure

csv-importer/
├─ data/
│ └─ users.csv # CSV file to import
├─ db.js # PostgreSQL connection
├─ csvParser.js # Custom CSV parsing and JSON builder
├─ index.js # Express server and import endpoint
├─ testDb.js # Test database connection
├─ .env # Environment variables (not tracked by Git)
├─ package.json
├─ package-lock.json
└─ node_modules/

## Usage:
1. Start the Server
 node index.js
2. Import CSV via API
curl -X POST http://localhost:3000/import


## Database Setup
CREATE TABLE public.users (
  name varchar NOT NULL,
  age int NOT NULL,
  address jsonb NULL,
  additional_info jsonb NULL,
  id serial PRIMARY KEY
);

## Working 
<img width="1062" height="53" alt="image" src="https://github.com/user-attachments/assets/6e649e97-567a-4056-9b52-ffe4550d0912" />
<img width="338" height="152" alt="image" src="https://github.com/user-attachments/assets/83947895-72b4-49ed-9863-36e809b7ce5d" />


