'use client'
import React, { useState, useRef, useEffect, ReactNode, ReactElement, isValidElement, cloneElement } from 'react';

interface NavMenuDropdownProps {
  triggerElement?: ReactNode;
  children?: ReactNode;
  level?: number; // To manage submenu direction
}

export default function NavMenuDropdown({ triggerElement, children, level = 0 }: NavMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine submenu position based on level
  const submenuClasses =
    level === 0
      ? 'absolute left-0 top-full md:static' // even levels → down
      : 'absolute left-full top-0 md:static';      // odd levels → right

  // Recursively add level to children Dropdowns
  const renderChildren = () => {
    return (
      <>
        {children &&
          // Clone children to pass down level prop
          React.Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child as ReactElement<any>, { level: level + 1 });
            }
            return child;
          })}
      </>
    );
  };

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-between group gap-3 px-2 py-2 text-primary-foreground md:text-background hover:text-primary md:px-0">
        {triggerElement && <span className={'text-inherit md:text-inherit hover:text-inherit group-hover:text-inherit focus-visible:text-inherit'}>{triggerElement}</span>}
        {children && (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
            className="transition outline-none group-hover:text-primary focus-visible:text-primary"
          >
            <svg
              className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {children && isOpen && (
        <div className={`z-50 ${level === 0 ? 'pt-4 md:pt-0' : 'pt-0'}  ${submenuClasses}`}>
          <div
            className={`min-w-60 bg-background border border-border rounded-md shadow-lg md:bg-transparent md:text-background md:border-0 md:rounded-none md:shadow-none`}
          >
            {renderChildren()}
          </div>
        </div>
      )}
    </div>
  )
}