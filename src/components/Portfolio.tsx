const Portfolio = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-gray-700 pt-6 mt-8">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">포트폴리오</h2>
        <p className="text-sm text-gray-500 mt-1">Portfolio</p>
      </div>
      <div className="md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          {/* ... more portfolio items */}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
