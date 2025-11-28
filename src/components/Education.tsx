import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useSectionData } from '../hooks/useSectionData';
import _ from 'lodash';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../supabaseClient';
import { PlusCircle, Trash2 } from 'lucide-react';

const defaultData: any[] = [];

const Education = () => {
  const { isEditMode } = useAuth();
  const { data, loading, setData } = useSectionData('education', defaultData);
  const { addToast } = useToast();

  const saveChanges = async (newData: any) => {
    const { error } = await supabase
      .from('sections')
      .upsert({ id: 'education', data: newData });

    if (error) {
      addToast('저장에 실패했습니다.', 'error');
      console.error('Error updating education:', error);
    } else {
      addToast('성공적으로 저장되었습니다.', 'success');
    }
  };

  const handleUpdateItem = (itemId: string, field: string, value: string) => {
    const newData = _.cloneDeep(data);
    const itemIndex = newData.findIndex((item: any) => item.id === itemId);
    if (itemIndex > -1) {
      _.set(newData[itemIndex], field, value);
      setData(newData);
      saveChanges(newData);
    }
  };
  
  const handleAddItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      period: 'YYYY.MM - YYYY.MM',
      school: '학교명 (전공)',
      status: '졸업'
    };
    const newData = [...data, newItem];
    setData(newData);
    saveChanges(newData);
  };

  const handleDeleteItem = (itemId: string) => {
    const newData = data.filter((item: any) => item.id !== itemId);
    setData(newData);
    saveChanges(newData);
  }

  if (loading) {
    return <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 animate-pulse">
      <div className="md:col-span-3 h-6 bg-gray-200 rounded w-2/3" />
      <div className="md:col-span-9 space-y-4">
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-5 bg-gray-200 rounded w-full" />
      </div>
    </section>;
  }

  if (!isEditMode && data.length === 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">학력사항</h2>
        <p className="text-sm text-gray-500 mt-1">Education</p>
      </div>
      <div className="md:col-span-9 text-sm md:text-base">
        {data.length > 0 ? (
          data.map((edu: any, index: number) => (
            <div key={edu.id} className={`flex flex-col sm:flex-row justify-between py-3 relative ${index < data.length - 1 ? 'row-divider' : ''}`}>
              {isEditMode && <button onClick={() => handleDeleteItem(edu.id)} className="absolute top-1 right-0 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>}
              <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={edu.period} onSave={(v) => handleUpdateItem(edu.id, 'period', v)} className="text-gray-600 sm:w-1/3" />
              <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={edu.school} onSave={(v) => handleUpdateItem(edu.id, 'school', v)} className="font-medium text-gray-800 sm:w-1/3" />
              <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={edu.status} onSave={(v) => handleUpdateItem(edu.id, 'status', v)} className="text-gray-500 sm:w-1/3 sm:text-right" />
            </div>
          ))
        ) : (
          isEditMode && (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">학력 사항이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">아래 버튼을 눌러 첫 학력을 추가해보세요.</p>
            </div>
          )
        )}
        {isEditMode && (
          <div className="flex justify-center mt-4">
            <button onClick={handleAddItem} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold py-2 px-4">
              <PlusCircle size={16} />
              학력 추가
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
