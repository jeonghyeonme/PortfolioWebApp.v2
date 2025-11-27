import { useState, useEffect, useRef, createElement } from 'react';

interface EditableProps {
  isEditMode: boolean;
  initialValue: string;
  onSave: (newValue: string) => void;
  className?: string;
  editAs: 'input' | 'textarea';
  displayAs?: 'h1' | 'h3' | 'p' | 'span';
}

export const Editable = ({
  isEditMode,
  initialValue,
  onSave,
  className,
  editAs,
  displayAs = 'p',
}: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      if (editAs === 'input' && inputRef.current) {
        inputRef.current.focus();
      } else if (editAs === 'textarea' && textareaRef.current) {
        textareaRef.current.focus();
        // Auto-resize textarea
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }
  }, [isEditing, editAs]);

  const handleStartEditing = () => {
    if (isEditMode) {
      setValue(initialValue);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (initialValue !== value) {
      onSave(value);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(initialValue);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (editAs === 'textarea' && e.target) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && editAs === 'input') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditMode) {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    return createElement(displayAs, {
      className,
      dangerouslySetInnerHTML: { __html: initialValue },
    });
  }

  if (isEditing) {
    const commonProps = {
      value,
      onChange: handleChange,
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      className: `${className} w-full bg-transparent border-b border-gray-500 outline-none resize-none`,
    };
    return editAs === 'textarea' ? (
      <textarea ref={textareaRef} {...commonProps} />
    ) : (
      <input ref={inputRef} type="text" {...commonProps} />
    );
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return createElement(displayAs, {
    className: `${className} ${isEditMode ? 'cursor-pointer hover:bg-gray-500/10 rounded-md p-1 m-[-0.25rem]' : ''}`,
    onClick: handleStartEditing,
    dangerouslySetInnerHTML: { __html: initialValue },
  });
};
