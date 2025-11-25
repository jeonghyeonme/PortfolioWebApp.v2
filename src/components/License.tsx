const License = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-gray-700 pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">자격증</h2>
        <p className="text-sm text-gray-500 mt-1">License</p>
      </div>
      <div className="md:col-span-9 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row justify-between border-b py-3">
          <span className="text-gray-600 sm:w-1/4">2021.08</span>
          <span className="font-medium text-gray-800 sm:w-2/4">컴퓨터활용능력 1급</span>
          <span className="text-gray-500 sm:w-1/4 text-right">대한상공회의소</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b py-3">
          <span className="text-gray-600 sm:w-1/4">2022.05</span>
          <span className="font-medium text-gray-800 sm:w-2/4">GTQ 포토샵 1급</span>
          <span className="text-gray-500 sm:w-1/4 text-right">한국생산성본부</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between py-3">
          <span className="text-gray-600 sm:w-1/4">2023.11</span>
          <span className="font-medium text-gray-800 sm:w-2/4">SQL 개발자(SQLD)</span>
          <span className="text-gray-500 sm:w-1/4 text-right">한국데이터산업진흥원</span>
        </div>
      </div>
    </section>
  );
};

export default License;
