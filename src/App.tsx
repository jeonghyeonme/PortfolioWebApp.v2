import Header from './components/Header';
import PersonalInformation from './components/PersonalInformation';
import Education from './components/Education';
import License from './components/License';
import Experience from './components/Experience';
import SelfIntroduction from './components/SelfIntroduction';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-100 font-sans">
      {/* 컨트롤 패널 (인쇄 버튼 등) */}
      <div className="fixed top-4 right-4 z-50 no-print flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition flex items-center gap-2"
        >
          <i className="fas fa-print"></i> PDF 저장 / 인쇄
        </button>
      </div>

      {/* 메인 문서 영역 (A4 사이즈) */}
      <div className="paper max-w-4xl mx-auto bg-white shadow-lg my-10 pb-10">
        
        <Header />

        {/* 본문 컨텐츠 */}
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
    </div>
  )
}

export default App
