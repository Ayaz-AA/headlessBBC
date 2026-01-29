// src/components/programs/FeaturedProgramsWithFlyout.tsx
"use client";

import { useState } from "react";
import type { FeaturedProgramCardVM } from "@/lib/rolePlp";

import FeaturedProgramCard from "@/components/programs/FeaturedProgramCard";
import ProgramDetailsFlyout from "@/components/programFlyout/ProgramDetailsFlyout";

export default function FeaturedProgramsWithFlyout({
    programs,
    kicker,
}: {
    programs: FeaturedProgramCardVM[];
    kicker: string;
}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<FeaturedProgramCardVM | null>(null);

    return (
        <>
            <div className="plp-featuredList mt-4">
                {programs.map((p) => (
                    <FeaturedProgramCard
                        key={p.slug}
                        kicker={kicker}
                        program={p}
                        onLearnMore={(prog) => {
                            setSelected(prog);
                            setOpen(true);
                        }}
                    />
                ))}
            </div>

            <ProgramDetailsFlyout
                open={open}
                program={selected}
                onClose={() => {
                    setOpen(false);
                    setSelected(null);
                }}
            />
        </>
    );
}
