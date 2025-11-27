import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useToast } from '../contexts/ToastContext';
import _ from 'lodash';

export const useSectionData = (sectionId: string, defaultData: any) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: dbData, error } = await supabase
        .from('sections')
        .select('data')
        .eq('id', sectionId)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore 'single row not found'
        console.error(`Error fetching ${sectionId}:`, error);
      } else if (dbData) {
        setData(_.merge({}, defaultData, dbData.data));
      }
      setLoading(false);
    };

    fetchData();

    const channel = supabase
      .channel(`sections-${sectionId}-channel`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sections',
          filter: `id=eq.${sectionId}`,
        },
        (payload: any) => {
          setData(_.merge({}, defaultData, payload.new.data));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionId, defaultData]);

  const handleSave = useCallback(async (field: string, newValue: string) => {
    const originalData = _.cloneDeep(data);
    const updatedData = _.cloneDeep(data);
    _.set(updatedData, field, newValue);
    
    setData(updatedData); // Optimistic update

    const { error } = await supabase
      .from('sections')
      .upsert({ id: sectionId, data: updatedData });
    
    if (error) {
        addToast('저장에 실패했습니다.', 'error');
        console.error(`Error updating ${sectionId}:`, error);
        setData(originalData); // Revert on error
    } else {
        addToast('성공적으로 저장되었습니다.', 'success');
    }
  }, [data, sectionId, addToast]);

  return { data, loading, handleSave };
};
