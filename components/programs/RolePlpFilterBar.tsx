"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SelectDropdown, { SelectOption } from "./SelectDropdown";

type Industry = { slug: string; name: string };
type RoleOption = { slug: string; name: string; parentSlug: string };

export default function RolePlpFilterBar({
    currentIndustrySlug,
    currentRoleSlug,
    industries,
    roles,
}: {
    currentIndustrySlug: string;
    currentRoleSlug: string;
    industries: Industry[];
    roles: RoleOption[];
}) {
    const router = useRouter();

    const [industrySlug, setIndustrySlug] = useState(currentIndustrySlug || "");
    const [roleSlug, setRoleSlug] = useState(currentRoleSlug || "");

    // keep dropdowns synced when navigating PLP -> PLP
    useEffect(() => {
        setIndustrySlug(currentIndustrySlug || "");
        setRoleSlug(currentRoleSlug || "");
    }, [currentIndustrySlug, currentRoleSlug]);

    const industryOptions: SelectOption[] = industries.map((i) => ({
        value: i.slug,
        label: i.name,
    }));

    const roleOptionsForIndustry: SelectOption[] = useMemo(() => {
        return roles
            .filter((r) => r.parentSlug === industrySlug)
            .map((r) => ({ value: r.slug, label: r.name }));
    }, [roles, industrySlug]);

    return (
        <div className="programs-filterbar-card">
            <div className="programs-filterbar-head mb-0">
                <div className="programs-filterbar-icon" aria-hidden="true">
                    <img src="/assets/filter-icon.png" alt="" height="20.41" width="19.5" />
                </div>
                <div>
                    <div className="programs-filterbar-title">Filter Programs</div>
                    <div className="programs-filterbar-subtitle">I’m looking for Programs</div>
                </div>
            </div>

            <div className="programs-filterbar-controls pb-4">
                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Industry</div>
                    <SelectDropdown
                        label=""
                        value={industrySlug}
                        options={industryOptions}
                        placeholder="Select Industry"
                        onChange={(v) => {
                            setIndustrySlug(v);
                            setRoleSlug(""); // ✅ do not preselect any role
                        }}
                    />
                </div>

                <div className="programs-filterbar-field">
                    <div className="programs-filterbar-label">Programs</div>
                    <SelectDropdown
                        label=""
                        value={roleSlug}
                        options={
                            industrySlug
                                ? roleOptionsForIndustry.length
                                    ? roleOptionsForIndustry
                                    : [{ value: "", label: "No programs found", disabled: true }]
                                : [{ value: "", label: "Select an industry first", disabled: true }]
                        }
                        disabled={!industrySlug || roleOptionsForIndustry.length === 0}
                        placeholder="Select a program"
                        onChange={setRoleSlug}
                    />
                </div>

                <button
                    type="button"
                    className="programs-filterbar-btn"
                    disabled={!industrySlug || !roleSlug}
                    onClick={() => {
                        if (!roleSlug) return;
                        router.push(`/programs/${roleSlug}`);
                    }}
                >
                    <span className="programs-filterbar-btn-icon" aria-hidden="true">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <span>Search Programs</span>
                </button>
            </div>
        </div>
    );
}
