// Sample list of available doctors used by the search and booking pages.
export const specialities = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist',
  'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda',
];

export const doctors = [
  { id: 1, name: 'Dr. Jiao Yang', speciality: 'Dentist', experience: 9, ratings: 5 },
  { id: 2, name: 'Dr. Denis Raj', speciality: 'Dentist', experience: 24, ratings: 4 },
  { id: 3, name: 'Dr. Lyn Christie', speciality: 'Dentist', experience: 11, ratings: 4 },
  { id: 4, name: 'Dr. Elena Ruiz', speciality: 'General Physician', experience: 15, ratings: 5 },
  { id: 5, name: 'Dr. Marcus Lee', speciality: 'General Physician', experience: 7, ratings: 4 },
  { id: 6, name: 'Dr. Priya Nair', speciality: 'Dermatologist', experience: 12, ratings: 5 },
  { id: 7, name: 'Dr. Sofia Berg', speciality: 'Gynecologist/obstetrician', experience: 18, ratings: 5 },
  { id: 8, name: 'Dr. Omar Haddad', speciality: 'Ear-nose-throat (ent) Specialist', experience: 10, ratings: 4 },
  { id: 9, name: 'Dr. Anita Kapoor', speciality: 'Homeopath', experience: 8, ratings: 4 },
  { id: 10, name: 'Dr. Ravi Menon', speciality: 'Ayurveda', experience: 20, ratings: 5 },
];

// Past consultations shown on the Reviews page.
export const consultations = [
  { id: 1, doctorName: 'Dr. Jiao Yang', speciality: 'Dentist' },
  { id: 2, doctorName: 'Dr. Elena Ruiz', speciality: 'General Physician' },
  { id: 3, doctorName: 'Dr. Priya Nair', speciality: 'Dermatologist' },
];
