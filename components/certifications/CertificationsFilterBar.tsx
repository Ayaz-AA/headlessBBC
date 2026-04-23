"use client";

import SelectDropdown, { type SelectOption } from "@/components/programs/SelectDropdown";

type Industry = { slug: string; name: string };
type CertificationOption = { slug: string; title: string };

type Props = {
    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (slug: string) => void;
    showAllIndustriesOption?: boolean;
    lockedIndustry?: boolean;

    certifications: CertificationOption[];
    certificationSlug: string;
    onCertificationChange: (slug: string) => void;

    onSearch: () => void;
};

export default function CertificationsFilterBar({
    industries,
    industrySlug,
    onIndustryChange,
    showAllIndustriesOption = true,
    lockedIndustry = false,

    certifications,
    certificationSlug,
    onCertificationChange,

    onSearch,
}: Props) {
    const certsDisabled = industrySlug === "all";

    const industryOptions: SelectOption[] = [
        ...(showAllIndustriesOption ? [{ value: "all", label: "All Industries" }] : []),
        ...industries.map((i) => ({ value: i.slug, label: i.name })),
    ];

    const certificationOptions: SelectOption[] = certsDisabled
        ? [{ value: "", label: "Select an industry first", disabled: true }]
        : [
            { value: "", label: "All Certifications" },
            ...certifications.map((c) => ({ value: c.slug, label: c.title })),
        ];

    return (
        <div className="custom-filterbar-card">
            {/* top header row */}
            <div className="custom-filterbar-head mb-0">
                <div className="custom-filterbar-icon" aria-hidden="true">
                    <img src="/assets/filter-icon.png" alt="" height="20.41" width="19.5" />
                </div>
                <div>
                    <div className="custom-filterbar-title text-start">Filter Certifications</div>
                    <div className="custom-filterbar-subtitle">I’m looking for Certifications</div>
                </div>
            </div>

            {/* controls */}
            <div className="custom-filterbar-controls pb-4">
                <div className="custom-filterbar-field">
                    <div className="custom-filterbar-label">Industry</div>
                    <SelectDropdown
                        label=""
                        value={industrySlug}
                        options={industryOptions}
                        disabled={lockedIndustry}
                        placeholder="All Industries"
                        onChange={(v) => {
                            onIndustryChange(v);
                            onCertificationChange(""); // reset on industry change
                        }}
                    />
                </div>

                <div className="custom-filterbar-field">
                    <div className="custom-filterbar-label">Certifications</div>
                    <SelectDropdown
                        label=""
                        value={certificationSlug}
                        options={certificationOptions}
                        disabled={certsDisabled}
                        placeholder="All Certifications"
                        onChange={onCertificationChange}
                    />
                </div>

                <button type="button" className="custom-filterbar-btn" onClick={onSearch}>
                    <span className="custom-filterbar-btn-icon" aria-hidden="true">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <span>Search here</span>
                </button>
            </div>
        </div>
    );
}
