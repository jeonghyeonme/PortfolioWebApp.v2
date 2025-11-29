import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useSectionData } from '../hooks/useSectionData';
import { ImageUpload } from './ImageUpload';

const defaultData = {
  profileImageUrl: 'https://placehold.co/400x400/eeeeee/333333?text=Profile',
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
      <section className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 pt-6">
        <div className="md:col-span-4">
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="md:col-span-8 flex flex-col justify-center space-y-4">
           <div className="h-10 bg-gray-200 rounded w-1/2" />
           <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
           </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 pt-6">
      {/* 왼쪽 프로필 이미지 */}
      <div className="md:col-span-4">
        <ImageUpload 
          bucketName="portfolio-assets"
          currentUrl={data.profileImageUrl}
          onUploadSuccess={(newUrl) => handleSave('profileImageUrl', newUrl)}
          aspectRatio="aspect-[3/4]"
        />
      </div>

      {/* 오른쪽 내용 */}
      <div className="md:col-span-8 flex flex-col justify-center text-sm md:text-base">
        <Editable editAs='input' displayAs='h1' isEditMode={isEditMode} initialValue={data.name} onSave={(v) => handleSave('name', v)} className="text-4xl font-bold tracking-wide" />
        <p className='text-xl font-light text-gray-500 mb-6'>Resume</p>
        
        <div className="space-y-3 border-t pt-6">
          <div className="flex">
            <span className="w-24 font-bold text-gray-700">생년월일</span>
            <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.birthDate} onSave={(v) => handleSave('birthDate', v)} className="text-gray-900" />
          </div>
          <div className="flex">
            <span className="w-24 font-bold text-gray-700">연락처</span>
            <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.contact} onSave={(v) => handleSave('contact', v)} className="text-gray-900" />
          </div>
          <div className="flex">
            <span className="w-24 font-bold text-gray-700">주소</span>
            <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.address} onSave={(v) => handleSave('address', v)} className="text-gray-900" />
          </div>
          <div className="flex">
            <span className="w-24 font-bold text-gray-700">희망연봉</span>
            <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={data.salary} onSave={(v) => handleSave('salary', v)} className="text-gray-900" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
