function Resume({ personal, education, experience }) {
  return (
    <div>
      <h1>Resume</h1>

      {/* Personal Details */}
      <section>
        <h2>Personal Details</h2>
        <p><strong>Name:</strong> {personal.name}</p>
        <p><strong>Email:</strong> {personal.email}</p>
        <p><strong>Phone:</strong> {personal.phone}</p>
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        {education.length === 0 ? (
          <p>No education details added.</p>
        ) : (
          <ul>
            {education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> at {edu.school} ({edu.start} - {edu.end})
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Experience */}
      <section>
        <h2>Experience</h2>
        {experience.length === 0 ? (
          <p>No experience details added.</p>
        ) : (
          <ul>
            {experience.map((exp, index) => (
              <li key={index}>
                <strong>{exp.position}</strong> at {exp.company} ({exp.start} - {exp.end})
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Resume;
