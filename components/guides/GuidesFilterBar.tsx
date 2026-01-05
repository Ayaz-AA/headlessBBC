"use client";

import SelectDropdown from "@/components/programs/SelectDropdown";

type Industry = { slug: string; name: string };
type GuideOption = { slug: string; title: string };

type Props = {
    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (slug: string) => void;

    guides: GuideOption[];
    guideSlug: string;
    onGuideChange: (slug: string) => void;

    onSearch: () => void;

    // ✅ NEW (optional): allow listing page behavior by default
    showAllIndustriesOption?: boolean; // default true
    showAllGuidesOption?: boolean; // default true
};

export default function GuidesFilterBar({
    industries,
    industrySlug,
    onIndustryChange,
    guides,
    guideSlug,
    onGuideChange,
    onSearch,
    showAllIndustriesOption = true,
    showAllGuidesOption = true,
}: Props) {
    // ✅ In detail page we won't use "all"; we disable when industrySlug is empty/undefined
    const guidesDisabled = !industrySlug || industrySlug === "all";

    const industryOptions = [
        ...(showAllIndustriesOption ? [{ value: "all", label: "All Industries" }] : []),
        ...industries.map((i) => ({ value: i.slug, label: i.name })),
    ];

    const guideOptions = [
        ...(showAllGuidesOption ? [{ value: "", label: "All Guides" }] : []),
        ...guides.map((g) => ({ value: g.slug, label: g.title })),
    ];

    const canSearch = !!guideSlug;

    return (
        <div className="programs-filterbar-card">
            <div className="programs-filterbar-head mb-0">
                <div className="programs-filterbar-icon" aria-hidden="true">
                    <img src="/assets/filter-icon.png" alt="" height="20.41" width="19.5" />
                </div>
                <div>
                    <div className="programs-filterbar-title">I’m looking for Guides</div>
                    <div className="programs-filterbar-subtitle">Search Guides by Industry</div>
                </div>
            </div>

            <div className="programs-filterbar-controls pb-4">
                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Industry</div>
                    <SelectDropdown
                        label=""
                        value={industrySlug}
                        options={industryOptions}
                        disabled={false}
                        placeholder={showAllIndustriesOption ? "All Industries" : "Select Industry"}
                        onChange={(v) => {
                            onIndustryChange(v);
                            onGuideChange("");
                        }}
                    />
                </div>

                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Guides</div>
                    <SelectDropdown
                        label=""
                        value={guideSlug}
                        options={guideOptions}
                        disabled={guidesDisabled}
                        placeholder={showAllGuidesOption ? "All Guides" : "Select a Guide"}
                        onChange={onGuideChange}
                    />
                </div>

                <button
                    type="button"
                    className="programs-filterbar-btn"
                    onClick={onSearch}
                    disabled={!canSearch}
                >
                    <span className="programs-filterbar-btn-icon" aria-hidden="true">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <span>Search Guides</span>
                </button>
            </div>
        </div>
    );
}
