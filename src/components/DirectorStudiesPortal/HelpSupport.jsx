import React from 'react';


// Main Help and Support Component
const HelpSupport = () => {
  // Function to handle smooth scrolling to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="help-support">
      <h1>Help and Support</h1>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={() => scrollToSection('faqs')}>FAQs</button>
        <button onClick={() => scrollToSection('contact-info')}>Contact Info</button>
        <button onClick={() => scrollToSection('user-guides')}>User Guides</button>
        <button onClick={() => scrollToSection('policy-docs')}>Policy Docs</button>
      </div>

      {/* FAQs Section */}
      <Section title="FAQs" id="faqs">
        <FAQ />
      </Section>

      {/* Contact Information Section */}
      <Section title="Contact Information" id="contact-info">
        <ContactInfo />
      </Section>

      {/* User Guides Section */}
      <Section title="User Guides" id="user-guides">
        <UserGuides />
      </Section>

      {/* Policy Documents Section */}
      <Section title="Policy Documents" id="policy-docs">
        <PolicyDocs />
      </Section>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, id, children }) => {
  return (
    <div className="section" id={id}>
      <h2>{title}</h2>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const faqs = [
    { question: 'How do I reset my password?', answer: 'Go to the login page and click "Forgot Password."' },
    { question: 'How do I upload assignments?', answer: 'Navigate to the assignments tab and click "Upload."' },
    { question: 'How do I access student grades?', answer: 'Go to the "Grades" section in your dashboard.' },
  ];

  return (
    <div className="faq">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

// Contact Information Component
const ContactInfo = () => {
  return (
    <div className="contact-info">
      <p>Email: support@teacherportal.com</p>
      <p>Phone: +1-800-123-4567</p>
      <p>Live Chat: Available 24/7</p>
    </div>
  );
};

// User Guides Component
const UserGuides = () => {
  return (
    <div className="user-guides">
      <h3>How to Use the Portal</h3>
      <p>Step-by-step guides and video tutorials are available here.</p>
    </div>
  );
};

// Policy Documents Component
const PolicyDocs = () => {
  return (
    <div className="policy-docs">
      <h3>Policy Documents</h3>
      <p>Links to school or district policies will be available here.</p>
    </div>
  );
};

export default HelpSupport;