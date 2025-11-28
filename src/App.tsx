import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import { useAuth } from './contexts/AuthContext';
import { useToast } from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { isEditMode, signOut } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === 'l') {
        event.preventDefault();
        if (isEditMode) {
          addToast('이미 편집 모드입니다.', 'info');
        } else {
          setShowLogin(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditMode, addToast]);

  const handleSignOut = async () => {
    await signOut();
    addToast('정상적으로 로그아웃되었습니다.', 'success');
  };

  return (
    <>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      <ToastContainer />

      {/* 컨트롤 패널 (인쇄 버튼 등) */}
      <div className="fixed top-4 right-4 z-50 no-print flex gap-2">
        {isEditMode && (
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-500 transition"
          >
            편집 모드 종료
          </button>
        )}
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition flex items-center gap-2"
        >
          <i className="fas fa-print"></i> PDF 저장 / 인쇄
        </button>
      </div>
      
      <Outlet />
    </>
  )
}

export default App
