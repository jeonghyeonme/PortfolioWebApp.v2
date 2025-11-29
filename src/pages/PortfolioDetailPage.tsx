import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSectionData } from '../hooks/useSectionData';
import { useAuth } from '../contexts/AuthContext';
import { Editable } from '../components/Editable';
import { supabase } from '../supabaseClient';
import { useToast } from '../contexts/ToastContext';
import _ from 'lodash';
import { ArrowLeft } from 'lucide-react';
import { ImageUpload } from '../components/ImageUpload';

const defaultPortfolioData: any[] = [];

const PortfolioDetailPage = () => {
  const { projectId } = useParams();
  const { isEditMode } = useAuth();
  const { addToast } = useToast();
  // Fetch all portfolio data, default to an empty array
  const { data: portfolioData, loading, setData: setPortfolioData } = useSectionData('portfolio', defaultPortfolioData);

  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!loading && portfolioData.length > 0) {
      const foundProject = portfolioData.find((p: any) => p.id === projectId);
      setProject(foundProject);
    }
  }, [projectId, portfolioData, loading]);

  const handleSave = async (fieldPath: string, newValue: string) => {
    const updatedPortfolioData = _.cloneDeep(portfolioData);
    const projectIndex = updatedPortfolioData.findIndex((p: any) => p.id === projectId);

    if (projectIndex > -1) {
      _.set(updatedPortfolioData[projectIndex], fieldPath, newValue);
      
      // Optimistically update local state
      setPortfolioData(updatedPortfolioData);
      setProject(updatedPortfolioData[projectIndex]);

      const { error } = await supabase
        .from('sections')
        .upsert({ id: 'portfolio', data: updatedPortfolioData });
      
      if (error) {
        addToast('저장에 실패했습니다.', 'error');
        // Revert logic could be added here if needed
      } else {
        addToast('성공적으로 저장되었습니다.', 'success');
      }
    }
  };
  
  if (loading) {
    return (
       <div className="paper pb-10 animate-pulse">
        <main className="px-10 py-8">
          <div className="h-8 w-1/4 bg-gray-200 rounded mb-8"></div>
          <div className="h-80 bg-gray-200 rounded-lg mb-8"></div>
          <div className="space-y-6">
            <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="paper pb-10">
        <main className="px-10 py-8 text-center">
          <h1 className="text-2xl font-bold">프로젝트를 찾을 수 없습니다.</h1>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            홈으로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="paper pb-10">
      <header className="px-10 pt-8 no-print">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
          <ArrowLeft size={20} />
          <span>포트폴리오 목록으로 돌아가기</span>
        </Link>
      </header>
      <main className="px-10 py-8 space-y-12">
        {/* --- Page Title --- */}
        <div className="text-center">
          <Editable editAs='input' displayAs='h1' isEditMode={isEditMode} initialValue={project.title} onSave={(v) => handleSave('title', v)} className="text-4xl font-bold text-gray-800" />
        </div>

        {/* --- Header Image --- */}
        <div className="mb-8">
          <ImageUpload
            bucketName="portfolio-assets"
            currentUrl={project.detail.headerImage}
            onUploadSuccess={(newUrl) => handleSave('detail.headerImage', newUrl)}
            aspectRatio="aspect-video"
            objectFit="object-contain"
          />
        </div>

        {/* --- Description --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold text-gray-800">개요</h2>
            <p className="text-sm text-gray-500 mt-1">Description</p>
          </div>
          <div className="md:col-span-9 prose lg:prose-lg max-w-none">
            <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={project.detail.description} onSave={(v) => handleSave('detail.description', v)} />
          </div>
        </div>
        
        {/* --- Problem --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold text-gray-800">문제점</h2>
            <p className="text-sm text-gray-500 mt-1">Problem</p>
          </div>
          <div className="md:col-span-9 prose lg:prose-lg max-w-none">
            <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={project.detail.problem} onSave={(v) => handleSave('detail.problem', v)} />
          </div>
        </div>

        {/* --- Solution --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold text-gray-800">해결 방안</h2>
            <p className="text-sm text-gray-500 mt-1">Solution</p>
          </div>
          <div className="md:col-span-9 prose lg:prose-lg max-w-none">
            <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={project.detail.solution} onSave={(v) => handleSave('detail.solution', v)} />
          </div>
        </div>

        {/* --- Outcome --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 section-divider pt-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold text-gray-800">주요 성과</h2>
            <p className="text-sm text-gray-500 mt-1">Outcome</p>
          </div>
          <div className="md:col-span-9 prose lg:prose-lg max-w-none">
            <Editable editAs='textarea' displayAs='p' isEditMode={isEditMode} initialValue={project.detail.outcome} onSave={(v) => handleSave('detail.outcome', v)} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDetailPage;
