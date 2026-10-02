# StayHealthy – Medical Appointment Booking

StayHealthy is the front-end of a (fictitious) non-profit healthcare platform that helps people
in remote and underserved areas book medical appointments and get instant online consultations.
It was built with **HTML, CSS and React.js** as part of StayHealthy Inc.'s *Go Digital* initiative,
with a focus on accessibility, responsive design and a clean, patient-friendly layout.

## Features

- **Navigation bar** – Home, Appointments, Instant Consultation, Reviews, Sign Up and Login.
  When logged in it shows the user's name with links to *Your Profile* and *Your Reports*, plus **Logout**.
- **Sign Up** – role (patient/doctor), name, email, phone and password, with validation.
  Calls the registration API.
- **Login** – email and password. Calls the login API to authenticate the user.
- **Find a doctor** – search doctors by specialty (`FindDoctorSearch`).
- **Book an appointment** – name, phone number, date and time slot (`AppointmentForm`).
- **Instant consultation** – quick booking with only name and phone number (`AppointmentFormIC`).
- **Cancel appointments** – from each doctor card (`DoctorCard`).
- **Notifications** – the booked appointment is shown on every page (`Notification`).
- **Reviews** – give one review per consultation; the button is disabled after submitting (`GiveReviews`).
- **Profile** – view and edit name and phone number (`ProfileCard`).
- **Reports** – view or download the patient report PDF.

## Project structure

```
stayhealthy/
├── index.html                # Page shell with SEO meta tags
├── public/
│   └── patient_report.pdf    # Sample patient report
├── server/                   # Node.js/Express authentication API
│   └── index.js
└── src/
    ├── App.jsx               # Routes; Notification wraps the whole app
    ├── config.js             # Backend URL
    ├── data/doctors.js       # Sample doctors and consultations
    └── Components/
        ├── Navbar/Navbar.jsx
        ├── Landing_Page/Landing_Page.jsx
        ├── Sign_Up/Sign_Up.jsx
        ├── Login/Login.jsx
        ├── FindDoctorSearch/FindDoctorSearch.jsx
        ├── BookingConsultation/BookingConsultation.jsx
        ├── InstantConsultation/InstantConsultation.jsx
        ├── DoctorCard/DoctorCard.jsx
        ├── AppointmentForm/AppointmentForm.jsx
        ├── AppointmentFormIC/AppointmentFormIC.jsx
        ├── Notification/Notification.jsx
        ├── ReviewForm/ReviewForm.jsx
        ├── GiveReviews/GiveReviews.jsx
        ├── ProfileCard/ProfileCard.jsx
        └── ReportsLayout/ReportsLayout.jsx
```

## Setup instructions

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer and npm

### 1. Clone the repository
```bash
git clone https://github.com/KalleRas/stayhealthy.git
cd stayhealthy
```

### 2. Start the backend (port 8181)
```bash
cd server
npm install
npm start
```

### 3. Start the front-end (in a second terminal)
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

### 4. Build for production
```bash
npm run build
```
The optimized site is written to the `dist/` folder.

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```

## API endpoints

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| POST   | `/api/auth/register` | Register a new user                  |
| POST   | `/api/auth/login`    | Log in and receive an auth token     |
| GET    | `/api/auth/user`     | Get the logged-in user's profile     |
| PUT    | `/api/auth/user`     | Update the user's name and phone     |

Example:
```bash
curl -X POST http://localhost:8181/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","phone":"0401234567","password":"password123","role":"patient"}'
```

## Technologies
HTML5, CSS3, JavaScript (ES6+), React 18, React Router, Vite, Node.js, Express, JWT, bcrypt.
