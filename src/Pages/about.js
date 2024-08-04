import React from 'react';

const AboutPage = () => {
  const styles = {
    container: {
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100vw',
      margin: '0 auto',
      color: '#333',
      boxSizing: 'border-box',
      backgroundColor: '#f7f9fc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    headerTitle: {
      fontSize: '2.5em',
      color: '#007bff',
    },
    headerTitle2: {
      fontSize: '1.2em',
      color: '#dc3545',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '1.8em',
      marginBottom: '20px',
      color: '#0056b3',
      borderBottom: '2px solid #0056b3',
      paddingBottom: '10px',
    },
    paragraph: {
      fontSize: '1.1em',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    sdgList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px', // Added gap to create space between items
    },
    sdgItem: {
      flex: '1 1 45%', // Adjusted to make space between columns
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#e9ecef',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    sdgItemHover: {
      backgroundColor: '#d4d9df',
    },
    trendArrows: {
      marginTop: '20px',
    },
    list: {
      listStyleType: 'disc',
      marginLeft: '20px',
      fontSize: '1.1em',
    },
    listItem: {
      marginBottom: '10px',
    },
    footer: {
      textAlign: 'center',
      padding: '20px 0',
      borderTop: '1px solid #ddd',
      marginTop: '40px',
      backgroundColor: '#f1f1f1',
    },
    footerText: {
      fontSize: '0.9em',
      color: '#777',
    },
    // Responsive styles
    '@media (max-width: 600px)': {
      container: {
        padding: '10px',
      },
      headerTitle: {
        fontSize: '2em',
      },
      sectionTitle: {
        fontSize: '1.5em',
      },
      paragraph: {
        fontSize: '1em',
      },
      sdgItem: {
        flex: '1 1 100%',
      },
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h4 style={styles.headerTitle2}>This is a beta version. More updates are coming soon to make this website more effective.</h4>
        <h1 style={styles.headerTitle}>About this Website</h1>
      </header>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sustainable Development and SDGs</h2>
        <p style={styles.paragraph}>
          Sustainable development refers to the organized effort to meet the needs of the present without compromising the ability of future generations to meet their own needs. It encompasses three main pillars: economic growth, social inclusion, and environmental protection. The concept emphasizes balancing these pillars to achieve long-term prosperity and well-being.
        </p>
        <p style={styles.paragraph}>
          The United Nations established the SDGs in 2015 as a universal call to action to end poverty, protect the planet, and ensure peace and prosperity for all by 2030. The 17 goals cover a broad range of social, economic, and environmental issues, including:
        </p>
        <div style={styles.sdgList}>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>1 No Poverty</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>2 Zero Hunger</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>3 Good Health and Well-being</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>4 Quality Education</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>5 Gender Equality</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>6 Clean Water and Sanitation</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>7 Affordable and Clean Energy</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>8 Decent Work and Economic Growth</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>9 Industry, Innovation, and Infrastructure</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>10 Reduced Inequality</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>11 Sustainable Cities and Communities</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>12 Responsible Consumption and Production</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>13 Climate Action</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>14 Life Below Water</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>15 Life on Land</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>16 Peace, Justice, and Strong Institutions</p>
          <p style={{ ...styles.sdgItem, ':hover': styles.sdgItemHover }}>17 Partnerships for the Goals</p>
        </div>
        <h2 style={styles.sectionTitle}>Trend Arrows</h2>
        <div style={styles.trendArrows}>
          <p style={styles.paragraph}>
            Upward arrow (➚): Indicates positive progress.
          </p>
          <p style={styles.paragraph}>
            Rightward arrow (→): Indicates no significant change.
          </p>
          <p style={styles.paragraph}>
            Downward arrow (↓): Indicates negative progress or decline.
          </p>
        </div>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Purpose</h2>
        <p style={styles.paragraph}>
          The SDG Interactive Platform is designed to provide comprehensive insights into the progress of Sustainable Development Goals (SDGs) across various countries. The platform aims to empower users, including policymakers, researchers, educators, and the general public, with accessible data and analysis tools. Through this platform, users can visualize global SDG data, compare the performance of different countries, and access detailed reports to understand trends and challenges in achieving these goals.
        </p>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}> Important Features</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Interactive maps for visual representation of SDG scores by country.</li>
          <li style={styles.listItem}>Comparative analysis of SDG performance between different countries.</li>
          <li style={styles.listItem}>Access to detailed country-specific SDG scores and trends.</li>
          <li style={styles.listItem}>Search functionality for finding specific reports and data.</li>
          <li style={styles.listItem}>Downloadable content and additional educational resources.</li>
          <li style={styles.listItem}>share data with friends .</li>
          <li style={styles.listItem}>See country ranking with bars that represent specific Sdg  .</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Data Sources</h2>
        <p style={styles.paragraph}>
          The data presented in our platform is sourced from reputable organizations and databases such as the UN and other SDG-related research publications. We ensure that our data is accurate and up-to-date.
        </p>
      </section>
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2024 SDG Interactive Maps. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
