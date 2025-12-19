"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  children: ReactNode;
  searchable?: boolean;
  buttonClass?: string;
  dropdownClass?: string
}

export function DropdownMenu({
  items,
  children,
  searchable,
  buttonClass,
  dropdownClass,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center'
      >
        <button className={`outline-none border border-border rounded-full flex items-center ${buttonClass}`}>
          {children}
          {children && (
            <FiChevronDown
              className={`text-primary ml-1 transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          )}
        </button>
      </div>
      {isOpen && (
        <div className={`absolute z-50 right-0 mt-0.5 ${dropdownClass} bg-white border border-border rounded-2xl py-4 px-3 shadow-lg overflow-hidden`}>
          {searchable && (
            <div className="flex items-center gap-2 py-3 px-4 mb-2 border border-border rounded-full">
              <FiSearch className="text-gray-400" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
          )}
          {filteredItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
                setSearch("");
              }}
              className="w-full p-3 text-left hover:bg-card-bg rounded-xl transition-colors flex items-center gap-2 text-primary font-medium text-sm"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
