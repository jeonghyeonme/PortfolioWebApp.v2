import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useSectionData } from '../hooks/useSectionData';
import _ from 'lodash';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../supabaseClient';
import { PlusCircle, Trash2 } from 'lucide-react';

const defaultData: any[] = [];

const Experience = () => {
  const { isEditMode } = useAuth();
  const { addToast } = useToast();
  const { data, loading, setData } = useSectionData('experience', defaultData);

  const saveChanges = async (newData: any) => {
    const { error } = await supabase
      .from('sections')
      .upsert({ id: 'experience', data: newData });

    if (error) {
      addToast('저장에 실패했습니다.', 'error');
      console.error('Error updating experience:', error);
      // Note: Reverting state could be complex here, toast is the main feedback
      // For a slightly better UX, we could refetch data on error.
      // For now, we rely on the user to manually fix or reload.
    } else {
      addToast('성공적으로 저장되었습니다.', 'success');
    }
  };

  const handleUpdateItem = (itemId: string, field: string, value: string) => {
    const newData = _.cloneDeep(data);
    const itemIndex = newData.findIndex((item:any) => item.id === itemId);
    if (itemIndex > -1) {
      _.set(newData[itemIndex], field, value);
      setData(newData); // Optimistic update
      saveChanges(newData);
    }
  };
  
  const handleAddItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      period: 'YYYY.MM - YYYY.MM',
      company: '회사명',
      role: '팀/직책',
      description: '- 주요 업무 내용'
    };
    const newData = [...data, newItem];
    setData(newData);
    saveChanges(newData);
  };

  const handleDeleteItem = (itemId: string) => {
    const newData = data.filter((item:any) => item.id !== itemId);
    setData(newData);
    saveChanges(newData);
  }

  if (loading) {
    return <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 animate-pulse">
      <div className="md:col-span-3 h-6 bg-gray-200 rounded w-2/3" />
      <div className="md:col-span-9 space-y-6">
        <div className="h-24 bg-gray-200 rounded w-full" />
      </div>
    </section>;
  }

  if (!isEditMode && data.length === 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">경력사항</h2>
        <p className="text-sm text-gray-500 mt-1">Experience</p>
      </div>
      <div className="md:col-span-9 text-sm md:text-base space-y-6">
        {data.length > 0 ? (
          data.map((exp: any, index: number) => (
            <div key={exp.id} className={`flex flex-col sm:flex-row gap-4 pb-6 ${index < data.length - 1 ? 'row-divider' : ''}`}>
              <div className="sm:w-1/4">
                <Editable editAs='input' displayAs='p' isEditMode={isEditMode} initialValue={exp.period} onSave={(v) => handleUpdateItem(exp.id, 'period', v)} className="text-gray-800 font-bold" />
              </div>
              <div className="sm:w-3/4 relative">
                {isEditMode && <button onClick={() => handleDeleteItem(exp.id)} className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>}
                <div className="flex justify-between items-center mb-2">
                  <Editable editAs='input' displayAs='h3' isEditMode={isEditMode} initialValue={exp.company} onSave={(v) => handleUpdateItem(exp.id, 'company', v)} className="font-bold text-lg" />
                  <Editable editAs='input' displayAs='span' isEditMode={isEditMode} initialValue={exp.role} onSave={(v) => handleUpdateItem(exp.id, 'role', v)} className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600" />
                </div>
                <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={exp.description} onSave={(v) => handleUpdateItem(exp.id, 'description', v)} className="list-disc list-inside text-gray-600 space-y-1 text-sm whitespace-pre-line" />
              </div>
            </div>
          ))
        ) : (
          isEditMode && (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">경력 사항이 없습니다.</p>
              <p className="text-gray-400 text-sm mt-1">아래 버튼을 눌러 첫 경력을 추가해보세요.</p>
            </div>
          )
        )}
        {isEditMode && (
          <div className="flex justify-center mt-4">
            <button onClick={handleAddItem} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold py-2 px-4">
              <PlusCircle size={16} />
              경력 추가
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
