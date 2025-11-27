import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useToast } from '../contexts/ToastContext';

export const useTextData = (textId: string, defaultData: string) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: dbData, error } = await supabase
        .from('texts')
        .select('content')
        .eq('id', textId)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore 'single row not found'
        console.error(`Error fetching ${textId}:`, error);
      } else if (dbData) {
        setData(dbData.content);
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel(`texts-${textId}-channel`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'texts',
          filter: `id=eq.${textId}`,
        },
        (payload: any) => {
          setData(payload.new.content);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [textId, defaultData]);

  const handleSave = useCallback(async (newValue: string) => {
    const originalData = data;
    setData(newValue); // Optimistic update

    const { error } = await supabase
      .from('texts')
      .upsert({ id: textId, content: newValue });
    
    if (error) {
        addToast('저장에 실패했습니다.', 'error');
        console.error(`Error updating ${textId}:`, error);
        setData(originalData); // Revert on error
    } else {
        addToast('성공적으로 저장되었습니다.', 'success');
    }
  }, [data, textId, addToast]);

  return { data, loading, handleSave };
};
