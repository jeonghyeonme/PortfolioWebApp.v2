import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { useToast } from '../contexts/ToastContext';
import { UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  bucketName: string;
  currentUrl: string;
  onUploadSuccess: (newUrl: string) => void;
  aspectRatio?: string;
  objectFit?: 'object-cover' | 'object-contain';
}

export const ImageUpload = ({ 
  bucketName, 
  currentUrl, 
  onUploadSuccess, 
  aspectRatio = 'aspect-square',
  objectFit = 'object-cover' 
}: ImageUploadProps) => {
  const { isEditMode } = useAuth();
  const { addToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [displayUrl, setDisplayUrl] = useState(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Add cache-busting timestamp whenever the URL changes to prevent network errors
    if (currentUrl) {
      setDisplayUrl(`${currentUrl}?t=${new Date().getTime()}`);
    }
  }, [currentUrl]);

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // To prevent overwriting, create a unique file path.
      const fileExt = file.name.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error('Could not get public URL for the uploaded file.');
      }
      
      // Pass the clean URL (without timestamp) to the parent
      onUploadSuccess(urlData.publicUrl);
      
    } catch (error: any) {
      addToast('이미지 업로드에 실패했습니다.', 'error');
      console.error('Image upload error:', error.message);
    } finally {
      setIsUploading(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div 
      className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden bg-gray-100 group ${isEditMode ? 'cursor-pointer' : ''}`}
      onClick={handleImageClick}
    >
      <img src={displayUrl} alt="프로필 이미지" className={`w-full h-full ${objectFit}`} />
      {isEditMode && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center">
            {isUploading ? (
              <p>업로드 중...</p>
            ) : (
              <>
                <UploadCloud size={32} className="mx-auto" />
                <p className="font-bold">이미지 변경</p>
                <p className="text-xs">클릭하여 파일 선택</p>
              </>
            )}
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif, image/webp"
        disabled={isUploading}
      />
    </div>
  );
};
