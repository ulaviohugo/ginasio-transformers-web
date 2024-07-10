import React, { ElementType, ReactNode, useState, useRef, useEffect, SelectHTMLAttributes } from 'react';
import { StringUtils } from '@/utils';
import { FormControlWrapper } from '.';

type OptionType = { text: string; value?: string | number };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: ReactNode;
    icon?: ElementType;
    data: OptionType[];
    defaultText?: string;
    className?: string;
    required?: boolean;
    onChange?: (selectedOptions: OptionType[]) => void;
    id?: string;
};

export function SelectCheckBox({
    label,
    icon: Icon,
    data,
    defaultText,
    className,
    required,
    onChange,
    ...props
}: SelectProps) {
    const [focused, setFocused] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const componentId = props.id || StringUtils.generate({ length: 3 });

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionChange = (option: OptionType) => {
        const isSelected = selectedOptions.some(selected => selected.value === option.value);
        let updatedOptions;
        if (isSelected) {
            updatedOptions = selectedOptions.filter(selected => selected.value !== option.value);
        } else {
            updatedOptions = [...selectedOptions, option];
        }
        setSelectedOptions(updatedOptions);
        if (onChange) {
            onChange(updatedOptions);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <FormControlWrapper label={label} icon={Icon} required={required} id={componentId} focused={focused}>
            <div className={`relative ${className || ''}`} id={componentId} ref={dropdownRef}>
                <div
                    className="rounded p-2 cursor-pointer focus:outline-none text-sm w-full min-w-[340px] max-w-[400px]"
                    onClick={() => setShowDropdown(!showDropdown)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    tabIndex={0} // Adiciona a capacidade de focar o div
                >
                    {selectedOptions.length > 0
                        ? selectedOptions.map(option => option.text).join(', ')
                        : defaultText || 'Select options'}
                </div>
                {showDropdown && (
                    <div className="absolute z-10 border rounded bg-white mt-1 max-h-60 overflow-auto w-full min-w-[200px] max-w-[400px]">
                        {data.map(option => (
                            <label key={option.value || option.text} className="flex items-center p-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedOptions.some(selected => selected.value === option.value)}
                                    onChange={() => handleOptionChange(option)}
                                />
                                <span className="text-sm">{option.text}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </FormControlWrapper>
    );
}
