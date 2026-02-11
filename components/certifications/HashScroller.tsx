"use client";

import { useEffect } from "react";

export default function HashScroller({ offset = 120 }: { offset?: number }) {
    useEffect(() => {
        const hash = window.location.hash?.replace("#", "");
        if (!hash) return;

        const el = document.getElementById(hash);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
    }, [offset]);

    return null;
}
