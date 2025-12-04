// components/team/Mission.tsx
interface MissionProps {
    label?: string
    text?: string
}

export default function Mission({ label, text }: MissionProps) {
    if (!text) return null

    return (
        <section className="team-mission">
            {label && <p className="eyebrow">{label}</p>}
            <p>{text}</p>
        </section>
    )
}
