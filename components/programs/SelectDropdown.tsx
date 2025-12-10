"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type Props = {
    label: string;
    value: string;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
};

export default function SelectDropdown({
    label,
    value,
    options,
    placeholder = "Select",
    disabled = false,
    onChange,
}: Props) {
    const id = useId();
    const rootRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const selectedLabel = useMemo(() => {
        const found = options.find((o) => o.value === value);
        return found?.label ?? "";
    }, [options, value]);

    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        }
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    useEffect(() => {
        if (!open) return;
        const idx = Math.max(
            0,
            options.findIndex((o) => o.value === value && !o.disabled)
        );
        setActiveIndex(idx);
    }, [open, options, value]);

    function commit(next: SelectOption) {
        if (next.disabled) return;
        onChange(next.value);
        setOpen(false);
        btnRef.current?.focus();
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (disabled) return;

        if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
            e.preventDefault();
            setOpen(true);
            return;
        }

        if (!open) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const opt = options[activeIndex];
            if (opt) commit(opt);
        }
    }

    return (
        <div className="bbc-select" ref={rootRef}>
            {!!label && (
                <label className="form-label small text-muted mb-1" htmlFor={id}>
                    {label}
                </label>
            )}

            <button
                id={id}
                ref={btnRef}
                type="button"
                className="bbc-select__control"
                aria-haspopup="listbox"
                aria-expanded={open}
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                onKeyDown={onKeyDown}
            >
                <span className={`bbc-select__value ${!selectedLabel ? "is-placeholder" : ""}`}>
                    {selectedLabel || placeholder}
                </span>

                <i
                    className={`fa-solid text-muted ${open ? "fa-chevron-up" : "fa-chevron-down"}`}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div className="bbc-select__menu" role="listbox" aria-label={label}>
                    {options.map((opt, idx) => {
                        const isSelected = opt.value === value;
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                className={[
                                    "bbc-select__option",
                                    isSelected ? "is-selected" : "",
                                    isActive ? "is-active" : "",
                                ].join(" ")}
                                role="option"
                                aria-selected={isSelected}
                                disabled={opt.disabled}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => commit(opt)}
                            >
                                <span className="bbc-select__label">{opt.label}</span>
                                {isSelected && <span className="bbc-select__tick">✓</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
