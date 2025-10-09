
const STORAGE_KEY = "studentsData";

export const studentsData = [
    { id: '#123456788', name: 'Gideon Williams', date: '2020-03-23', parentName: 'Ranni Williams', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-orange-500' },
    { id: '#123456784', name: 'Miquella Soap', date: '2019-04-25', parentName: 'Marika Soap', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII B', gradeColor: 'bg-yellow-500' },
    { id: '#123456778', name: 'Malenia Hope', date: '2023-01-15', parentName: 'Radagon Hope', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII C', gradeColor: 'bg-purple-600' },
    { id: '#123456769', name: 'Renalla Nico', date: '2022-07-10', parentName: 'Rellana Nico', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-yellow-500' },
    { id: '#123456779', name: 'Hyetta Adja', date: '2017-02-03', parentName: 'Lyetta Adja', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-orange-500' },
    { id: '#123456729', name: 'Erina Ahmad', date: '2019-05-12', parentName: 'Sebastian Ahmad', city: 'Jakarta', contact: { phone: true, email: true }, grade: 'VII A', gradeColor: 'bg-yellow-500' },
  ];


function isBrowser() {
  return typeof window !== 'undefined';
}

export function getStudents() {
  if (!isBrowser()) return studentsData;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsData));
  return studentsData;
}

export function saveStudents(students) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function addStudent(newStudent) {
  if (!isBrowser()) return;
  const current = getStudents();
  const updated = [newStudent, ...current];
  saveStudents(updated);
  return updated;
}