import React, { useState } from "react";
import StudentCard from "./StudentCard.jsx";

const initialStudents = [
  {
    id: "2026-001",
    name: "Allysa Macalalad",
    course: "BS Information Technology",
    year: "2nd Year",
  },
  {
    id: "2026-002",
    name: "Diane Noche",
    course: "BS Information Technology",
    year: "1st Year",
  },
  {
    id: "2026-003",
    name: "Marc Jimuel Liup",
    course: "BS Computer Science",
    year: "3rd Year",
  },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [addError, setAddError] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const visibleStudents = students.filter((student) =>
    [student.name, student.id, student.course, student.year].some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    ),
  );

  function addStudent(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const student = {
      name: formData.get("name").trim(),
      id: formData.get("id").trim(),
      course: formData.get("course").trim(),
      year: formData.get("year"),
    };

    if (students.some((existing) => existing.id.toLowerCase() === student.id.toLowerCase())) {
      setAddError("That student ID is already in use.");
      return;
    }

    setStudents((currentStudents) => [...currentStudents, student]);
    setSearch("");
    setAddError("");
    setIsAddFormOpen(false);
  }

  function deleteStudent(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    );
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Campus directory home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>campus<span className="brand-light">/connect</span></span>
        </a>
        <span className="topbar-label">UNIVERSITY COMMUNITY</span>
      </header>

      <section className="directory" aria-labelledby="page-title">
        <div className="intro">
          <div className="eyebrow"><span /> YOUR CAMPUS, AT A GLANCE</div>
          <h1 id="page-title">Student directory<span>.</span></h1>
          <p className="intro-copy">
            Get to know the people learning, building, and growing alongside you.
          </p>

          <label className="search-box">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, course, or student ID..."
              aria-label="Search students"
            />
            <span className="search-shortcut" aria-hidden="true">⌕</span>
          </label>
        </div>

        <div className="list-heading">
          <div>
            <h2>All students</h2>
            <p>Meet your fellow students</p>
          </div>
          <div className="list-actions">
            <span className="student-count">
              {visibleStudents.length} {visibleStudents.length === 1 ? "student" : "students"}
            </span>
            <button
              className="add-student-button"
              type="button"
              onClick={() => {
                setAddError("");
                setIsAddFormOpen((isOpen) => !isOpen);
              }}
              aria-expanded={isAddFormOpen}
              aria-controls="add-student-form"
            >
              <span aria-hidden="true">+</span> Add student
            </button>
          </div>
        </div>

        {isAddFormOpen && (
          <form className="add-student-form" id="add-student-form" onSubmit={addStudent}>
            <div className="form-heading">
              <div>
                <h2>Add a student</h2>
                <p>Fill in the student details below.</p>
              </div>
              <button
                className="form-close-button"
                type="button"
                onClick={() => setIsAddFormOpen(false)}
                aria-label="Close add student form"
              >
                ×
              </button>
            </div>
            <div className="form-fields">
              <label>
                Student name
                <input name="name" type="text" placeholder="e.g. Alex Rivera" required />
              </label>
              <label>
                Student ID
                <input name="id" type="text" placeholder="e.g. 2026-006" required />
              </label>
              <label>
                Course
                <input name="course" type="text" placeholder="e.g. BS Information Technology" required />
              </label>
              <label>
                Year level
                <select name="year" defaultValue="1st Year">
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>5th Year</option>
                </select>
              </label>
            </div>
            {addError && <p className="form-error" role="alert">{addError}</p>}
            <div className="form-actions">
              <button
                className="cancel-button"
                type="button"
                onClick={() => setIsAddFormOpen(false)}
              >
                Cancel
              </button>
              <button className="submit-student-button" type="submit">Add student</button>
            </div>
          </form>
        )}

        {visibleStudents.length > 0 ? (
          <div className="student-grid">
            {visibleStudents.map((student) => (
              <StudentCard
                key={student.id}
                {...student}
                onDelete={() => deleteStudent(student.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌕</span>
            <h2>No students found</h2>
            <p>Try another name, course, year, or student ID.</p>
          </div>
        )}

        <footer className="page-footer">
          <span>Made for students, by students.</span>
          <span>Campus directory <span aria-hidden="true">·</span> 2026</span>
        </footer>
      </section>
    </main>
  );
}
