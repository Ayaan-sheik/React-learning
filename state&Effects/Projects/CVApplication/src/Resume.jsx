import "./Resume.css";

function Resume({ personal, education, experience }) {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Format date range
  const formatDateRange = (start, end) => {
    const startFormatted = formatDate(start);
    const endFormatted = end ? formatDate(end) : "Present";
    return `${startFormatted} - ${endFormatted}`;
  };

  return (
    <div className="resume-container">
      <div className="resume-page">
        {/* Header Section */}
        <header className="resume-header">
          <h1 className="resume-name">{personal.name || "Your Name"}</h1>
          <div className="contact-info">
            {personal.email && <span className="contact-item">{personal.email}</span>}
            {personal.phone && <span className="contact-item">{personal.phone}</span>}
            {personal.address && <span className="contact-item">{personal.address}</span>}
          </div>
        </header>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="resume-section">
            <h2 className="section-heading">PROFESSIONAL EXPERIENCE</h2>
            <div className="section-content">
              {experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <div className="item-title">
                      <h3 className="position-title">{exp.posTitle}</h3>
                      <h4 className="company-name">{exp.companyName}</h4>
                    </div>
                    <div className="item-meta">
                      <span className="date-range">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                      {exp.location && <span className="location">{exp.location}</span>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="item-description">
                      <p>{exp.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="resume-section">
            <h2 className="section-heading">EDUCATION</h2>
            <div className="section-content">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="item-header">
                    <div className="item-title">
                      <h3 className="degree-title">{edu.degree}</h3>
                      <h4 className="school-name">{edu.schoolName}</h4>
                    </div>
                    <div className="item-meta">
                      <span className="date-range">
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </span>
                      {edu.location && <span className="location">{edu.location}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state when no data */}
        {(!personal.name && education.length === 0 && experience.length === 0) && (
          <div className="empty-state">
            <p>Start adding your personal details, education, and experience to see your resume preview.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;