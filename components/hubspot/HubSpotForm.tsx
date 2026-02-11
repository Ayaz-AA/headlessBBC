// HubSpotForm.tsx
"use client";

import { useEffect, useMemo } from "react";

declare global {
    interface Window {
        hbspt?: any;
    }
}

type Props = {
    portalId: string;
    formId: string;
    region?: string;

    portfolio?: string;
    learningInterest?: string;

    portfolioFieldName?: string;
    learningInterestFieldName?: string;

    // ✅ NEW: lets you render same form in multiple places safely
    instanceId?: string;

    className?: string;
};

export default function HubSpotForm({
    portalId,
    formId,
    region = "na1",
    portfolio,
    learningInterest,
    portfolioFieldName = "portfolio",
    learningInterestFieldName = "learning_interest",
    instanceId = "default",
    className = "",
}: Props) {
    const containerId = useMemo(() => {
        const raw = `hs-form-${portalId}-${formId}-${instanceId}`;
        return raw.replace(/[^a-zA-Z0-9-_]/g, "");
    }, [portalId, formId, instanceId]);

    useEffect(() => {
        let cancelled = false;

        const ensureScript = () =>
            new Promise<void>((resolve) => {
                const existing = document.getElementById("hubspot-forms-script");
                if (existing) return resolve();
                const s = document.createElement("script");
                s.id = "hubspot-forms-script";
                s.src = "https://js.hsforms.net/forms/embed/v2.js";
                s.async = true;
                s.onload = () => resolve();
                document.body.appendChild(s);
            });

        const upsertHiddenInput = (
            formEl: HTMLFormElement,
            name: string,
            value?: string
        ) => {
            if (!name) return;
            if (value == null) return;

            let input = formEl.querySelector<HTMLInputElement>(
                `input[type="hidden"][name="${name}"]`
            );

            if (!input) {
                input = document.createElement("input");
                input.type = "hidden";
                input.name = name;
                formEl.appendChild(input);
            }

            input.value = String(value);
        };

        const create = async () => {
            await ensureScript();
            if (cancelled) return;

            const targetEl = document.getElementById(containerId);
            if (!targetEl) return;

            targetEl.innerHTML = "";
            if (!window.hbspt?.forms?.create) return;

            window.hbspt.forms.create({
                portalId,
                formId,
                region,
                target: `#${containerId}`,
                css: "",

                hiddenFields: {
                    [portfolioFieldName]: portfolio ?? "",
                    [learningInterestFieldName]: learningInterest ?? "",
                },

                onFormReady: ($form: any) => {
                    const formEl: HTMLFormElement | undefined = $form?.[0];
                    if (!formEl) return;

                    upsertHiddenInput(formEl, portfolioFieldName, portfolio ?? "");
                    upsertHiddenInput(formEl, learningInterestFieldName, learningInterest ?? "");
                },

                onBeforeFormSubmit: ($form: any) => {
                    const formEl: HTMLFormElement | undefined = $form?.[0];
                    if (!formEl) return;

                    upsertHiddenInput(formEl, portfolioFieldName, portfolio ?? "");
                    upsertHiddenInput(formEl, learningInterestFieldName, learningInterest ?? "");
                },
            });
        };

        create();

        return () => {
            cancelled = true;
            const targetEl = document.getElementById(containerId);
            if (targetEl) targetEl.innerHTML = "";
        };
    }, [
        containerId,
        portalId,
        formId,
        region,
        portfolio,
        learningInterest,
        portfolioFieldName,
        learningInterestFieldName,
    ]);

    return <div id={containerId} className={className} />;
}
