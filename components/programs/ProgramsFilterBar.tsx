// "use client";

// type Industry = { slug: string; name: string };
// type ProgramOption = { slug: string; title: string };

// type Props = {
//     // Industry
//     industries: Industry[];
//     industrySlug: string; // "all" or specific like "it"
//     onIndustryChange: (slug: string) => void;
//     showAllIndustriesOption?: boolean; // true for All Programs, false for locked pages
//     lockedIndustry?: boolean; // true on /programs/it etc.

//     // Programs (dependent dropdown)
//     programs: ProgramOption[];
//     programSlug: string; // "" means none selected
//     onProgramChange: (slug: string) => void;

//     // Actions
//     onSearch: () => void;
// };

// export default function ProgramsFilterBar({
//     industries,
//     industrySlug,
//     onIndustryChange,
//     showAllIndustriesOption = true,
//     lockedIndustry = false,
//     programs,
//     programSlug,
//     onProgramChange,
//     onSearch,
// }: Props) {
//     const programsDisabled = industrySlug === "all";

//     const SearchIcon = () => (
//         <svg
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//         >
//             <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
//             <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//         </svg>
//     );

//     return (
//         <div className="programs-filterbar rounded-4">
//             <div className="d-flex align-items-start gap-2 mb-3">
//                 <div className="programs-filterbar__icon rounded-circle d-flex align-items-center justify-content-center">
//                     <span role="img" aria-label="graduation cap" style={{ fontSize: 18 }}>
//                         🎓
//                     </span>
//                 </div>

//                 <div className="lh-sm">
//                     <div className="fw-semibold programs-filterbar__title">I’m looking for Programs</div>
//                     <div className="text-muted small">I’m looking for Programs</div>
//                 </div>
//             </div>

//             <div className="row g-3 align-items-end">
//                 {/* Industry */}
//                 <div className="col-12 col-md-5">
//                     <label className="form-label small text-muted mb-1">Industry</label>
//                     <select
//                         className="form-select programs-filterbar__select"
//                         value={industrySlug}
//                         disabled={lockedIndustry}
//                         onChange={(e) => {
//                             onIndustryChange(e.target.value);
//                             // reset program when industry changes
//                             onProgramChange("");
//                         }}
//                     >
//                         {showAllIndustriesOption && <option value="all">All Industries</option>}
//                         {industries.map((i) => (
//                             <option key={i.slug} value={i.slug}>
//                                 {i.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Programs */}
//                 <div className="col-12 col-md-5">
//                     <label className="form-label small text-muted mb-1">Programs</label>
//                     <select
//                         className="form-select programs-filterbar__select"
//                         value={programSlug}
//                         disabled={programsDisabled}
//                         onChange={(e) => onProgramChange(e.target.value)}
//                     >
//                         {programsDisabled ? (
//                             <option value="">Select an industry first</option>
//                         ) : (
//                             <>
//                                 <option value="">All Programs</option>
//                                 {programs.map((p) => (
//                                     <option key={p.slug} value={p.slug}>
//                                         {p.title}
//                                     </option>
//                                 ))}
//                             </>
//                         )}
//                     </select>
//                 </div>


//                 <div className="col-12 col-md-2">
//                     <button
//                         type="button"
//                         className="btn programs-filterbar__btn w-100 d-flex align-items-center justify-content-center gap-2"
//                         onClick={onSearch}
//                     >
//                         <SearchIcon />
//                         <span>Search here</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import SelectDropdown, { SelectOption } from "./SelectDropdown";

type Industry = { slug: string; name: string };
type ProgramOption = { slug: string; title: string };

type Props = {
    industries: Industry[];
    industrySlug: string;
    onIndustryChange: (slug: string) => void;
    showAllIndustriesOption?: boolean;
    lockedIndustry?: boolean;

    programs: ProgramOption[];
    programSlug: string;
    onProgramChange: (slug: string) => void;

    onSearch: () => void;
};

export default function ProgramsFilterBar({
    industries,
    industrySlug,
    onIndustryChange,
    showAllIndustriesOption = true,
    lockedIndustry = false,
    programs,
    programSlug,
    onProgramChange,
    onSearch,
}: Props) {
    const programsDisabled = industrySlug === "all";

    const industryOptions: SelectOption[] = [
        ...(showAllIndustriesOption ? [{ value: "all", label: "All Industries" }] : []),
        ...industries.map((i) => ({ value: i.slug, label: i.name })),
    ];

    const programOptions: SelectOption[] = programsDisabled
        ? [{ value: "", label: "Select an industry first", disabled: true }]
        : [
            { value: "", label: "All Programs" },
            ...programs.map((p) => ({ value: p.slug, label: p.title })),
        ];

    return (
        <div className="programs-filterbar-card">
            {/* top header row */}
            <div className="programs-filterbar-head mb-0">
                <div className="programs-filterbar-icon" aria-hidden="true">
                    <img src="/assets/filter-icon.png" alt="" height="20.41" width="19.5" />
                </div>
                <div>
                    <div className="programs-filterbar-title">Filter Programs</div>
                    <div className="programs-filterbar-subtitle">I’m looking for Programs</div>
                </div>
            </div>

            {/* controls */}
            <div className="programs-filterbar-controls pb-4">
                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Industry</div>
                    <SelectDropdown
                        label=""
                        value={industrySlug}
                        options={industryOptions}
                        disabled={lockedIndustry}
                        placeholder="All Industries"
                        onChange={(v) => {
                            onIndustryChange(v);
                            onProgramChange(""); // reset program on industry change
                        }}
                    />
                </div>

                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Programs</div>
                    <SelectDropdown
                        label=""
                        value={programSlug}
                        options={programOptions}
                        disabled={programsDisabled}
                        placeholder="All Programs"
                        onChange={onProgramChange}
                    />
                </div>

                <button type="button" className="programs-filterbar-btn" onClick={onSearch}>
                    <span className="programs-filterbar-btn-icon" aria-hidden="true"><i className="fa-solid fa-magnifying-glass"></i></span>
                    <span>Search here</span>
                </button>
            </div>
        </div>
    );
}

