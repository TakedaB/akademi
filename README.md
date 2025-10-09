# Akademi

> School administration dashboard built with Next.js and React.

## Description

Akademi is a web application for managing students, parents, and school information. The system allows you to register, view, sort, and delete students, as well as record parent details and payment options.

## Features

- Student listing with pagination and sorting (newest/oldest)
- Register new students and parents
- Field validation (name, phone, email)
- Delete students
- Modern, responsive interface using Tailwind CSS
- Sidebar navigation for modules (Dashboard, Students, Teachers, Finance, User)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- Custom CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TakedaB/akademi.git
   cd akademi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Main pages and components
  - `students/` - Student dashboard and registration
  - `components/` - Forms, layout, and icons
- `lib/StudentsStorage.js` - Local management of student data
- `public/` - Static files and icons
- Configurations: `package.json`, `next.config.mjs`, `postcss.config.mjs`, `eslint.config.mjs`, `jsconfig.json`

## Author

- TakedaB

## License

This project is licensed under the MIT License.
