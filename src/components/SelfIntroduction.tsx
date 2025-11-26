const SelfIntroduction = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 mt-8">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">자기소개서</h2>
        <p className="text-sm text-gray-500 mt-1">Self Introduction</p>
      </div>
      <div className="md:col-span-9 space-y-8 text-sm md:text-base leading-relaxed text-justify">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">성장 과정</h3>
          <p className="text-gray-700">
            어린 시절부터 그림 그리기와 무언가를 만드는 것을 좋아했습니다. 이러한 흥미는 자연스럽게 디자인에 대한 관심으로 이어졌고, 
            대학교에서 시각 디자인을 전공하며 전문적인 지식을 쌓았습니다. 특히 팀 프로젝트를 진행하며 다양한 의견을 조율하고 
            하나의 결과물을 만들어내는 과정에서 소통의 중요성을 깊이 깨달았습니다. 항상 새로운 트렌드에 민감하게 반응하며, 
            배움을 멈추지 않는 자세로 성장해왔습니다.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">성격의 장단점</h3>
          <p className="text-gray-700">
            저의 가장 큰 장점은 <strong>꼼꼼함과 책임감</strong>입니다. 맡은 일은 끝까지 책임지고 마무리하며, 
            작은 디테일 하나도 놓치지 않으려 노력합니다. 이러한 성격 덕분에 동료들로부터 신뢰를 얻으며 업무를 수행해왔습니다. 
            반면, 지나치게 신중한 탓에 결정이 늦어질 때가 있습니다. 이를 보완하기 위해 업무의 우선순위를 정하고, 
            데드라인을 엄격히 설정하여 효율적으로 일 처리를 하려고 노력하고 있습니다.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">지원 동기 및 포부</h3>
          <p className="text-gray-700">
            귀사가 추구하는 혁신적인 가치와 디자인 철학에 깊이 공감하여 지원하게 되었습니다. 
            특히 최근 런칭한 서비스의 사용자 경험 중심 디자인은 저에게 큰 영감을 주었습니다. 
            저의 디자인 역량과 마케팅 경험을 바탕으로 귀사의 브랜드 가치를 높이는 데 기여하고 싶습니다. 
            입사 후에는 팀원들과 적극적으로 소통하며 시너지를 내고, 끊임없이 역량을 개발하여 
            대체 불가능한 인재가 되도록 최선을 다하겠습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelfIntroduction;
