import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useSectionData } from '../hooks/useSectionData';
import _ from 'lodash';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../supabaseClient';
import { PlusCircle, Trash2 } from 'lucide-react';

const defaultData: any[] = [];

const Portfolio = () => {
  const { isEditMode } = useAuth();
  const { data, loading, setData } = useSectionData('portfolio', defaultData);
  const { addToast } = useToast();

  const saveChanges = async (newData: any) => {
    const { error } = await supabase
      .from('sections')
      .upsert({ id: 'portfolio', data: newData });

    if (error) {
      addToast('저장에 실패했습니다.', 'error');
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
      title: "새 프로젝트",
      summary: "프로젝트에 대한 간단한 설명입니다.",
      tags: "Tag1, Tag2",
      detail: {
        headerImage: "https://placehold.co/1200x600/cccccc/ffffff?text=New+Project",
        description: "",
        problem: "",
        solution: "",
        outcome: "",
        gallery: []
      }
    };
    const newData = [...data, newItem];
    setData(newData);
    saveChanges(newData);
  };

  const handleDeleteItem = (itemId: string) => {
    const newData = data.filter((item: any) => item.id !== itemId);
    setData(newData);
    saveChanges(newData);
  };

  if (loading) {
    return <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 mt-8 animate-pulse">
      <div className="md:col-span-3 h-6 bg-gray-200 rounded w-2/3" />
      <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-72 bg-gray-200 rounded-lg" />
        <div className="h-72 bg-gray-200 rounded-lg" />
      </div>
    </section>;
  }

  if (!isEditMode && data.length === 0) {
    return null;
  }

  const renderCardContent = (item: any) => (
    <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white relative">
      {isEditMode && <button onClick={(e) => {e.preventDefault(); handleDeleteItem(item.id)}} className="absolute top-2 right-2 z-10 bg-white/70 rounded-full p-1 text-red-500 hover:text-red-700"><Trash2 size={18}/></button>}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        <img src={`${item.detail.headerImage}?t=${new Date().getTime()}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-5">
        <Editable editAs='input' displayAs='h3' isEditMode={isEditMode} initialValue={item.title} onSave={(v) => handleUpdateItem(item.id, 'title', v)} className="font-bold text-lg text-gray-800 mb-2" />
        <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={item.summary} onSave={(v) => handleUpdateItem(item.id, 'summary', v)} className="text-sm text-gray-600 mb-4 line-clamp-2" />
        
        {isEditMode ? (
          <div>
            <label className='text-xs font-bold'>Tags (쉼표로 구분):</label>
            <Editable editAs='input' displayAs='p' isEditMode={isEditMode} initialValue={item.tags} onSave={(v) => handleUpdateItem(item.id, 'tags', v)} className="text-xs text-gray-500" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 text-xs">
            {item.tags.split(',').map((tag: string) => tag.trim() && <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded">{tag.trim()}</span>)}
          </div>
        )}

      </div>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6 mt-8">
      <div className="md:col-span-3">
        <h2 className="text-xl font-bold text-gray-800">포트폴리오</h2>
        <p className="text-sm text-gray-500 mt-1">Portfolio</p>
      </div>
      <div className="md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map((item: any) => (
            isEditMode 
              ? <div key={item.id}>{renderCardContent(item)}</div> 
              : <Link key={item.id} to={`/portfolio/${item.id}`}>{renderCardContent(item)}</Link>
          ))}
        </div>
        {isEditMode && (
          <div className="flex justify-center mt-6">
            <button onClick={handleAddItem} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-semibold py-2 px-4">
              <PlusCircle size={16} />
              포트폴리오 추가
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
