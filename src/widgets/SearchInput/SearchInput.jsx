import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cls from "./SearchInput.module.scss";
import searchIcon from "@/assets/icons/search.svg"; // замени на свой путь, если нужно

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlight = (text, query) => {
  const q = (query || "").trim();
  if (!q) return text;
  
  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = String(text).split(re);
  
  return parts.map((part, i) => {
    const isMatch = part.toLowerCase() === q.toLowerCase();
    return isMatch ? (
      <span key={i} className={cls.hl}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    );
  });
};

export const SearchInput = ({
                              value,
                              onChange,
                              items = [],              // ✅ сюда прокидываем товары
                              placeholder = "Найти товар",
                              onSelect,
                              maxSuggestions = 6,
                            }) => {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const suggestions = useMemo(() => {
    const q = (value || "").trim().toLowerCase();
    if (!q) return [];
    
    // берём title + убираем дубли + фильтруем по запросу
    const titles = items
      .map((x) => x?.title)
      .filter(Boolean);
    
    const unique = Array.from(new Set(titles));
    
    return unique
      .filter((t) => t.toLowerCase().includes(q))
      .slice(0, maxSuggestions);
  }, [items, maxSuggestions, value]);
  
  const showDropdown = isOpen && suggestions.length > 0 && (value || "").trim().length > 0;
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);
  
  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
      setActiveIndex(-1);
      open();
    },
    [onChange, open]
  );
  
  const handleFocus = useCallback(() => {
    open();
  }, [open]);
  
  const handleSelect = useCallback(
    (text) => {
      onChange(text);
      onSelect?.(text);
      close();
    },
    [close, onChange, onSelect]
  );
  
  const handleKeyDown = useCallback(
    (e) => {
      if (!showDropdown && (e.key === "ArrowDown" || e.key === "Enter")) {
        open();
        return;
      }
      
      if (!suggestions.length) return;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % suggestions.length);
      }
      
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
      }
      
      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      }
      
      if (e.key === "Escape") {
        close();
      }
    },
    [activeIndex, close, handleSelect, open, showDropdown, suggestions]
  );
  
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) close();
    };
    
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [close]);
  
  return (
    <div ref={rootRef} className={cls.root}>
      <div className={`${cls.field} ${showDropdown ? cls.fieldOpen : ""}`}>
        <input
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={cls.input}
          placeholder={placeholder}
        />
        
        <button type="button" className={cls.iconBtn} aria-label="Поиск" onClick={open}>
          <img src={searchIcon} alt="" />
        </button>
      </div>
      
      {showDropdown && (
        <div className={cls.dropdown} role="listbox">
          {suggestions.map((text, idx) => (
            <button
              key={`${text}-${idx}`}
              type="button"
              className={`${cls.item} ${idx === activeIndex ? cls.itemActive : ""}`}
              onClick={() => handleSelect(text)}
              role="option"
              aria-selected={idx === activeIndex}
            >
              {highlight(text, value)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
