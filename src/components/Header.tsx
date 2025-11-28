import { useAuth } from '../contexts/AuthContext';
import { Editable } from './Editable';
import { useTextData } from '../hooks/useTextData';

const Header = () => {
  const { isEditMode } = useAuth();
  const { data: title, loading, handleSave } = useTextData('header_title', '이 력 서');

  if (loading) {
    return (
      <header className="bg-[#333333] text-white p-10 pt-16 pb-12 animate-pulse">
        <div className="h-10 bg-gray-600 rounded w-1/4" />
        <div className="h-6 bg-gray-600 rounded w-1/6 mt-3" />
      </header>
    );
  }

  return (
    <header className="bg-[#333333] text-white p-10 pt-16 pb-12">
      <div className="flex items-end gap-3">
        <Editable
          editAs="input"
          displayAs="h1"
          isEditMode={isEditMode}
          initialValue={title}
          onSave={handleSave}
          className="text-4xl font-bold tracking-wide"
        />
        <span className="text-xl font-light text-gray-300 pb-1">Resume</span>
      </div>
    </header>
  );
};

export default Header;
