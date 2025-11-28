import Header from '../components/Header';
import PersonalInformation from '../components/PersonalInformation';
import Education from '../components/Education';
import License from '../components/License';
import Experience from '../components/Experience';
import SelfIntroduction from '../components/SelfIntroduction';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="paper pb-10">
      <Header />
      <main className="px-10 py-8 space-y-12">
        <PersonalInformation />
        <Education />
        <License />
        <Experience />
        <div className="page-break"></div>
        <SelfIntroduction />
        <div className="page-break"></div>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
