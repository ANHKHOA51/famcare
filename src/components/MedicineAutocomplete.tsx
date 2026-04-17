import React, { useState, useEffect, useRef } from "react";
import { Pill } from "lucide-react";
import { MEDICINE_SUGGESTIONS } from "@/data/medicineSuggestions";

interface MedicineAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MedicineAutocomplete = ({ value, onChange, placeholder, className }: MedicineAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (val.trim().length >= 2) {
      const filtered = MEDICINE_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (s: string) => {
    onChange(s);
    setShowSuggestions(false);
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => {
          if (value.trim().length >= 2 && suggestions.length > 0) setShowSuggestions(true);
        }}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      {showSuggestions && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl z-[100] overflow-hidden max-h-56 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s}
              onMouseDown={() => handleSelect(s)}
              className="px-4 py-2.5 text-sm text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 cursor-pointer transition-colors flex items-center gap-2"
            >
              <Pill size={13} className="text-slate-400 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineAutocomplete;
