import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useSectionData } from '../hooks/useSectionData';

const defaultData = {
  name: '김 하 늘',
  birthDate: '1992. 01. 14',
  contact: '010-1234-5678 / sky@miridih.com',
  address: '서울특별시 구로구 구로디지털로 11',
  salary: '회사 내규에 따름',
};

const PersonalInformation = () => {
  const { isEditMode } = useAuth();
  const { data, loading, handleSave } = useSectionData('personal_information', defaultData);

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 animate-pulse">
        <div className="md:col-span-3">
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
        </div>
        <div className="md:col-span-9 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
      {/* 왼쪽 타이틀 */}
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">기본정보</h2>
        <p className="text-sm text-gray-500 mt-1">Personal Information</p>
      </div>
      {/* 오른쪽 내용 */}
      <div className="md:col-span-9 space-y-3 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row row-divider pb-2">
          <span className="w-32 font-bold text-gray-700">이름</span>
          <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.name} onSave={(v) => handleSave('name', v)} className="text-gray-900" />
        </div>
        <div className="flex flex-col sm:flex-row row-divider pb-2">
          <span className="w-32 font-bold text-gray-700">생년월일</span>
          <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.birthDate} onSave={(v) => handleSave('birthDate', v)} className="text-gray-900" />
        </div>
        <div className="flex flex-col sm:flex-row row-divider pb-2">
          <span className="w-32 font-bold text-gray-700">연락처</span>
          <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.contact} onSave={(v) => handleSave('contact', v)} className="text-gray-900" />
        </div>
        <div className="flex flex-col sm:flex-row row-divider pb-2">
          <span className="w-32 font-bold text-gray-700">주소</span>
          <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.address} onSave={(v) => handleSave('address', v)} className="text-gray-900" />
        </div>
        <div className="flex flex-col sm:flex-row pb-2">
          <span className="w-32 font-bold text-gray-700">희망연봉</span>
          <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.salary} onSave={(v) => handleSave('salary', v)} className="text-gray-900" />
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
