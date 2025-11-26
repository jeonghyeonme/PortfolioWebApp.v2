const Portfolio = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 mt-8">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">포트폴리오</h2>
        <p className="text-sm text-gray-500 mt-1">Portfolio</p>
      </div>
      <div className="md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* 프로젝트 1 */}
          <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img src="https://placehold.co/600x400/333333/ffffff?text=Brand+Redesign" alt="프로젝트 썸네일" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">친환경 브랜드 리브랜딩</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                기존 브랜드의 아이덴티티를 재정립하고 로고, 패키지, 웹사이트 전반에 걸친 리뉴얼을 진행했습니다. 지속 가능한 가치를 시각화하는 데 중점을 두었습니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Branding</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Adobe Illustrator</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Photoshop</span>
              </div>
            </div>
          </div>

          {/* 프로젝트 2 */}
          <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img src="https://placehold.co/600x400/333333/ffffff?text=App+UI+UX" alt="프로젝트 썸네일" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">금융 앱 UX/UI 개선</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                사용자 데이터를 분석하여 복잡한 송금 과정을 3단계로 단축시켰습니다. 직관적인 인터페이스 설계로 사용자 만족도를 20% 향상시켰습니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">UI/UX</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Figma</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Prototyping</span>
              </div>
            </div>
          </div>

          {/* 프로젝트 3 */}
          <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img src="https://placehold.co/600x400/333333/ffffff?text=Marketing+Kit" alt="프로젝트 썸네일" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">신규 서비스 런칭 프로모션</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                SNS 카드뉴스, 배너 광고, 랜딩 페이지용 상세 이미지를 제작했습니다. 클릭률(CTR) 3.5%를 달성하며 성공적인 런칭을 이끌었습니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Marketing Design</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Photoshop</span>
              </div>
            </div>
          </div>

          {/* 프로젝트 4 */}
          <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img src="https://placehold.co/600x400/333333/ffffff?text=Data+Visualization" alt="프로젝트 썸네일" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">연간 성과 보고서 디자인</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                딱딱한 수치 데이터를 인포그래픽으로 시각화하여 가독성을 높였습니다. 40페이지 분량의 편집 디자인 및 인쇄 감리를 총괄했습니다.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Editorial</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">InDesign</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">Infographic</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Portfolio;
