"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export default function PdpTabs({ sections }: { sections: Section[] }) {
    const [active, setActive] = useState(sections[0]?.id);

    useEffect(() => {
        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean) as HTMLElement[];

        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                // pick the first visible section
                const visible = entries.find((e) => e.isIntersecting);
                if (visible?.target?.id) setActive(visible.target.id);
            },
            {
                // accounts for sticky header + sticky tabs
                rootMargin: "-160px 0px -65% 0px",
                threshold: 0.01,
            }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [sections]);

    return (
        <nav className="pdp-tabs" aria-label="Program sections">
            <div className="pdp-tabs__inner">
                {sections.map((s) => (
                    <button
                        key={s.id}
                        type="button"
                        className={`pdp-tabs__btn ${active === s.id ? "is-active" : ""}`}
                        onClick={() => {
                            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}
