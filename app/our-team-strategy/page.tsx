import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Hero from '@/components/team/Hero'
import TeamGrid, { TeamMemberViewModel } from '@/components/team/TeamGrid'
import Mission from '@/components/team/Mission'
import { getTeamPageData } from '@/lib/teamPage'

export default async function OurTeamStrategyPage() {
    const data: any = await getTeamPageData()
    const page = data?.pages?.nodes?.[0]

    const fields = page?.ourTeamStrategy?.ourTeamStrategy
    const hero = fields?.heroSection
    const team = fields?.teamSection

    const members: TeamMemberViewModel[] = [
        {
            id: team?.member1Id,
            name: team?.member1Name,
            photoUrl: team?.member1Image?.node?.sourceUrl,
            photoAlt: team?.member1Image?.node?.altText,
            roleText: team?.member1Role ?? undefined,
        },
        {
            id: team?.member2Id,
            name: team?.member2Name,
            photoUrl: team?.member2Image?.node?.sourceUrl,
            photoAlt: team?.member2Image?.node?.altText,
            roleText: team?.member2Role ?? undefined,
        },
        {
            id: team?.member3Id,
            name: team?.member3Neme, // ACF field is spelled this way
            photoUrl: team?.member3Image?.node?.sourceUrl,
            photoAlt: team?.member3Image?.node?.altText,
            roleText: team?.member3Role ?? undefined,
        },
        {
            id: team?.member4Id,
            name: team?.member4Name,
            photoUrl: team?.member4Image?.node?.sourceUrl,
            photoAlt: team?.member4Image?.node?.altText,
            roleImageUrl: team?.member4RoleImage?.node?.sourceUrl,
            roleImageAlt: team?.member4RoleImage?.node?.altText,
        },
        {
            id: team?.member5Id,
            name: team?.member5Name,
            photoUrl: team?.member5Image?.node?.sourceUrl,
            photoAlt: team?.member5Image?.node?.altText,
            roleImageUrl: team?.member5Role?.node?.sourceUrl,
            roleImageAlt: team?.member5Role?.node?.altText,
        },
        {
            id: team?.member6Id,
            name: team?.member6Name,
            photoUrl: team?.member6Image?.node?.sourceUrl,
            photoAlt: team?.member6Image?.node?.altText,
            roleImageUrl: team?.member6Role?.node?.sourceUrl,
            roleImageAlt: team?.member6Role?.node?.altText,
        },
    ].filter((m) => m.name)

    return (
        <>
            <Header />

            <main>
                <Hero
                    label={hero?.heroLabel}
                    titleLine1={hero?.heroTitleLine1}
                    titleLine2={hero?.heroTitleLine2}
                    intro={hero?.heroIntro}
                    imageUrl={hero?.heroImage?.node?.sourceUrl}
                    imageAlt={hero?.heroImage?.node?.altText}

                />

                <TeamGrid
                    label={team?.teamLabel}
                    heading={team?.teamHeading}
                    intro={team?.teamIntro}
                    members={members}
                />

                {/* Only missionText for now */}
                <Mission text={team?.missionText} />
            </main>

            <Footer />
        </>
    )
}
