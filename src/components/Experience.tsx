const Experience = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-gray-700 pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">경력사항</h2>
        <p className="text-sm text-gray-500 mt-1">Experience</p>
      </div>
      <div className="md:col-span-9 text-sm md:text-base space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 border-b pb-6">
          <div className="sm:w-1/4">
            <p className="text-gray-800 font-bold">2021.03 - 2022.02</p>
            <p className="text-gray-500 text-sm mt-1">1년</p>
          </div>
          <div className="sm:w-3/4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">스타트업 A사</h3>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">마케팅팀 / 사원</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>SNS 콘텐츠 기획 및 제작 (인스타그램, 블로그)</li>
              <li>브랜드 디자인 가이드라인 수립 보조</li>
              <li>퍼포먼스 마케팅 데이터 집계 및 기초 분석</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pb-6">
          <div className="sm:w-1/4">
            <p className="text-gray-800 font-bold">2022.03 - 현재</p>
            <p className="text-gray-500 text-sm mt-1">재직중</p>
          </div>
          <div className="sm:w-3/4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">중견기업 B사</h3>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">콘텐츠팀 / 대리</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>신규 서비스 런칭 프로모션 디자인 총괄</li>
              <li>자사몰 웹사이트 UX/UI 개선 프로젝트 참여</li>
              <li>외주 디자인 업체 커뮤니케이션 및 일정 관리</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
