const Education = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-gray-700 pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">학력사항</h2>
        <p className="text-sm text-gray-500 mt-1">Education</p>
      </div>
      <div className="md:col-span-9 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row justify-between border-b py-3">
          <span className="text-gray-600 sm:w-1/3">2011.03 - 2014.02</span>
          <span className="font-medium text-gray-800 sm:w-1/3">미리고등학교 (인문계)</span>
          <span className="text-gray-500 sm:w-1/3 text-right">-</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between border-b py-3">
          <span className="text-gray-600 sm:w-1/3">2014.03 - 2018.02</span>
          <span className="font-medium text-gray-800 sm:w-1/3">미리대학교 / 경영학과</span>
          <span className="text-gray-500 sm:w-1/3 text-right">3.85 / 4.5</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between py-3">
          <span className="text-gray-600 sm:w-1/3">2018.03 - 2020.02</span>
          <span className="font-medium text-gray-800 sm:w-1/3">미리대학원</span>
          <span className="text-gray-500 sm:w-1/3 text-right">3.85 / 4.5</span>
        </div>
      </div>
    </section>
  );
};

export default Education;
