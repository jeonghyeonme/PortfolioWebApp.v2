const PersonalInformation = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t-2 border-gray-700 pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">기본정보</h2>
        <p className="text-sm text-gray-500 mt-1">Personal Information</p>
      </div>
      <div className="md:col-span-9 space-y-3 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row border-b pb-2">
          <span className="w-32 font-bold text-gray-700">이름</span>
          <span className="text-gray-900">김 하 늘</span>
        </div>
        <div className="flex flex-col sm:flex-row border-b pb-2">
          <span className="w-32 font-bold text-gray-700">생년월일</span>
          <span className="text-gray-900">1992. 01. 14</span>
        </div>
        <div className="flex flex-col sm:flex-row border-b pb-2">
          <span className="w-32 font-bold text-gray-700">연락처</span>
          <span className="text-gray-900">010-1234-5678 / sky@miridih.com</span>
        </div>
        <div className="flex flex-col sm:flex-row border-b pb-2">
          <span className="w-32 font-bold text-gray-700">주소</span>
          <span className="text-gray-900">서울특별시 구로구 구로디지털로 11</span>
        </div>
        <div className="flex flex-col sm:flex-row pb-2">
          <span className="w-32 font-bold text-gray-700">희망연봉</span>
          <span className="text-gray-900">회사 내규에 따름</span>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
