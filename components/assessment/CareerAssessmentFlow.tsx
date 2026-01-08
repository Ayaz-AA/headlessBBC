"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { ProgramVM } from "@/lib/programs";

// ✅ Use SelectDropdown only for UI/behavior (step 4)
import SelectDropdown from "@/components/programs/SelectDropdown";

type RoleNode = { name: string; slug: string };

type IndustryNode = {
    name: string;
    slug: string;
    children?: { nodes?: RoleNode[] };
    industryMeta?: {
        icon?: string | null;
        subtitle?: string | null;
    } | null;
};

type AssessmentCopy = {
    step1Heading?: string | null;
    step1Paragraph?: string | null;

    step2Heading?: string | null;
    step2Paragraph?: string | null;

    step3Heading?: string | null;
    step3Paragraph?: string | null;

    step4Heading?: string | null;
    step4Paragraph?: string | null;

    step5Heading?: string | null;
    step5Paragraph?: string | null;

    // ✅ Step 6 copy from WordPress
    step6Heading?: string | null;
    step6Paragraph?: string | null;
};

type Props = {
    programs: ProgramVM[];
    industries: IndustryNode[];
    copy?: AssessmentCopy | null;
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_BARS = 6;

function ProgressBars({ step }: { step: number }) {
    return (
        <div className="bb-assess-progress mb-5">
            {Array.from({ length: TOTAL_BARS }).map((_, i) => {
                const idx = i + 1;
                const active = idx <= step;
                return <span key={idx} className={`bb-assess-bar ${active ? "is-on" : ""}`} />;
            })}
        </div>
    );
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function onlyDigits(input: string) {
    return input.replace(/[^\d]/g, "");
}

function MatchCard({ program }: { program: ProgramVM }) {
    return (
        <article className="program-card card h-100">
            <div className="program-card__media">
                {program.imageUrl ? (
                    <img
                        src={program.imageUrl}
                        alt={program.imageAlt ?? program.title}
                        className="program-card__img"
                    />
                ) : (
                    <div className="program-card__placeholder">Program</div>
                )}
            </div>

            <div className="card-body program-card__body">
                <h3 className="program-card__title">{program.title}</h3>

                <div className="program-card__meta">
                    {program.programLength && (
                        <span className="program-card__meta-item">
                            <i className="fa-regular fa-calendar" aria-hidden="true" />
                            <span>{program.programLength}</span>
                        </span>
                    )}
                    {program.programType && (
                        <span className="program-card__meta-item">
                            <i className="fa-regular fa-clock" aria-hidden="true" />
                            <span>{program.programType}</span>
                        </span>
                    )}
                </div>

                <div className="program-card__footer">
                    {/* ✅ Your PDP route is /program/[slug] */}
                    <Link
                        href={`/program/${program.slug}`}
                        className="program-card__btn btn btn-outline-primary w-100"
                    >
                        <span>Learn More</span>
                        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function CareerAssessmentFlow({ programs, industries, copy }: Props) {
    const [step, setStep] = useState<Step>(1);

    const [selectedIndustrySlug, setSelectedIndustrySlug] = useState<string>("");
    const [selectedRoleSlugs, setSelectedRoleSlugs] = useState<string[]>([]);

    // STEP 3 (pace)
    const [selectedPace, setSelectedPace] = useState<"part-time" | "full-time" | "">("");

    // STEP 4 (military)
    const [hasMilitaryAffiliation, setHasMilitaryAffiliation] = useState<"yes" | "no" | "">("");
    const [militaryAffiliationType, setMilitaryAffiliationType] = useState<string>("");

    // STEP 5 (residence)
    const [isPermanentResident, setIsPermanentResident] = useState<"yes" | "no" | "">("");

    // ✅ STEP 6 (lead form)
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // digits only
    const [zip, setZip] = useState(""); // digits only
    const [optInTexts, setOptInTexts] = useState(false);
    const [optInEmails, setOptInEmails] = useState(false);

    // ✅ STEP 6 touched flags (show messages after user starts typing)
    const [touchedName, setTouchedName] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPhone, setTouchedPhone] = useState(false);
    const [touchedZip, setTouchedZip] = useState(false);

    // ✅ NEW: After step 6 submit, show results cards
    const [submitted, setSubmitted] = useState(false);

    // ✅ Hardcoded pace options (stable)
    const paceOptions = useMemo(
        () => [
            { value: "part-time" as const, title: "Part-time", desc: "Study while maintaining other commitments" },
            { value: "full-time" as const, title: "Full-time", desc: "Immersive learning experience" },
        ],
        []
    );

    // ✅ Hardcoded military dropdown options (stable)
    const militaryAffiliationOptions = useMemo(
        () => [
            "Active-duty",
            "Veteran",
            "Reserve",
            "Dependant",
            "Spouse",
            "Coast Guard",
            "National Guard",
            "Non-Military Federal Employee",
        ],
        []
    );

    const selectedIndustry = useMemo(
        () => industries.find((x) => x.slug === selectedIndustrySlug),
        [industries, selectedIndustrySlug]
    );

    const roleOptions = useMemo(() => selectedIndustry?.children?.nodes ?? [], [selectedIndustry]);

    function toggleRole(slug: string) {
        setSelectedRoleSlugs((prev) => (prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug]));
    }

    // results for cards (uses Step 1 + Step 2 selections)
    const results = useMemo(() => {
        if (!selectedIndustrySlug || selectedRoleSlugs.length === 0) return [];
        return programs.filter((p) => {
            const industryMatch = (p.industrySlugs ?? []).includes(selectedIndustrySlug);
            const roleMatch = selectedRoleSlugs.some((r) => (p.roleSlugs ?? []).includes(r));
            return industryMatch && roleMatch;
        });
    }, [programs, selectedIndustrySlug, selectedRoleSlugs]);

    function next() {
        setStep((s) => (s === 6 ? 6 : ((s + 1) as Step)));
    }

    function back() {
        // ✅ If user is viewing results (submitted=true), Back should return to the step 6 form
        if (step === 6 && submitted) {
            setSubmitted(false);
            return;
        }
        setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)));
    }

    // ✅ Step 6 validations
    const nameOk = fullName.trim().length >= 2;
    const emailOk = isValidEmail(email);
    const phoneOk = phone.length >= 10; // digits only
    const zipOk = zip.length >= 5; // digits only

    const nameError = touchedName && !nameOk ? "Name must be at least 2 characters." : "";
    const emailError = touchedEmail && !emailOk ? "Please enter a valid email address." : "";
    const phoneError = touchedPhone && !phoneOk ? "Phone number must be at least 10 digits." : "";
    const zipError = touchedZip && !zipOk ? "Zip code must be at least 5 digits." : "";

    // ✅ Continue gating (includes step 6)
    const canContinue =
        step === 1
            ? !!selectedIndustrySlug
            : step === 2
                ? selectedRoleSlugs.length > 0
                : step === 3
                    ? !!selectedPace
                    : step === 4
                        ? hasMilitaryAffiliation === "no"
                            ? true
                            : hasMilitaryAffiliation === "yes"
                                ? !!militaryAffiliationType
                                : false
                        : step === 5
                            ? !!isPermanentResident
                            : step === 6
                                ? nameOk && emailOk && phoneOk && zipOk
                                : false;

    function resetStep6() {
        setFullName("");
        setEmail("");
        setPhone("");
        setZip("");
        setOptInTexts(false);
        setOptInEmails(false);

        setTouchedName(false);
        setTouchedEmail(false);
        setTouchedPhone(false);
        setTouchedZip(false);

        // ✅ also reset results mode
        setSubmitted(false);
    }

    return (
        <main className="matching-process-bg mx-auto w-full max-w-6xl px-4 pt-10">
            {/* STEP 1 */}
            {step === 1 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={1} />

                        {!!copy?.step1Heading && <h1 className="bb-assess-title">{copy.step1Heading}</h1>}
                        {!!copy?.step1Paragraph && <p className="regular-para text-center mb-5">{copy.step1Paragraph}</p>}

                        <div className="bb-assess-list">
                            {industries.map((ind) => {
                                const active = ind.slug === selectedIndustrySlug;
                                const iconClass = ind.industryMeta?.icon ?? "fa-solid fa-circle";
                                const subtitle = ind.industryMeta?.subtitle ?? "";

                                return (
                                    <button
                                        key={ind.slug}
                                        type="button"
                                        className={`bb-assess-row ${active ? "is-active" : ""}`}
                                        onClick={() => {
                                            setSelectedIndustrySlug(ind.slug);
                                            setSelectedRoleSlugs([]);

                                            // reset downstream
                                            setSelectedPace("");
                                            setHasMilitaryAffiliation("");
                                            setMilitaryAffiliationType("");
                                            setIsPermanentResident("");

                                            // step 6 resets
                                            resetStep6();
                                        }}
                                    >
                                        <div className="bb-assess-row-left">
                                            <div className="bb-assess-icon">
                                                <i className={iconClass} />
                                            </div>

                                            <div className="bb-assess-row-text">
                                                <div className="bb-assess-row-title">{ind.name}</div>
                                                {subtitle ? <div className="bb-assess-row-sub">{subtitle}</div> : null}
                                            </div>
                                        </div>

                                        <span className={`bb-assess-radio ${active ? "is-on" : ""}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={2} />

                        {!!copy?.step2Heading && <h2 className="bb-assess-title">{copy.step2Heading}</h2>}
                        {!!copy?.step2Paragraph && <p className="regular-para text-center mb-5">{copy.step2Paragraph}</p>}

                        <div className="bb-assess-chipsWrap">
                            {roleOptions.map((role) => {
                                const active = selectedRoleSlugs.includes(role.slug);

                                return (
                                    <button
                                        key={role.slug}
                                        type="button"
                                        onClick={() => {
                                            toggleRole(role.slug);
                                            setSubmitted(false); // ✅ if they change roles, hide results mode
                                        }}
                                        className={`bb-assess-chip ${active ? "is-active" : ""}`}
                                    >
                                        {role.name}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="bb-assess-selectedRow mt-5">
                            <button
                                type="button"
                                className="bb-assess-selectedPill"
                                onClick={() => {
                                    setSelectedRoleSlugs([]);
                                    setSubmitted(false);

                                    // reset downstream
                                    setSelectedPace("");
                                    setHasMilitaryAffiliation("");
                                    setMilitaryAffiliationType("");
                                    setIsPermanentResident("");

                                    // step 6 resets
                                    resetStep6();
                                }}
                                disabled={selectedRoleSlugs.length === 0}
                                aria-label="Clear selected roles"
                            >
                                <span className="bb-assess-selectedX">×</span>
                                <span>{selectedRoleSlugs.length} selected</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* STEP 3 (PACE) */}
            {step === 3 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={3} />

                        {!!copy?.step3Heading && <h2 className="bb-assess-title">{copy.step3Heading}</h2>}
                        {!!copy?.step3Paragraph && <p className="regular-para text-center mb-5">{copy.step3Paragraph}</p>}

                        <div className="bb-assess-list">
                            {paceOptions.map((opt) => {
                                const active = selectedPace === opt.value;

                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        className={`bb-assess-row ${active ? "is-active" : ""}`}
                                        onClick={() => setSelectedPace(opt.value)}
                                    >
                                        <div className="bb-assess-row-left">
                                            <div className="bb-assess-row-text">
                                                <div className="bb-assess-row-title">{opt.title}</div>
                                                <div className="bb-assess-row-sub">{opt.desc}</div>
                                            </div>
                                        </div>

                                        <span className={`bb-assess-radio ${active ? "is-on" : ""}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* STEP 4 (MILITARY + CONDITIONAL DROPDOWN) */}
            {step === 4 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={4} />

                        {!!copy?.step4Heading && <h2 className="bb-assess-title">{copy.step4Heading}</h2>}
                        {!!copy?.step4Paragraph && <p className="regular-para text-center mb-5">{copy.step4Paragraph}</p>}

                        <div className="bb-assess-list">
                            {/* YES */}
                            <button
                                type="button"
                                className={`bb-assess-row ${hasMilitaryAffiliation === "yes" ? "is-active" : ""}`}
                                onClick={() => setHasMilitaryAffiliation("yes")}
                            >
                                <div className="bb-assess-row-left">
                                    <div className="bb-assess-row-text">
                                        <div className="bb-assess-row-title">Yes</div>
                                        <div className="bb-assess-row-sub">I do have military affiliation</div>
                                    </div>
                                </div>

                                <span className={`bb-assess-radio ${hasMilitaryAffiliation === "yes" ? "is-on" : ""}`} />
                            </button>

                            {/* Dropdown only when YES */}
                            {hasMilitaryAffiliation === "yes" && (
                                <div className="mt-4">
                                    <SelectDropdown
                                        label="How are you affiliated?"
                                        value={militaryAffiliationType}
                                        placeholder="Please select"
                                        options={militaryAffiliationOptions.map((x) => ({ value: x, label: x }))}
                                        onChange={(val) => setMilitaryAffiliationType(val)}
                                    />
                                </div>
                            )}

                            {/* NO */}
                            <button
                                type="button"
                                className={`bb-assess-row ${hasMilitaryAffiliation === "no" ? "is-active" : ""}`}
                                onClick={() => {
                                    setHasMilitaryAffiliation("no");
                                    setMilitaryAffiliationType("");
                                }}
                            >
                                <div className="bb-assess-row-left">
                                    <div className="bb-assess-row-text">
                                        <div className="bb-assess-row-title">No</div>
                                        <div className="bb-assess-row-sub">I don't have military affiliation</div>
                                    </div>
                                </div>

                                <span className={`bb-assess-radio ${hasMilitaryAffiliation === "no" ? "is-on" : ""}`} />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* STEP 5 (RESIDENCE) */}
            {step === 5 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={5} />

                        {!!copy?.step5Heading && <h2 className="bb-assess-title">{copy.step5Heading}</h2>}
                        {!!copy?.step5Paragraph && <p className="regular-para text-center mb-3">{copy.step5Paragraph}</p>}

                        {/* ✅ small privacy note (your styled version) */}
                        <div className="bb-assess-note mb-3">
                            <span className="bb-assess-note-icon" aria-hidden="true">
                                <i className=" me-2 fa-solid fa-lock lock-icon"></i>
                            </span>
                            <span>We will never share your personal information with any educator without your consent.</span>
                        </div>

                        <div className="bb-assess-list">
                            {/* YES */}
                            <button
                                type="button"
                                className={`bb-assess-row ${isPermanentResident === "yes" ? "is-active" : ""}`}
                                onClick={() => setIsPermanentResident("yes")}
                            >
                                <div className="bb-assess-row-left">
                                    <div className="bb-assess-row-text">
                                        <div className="bb-assess-row-title">Yes</div>
                                        <div className="bb-assess-row-sub">I'm a permanent U.S. resident</div>
                                    </div>
                                </div>

                                <span className={`bb-assess-radio ${isPermanentResident === "yes" ? "is-on" : ""}`} />
                            </button>

                            {/* NO */}
                            <button
                                type="button"
                                className={`bb-assess-row ${isPermanentResident === "no" ? "is-active" : ""}`}
                                onClick={() => setIsPermanentResident("no")}
                            >
                                <div className="bb-assess-row-left">
                                    <div className="bb-assess-row-text">
                                        <div className="bb-assess-row-title">No</div>
                                        <div className="bb-assess-row-sub">I'm not a permanent U.S. resident</div>
                                    </div>
                                </div>

                                <span className={`bb-assess-radio ${isPermanentResident === "no" ? "is-on" : ""}`} />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* ✅ STEP 6 (CONTACT INFO) + RESULTS CARDS AFTER SUBMIT */}
            {step === 6 && (
                <section className="bb-assess">
                    <div className="bb-assess-card">
                        <ProgressBars step={6} />

                        {!submitted ? (
                            <>
                                {!!copy?.step6Heading && <h2 className="bb-assess-title">{copy.step6Heading}</h2>}
                                {!!copy?.step6Paragraph && <p className="regular-para text-center mb-3">{copy.step6Paragraph}</p>}

                                {/* ✅ reuse the same privacy note styling */}
                                <div className="bb-assess-note mb-3">
                                    <span className="bb-assess-note-icon" aria-hidden="true">
                                        <i className=" me-2 fa-solid fa-lock lock-icon"></i>
                                    </span>
                                    <span>We will never share your personal information with any educator without your consent.</span>
                                </div>

                                {/* Form */}
                                <div className="bb-assess-form">
                                    <div className="bb-assess-form-grid">
                                        <div className="bb-assess-field">
                                            <label className="bb-assess-label">Your Name</label>
                                            <input
                                                className={`bb-assess-input ${nameError ? "is-invalid" : ""}`}
                                                value={fullName}
                                                onChange={(e) => {
                                                    setTouchedName(true);
                                                    setFullName(e.target.value);
                                                }}
                                                placeholder="Please Enter Your Full Name"
                                                autoComplete="name"
                                            />
                                            {nameError ? <div className="bb-assess-error">{nameError}</div> : null}
                                        </div>

                                        <div className="bb-assess-field">
                                            <label className="bb-assess-label">
                                                Email <span className="bb-assess-req">*</span>
                                            </label>
                                            <input
                                                className={`bb-assess-input ${emailError ? "is-invalid" : ""}`}
                                                value={email}
                                                onChange={(e) => {
                                                    setTouchedEmail(true);
                                                    setEmail(e.target.value);
                                                }}
                                                placeholder="Enter your email"
                                                autoComplete="email"
                                                inputMode="email"
                                            />
                                            {emailError ? <div className="bb-assess-error">{emailError}</div> : null}
                                        </div>

                                        <div className="bb-assess-field">
                                            <label className="bb-assess-label">
                                                Phone Number <span className="bb-assess-req">*</span>
                                            </label>
                                            <input
                                                className={`bb-assess-input ${phoneError ? "is-invalid" : ""}`}
                                                value={phone}
                                                onChange={(e) => {
                                                    setTouchedPhone(true);
                                                    setPhone(onlyDigits(e.target.value)); // ✅ digits only
                                                }}
                                                placeholder="Enter your number here"
                                                autoComplete="tel"
                                                inputMode="numeric"
                                            />
                                            {phoneError ? <div className="bb-assess-error">{phoneError}</div> : null}
                                        </div>

                                        <div className="bb-assess-field">
                                            <label className="bb-assess-label">
                                                Zip Code <span className="bb-assess-req">*</span>
                                            </label>
                                            <input
                                                className={`bb-assess-input ${zipError ? "is-invalid" : ""}`}
                                                value={zip}
                                                onChange={(e) => {
                                                    setTouchedZip(true);
                                                    setZip(onlyDigits(e.target.value)); // ✅ digits only
                                                }}
                                                placeholder="Enter your zip code"
                                                autoComplete="postal-code"
                                                inputMode="numeric"
                                            />
                                            {zipError ? <div className="bb-assess-error">{zipError}</div> : null}
                                        </div>
                                    </div>

                                    <div className="bb-assess-optin mt-3">
                                        <div className="bb-assess-optin-title">Opt in fields:</div>

                                        <label className="bb-assess-check">
                                            <input type="checkbox" checked={optInTexts} onChange={(e) => setOptInTexts(e.target.checked)} />
                                            <span>I agree to receive phone calls/texts from bootcamp programs I select.</span>
                                        </label>

                                        <label className="bb-assess-check">
                                            <input type="checkbox" checked={optInEmails} onChange={(e) => setOptInEmails(e.target.checked)} />
                                            <span>I agree to receive email updates from Best Bootcamps.</span>
                                        </label>
                                    </div>

                                    {/* info note box */}
                                    <div className="bb-assess-infoBox mt-3">
                                        <span className="bb-assess-infoIcon" aria-hidden="true">
                                            !
                                        </span>
                                        <span>
                                            Your information remains secure and will only be used by school reps who reach out with information.
                                        </span>
                                    </div>

                                    {/* terms box */}
                                    <div className="bb-assess-terms mt-4">
                                        <div className="bb-assess-terms-title">When You click on the next Button</div>
                                        <ul className="bb-assess-terms-list">
                                            <li>You agree that educators may reach out regarding their programs.</li>
                                            <li>
                                                You agree that educators you select may reach out for marketing purposes regarding their programs at
                                                your provided contact information, even where that number is registered in a Do-Not-Call registry.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* ✅ RESULTS VIEW (Strong match cards) */}
                                <div className="text-center mb-4">
                                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                                        Great {fullName?.trim() ? fullName.trim() : "there"}!
                                    </div>
                                    <h2 className="bb-assess-title mb-0">You are strong match for these bootcamps</h2>
                                </div>

                                {results.length > 0 ? (
                                    <div className="row g-3 mt-2">
                                        {results.map((p) => (
                                            <div key={p.id} className="col-12 col-md-6">
                                                <MatchCard program={p} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted mt-4">
                                        No matches found for your selections. Please go back and choose a different role.
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </section>
            )}

            {/* Shared footer (same position on every step) */}
            <div className="bb-assess-footer">
                <div className="bb-assess-footer-inner">
                    <button type="button" className="bb-assess-back" onClick={back} disabled={step === 1}>
                        &lsaquo; Back
                    </button>

                    <button
                        type="button"
                        className="bb-assess-continue"
                        disabled={!canContinue}
                        onClick={() => {
                            if (step < 6) {
                                next();
                                return;
                            }

                            // ✅ Step 6 submit -> show results cards
                            setSubmitted(true);

                            // If later you want API submit, do it here before setSubmitted(true).
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </main>
    );
}
