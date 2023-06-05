# React TypeScript Appointment Booking App

This repository contains the source code for an appointment booking application built with React, TypeScript, and Supabase. The application allows users to view available appointments, book an appointment, and cancel an existing appointment.

## Features

- View available appointment slots
- Book an appointment
- Cancel an existing appointment
- Persist booking status in local storage

## Installation

Before you start, make sure you have a working NodeJS environment, with pnpm installed. Then, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/skiniks/react-ts-booking-app.git
```

2. Install the dependencies:

```bash
cd react-ts-booking-app
pnpm install
```

## Usage

1. To start the development server:

```bash
pnpm run dev
```

2. To build the project for production:

```bash
pnpm run build
```

3. To lint the code:

```bash
pnpm run lint
```

4. To fix linting errors:

```bash
pnpm run lint:fix
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. Make sure to replace `<your-supabase-url>` and `<your-supabase-key>` with your actual Supabase credentials.

```bash
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-key>
```

## License

This project is licensed under the MIT License.
