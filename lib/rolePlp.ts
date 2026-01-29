// src/lib/rolePlp.ts
import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

/** =========================
 *  1) Role PLP (single role + related programs)
 *  ========================= */
export const GET_ROLE_PLP_BY_SLUG = gql`
  query RolePlpWithPrograms($slug: ID!) {
    role(id: $slug, idType: SLUG) {
      name
      slug

      # ✅ industry (parent role term)
      parent {
        node {
          name
          slug
        }
      }

      plpContent {
        plpHero {
          heroLabel
          heroTitleLine1
          heroTitleLine2
          heroTitleLine3
          heroDescription
        }
        plpBody {
          plpBodyHeading
          plpBodyPara
        }
      }

      programs(first: 100) {
        nodes {
          id
          title
          slug

          # ✅ provider info for right-side logo card
          providers {
            nodes {
              name
              slug
              providerMeta {
                providerUrl
                providerLogo {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }

          programFields {
            programLength
            programType

            # (optional) keep if you want later
            programImage {
              node {
                sourceUrl
                altText
              }
            }

            programPdpFields {
              heroSectionPdp {
                heroShortDescription
                averageSalary
              }

              # ✅ card certificate pill + flyout cert section
              certificationsSection {
                certificationsName
                certificationsHeading
                certificationsIntro
                certificationsImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }

              # ✅ flyout content
              overviewSection {
                overviewHeading
                overviewParagraph

                eligibilityTitle
                eligibilityContent

                studentResourcesTitle
                studentResourcesContent

                jobOpportunitiesTitle
                jobOpportunitiesContent
              }

              learningOutcomesPdp {
                learningOutcomesHeading
                learningOutcomesList
                learningOutcomesParagraph
              }

              # ✅ ✅ ADD THIS: payments section for flyout
              paymentsSection {
                startingPrice
                featuresList
                paymentMethodsList
                paymentPlansContent
              }

              careerOutlookSection {
                careerOutlookHeading
                careerOutlookIntro
                card1Title
                card1SalaryRange
                card1Image {
                  node {
                    sourceUrl
                    altText
                  }
                }
                card2Title
                card2SalaryRange
                card2Image {
                  node {
                    sourceUrl
                    altText
                  }
                }
                card3Title
                card3SalaryRange
                card3Image {
                  node {
                    sourceUrl
                    altText
                  }
                }
                card4Title
                card4SalaryRange
                card4Image {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }

              skillsSection {
                skillsHeading
                skillsList
              }

              faqsSection {
                faqsHeading
                question1
                answer1
                question2
                answer2
                question3
                answer3
                question4
                answer4
                question5
                answer5
              }
            }
          }
        }
      }
    }
  }
`;

export async function getRolePlpBySlug(slug: string) {
  return client.request(GET_ROLE_PLP_BY_SLUG, { slug });
}

export type CareerCardVM = {
  title: string;
  salaryRange?: string;
  imageUrl?: string;
  imageAlt?: string | null;
};

export type FeaturedProgramCardVM = {
  id: string;
  slug: string;

  programTitle: string;

  providerName?: string;
  providerUrl?: string;
  providerLogoUrl?: string;
  providerLogoAlt?: string | null;

  heroShortDescription?: string;
  averageSalary?: string;

  programLength?: string;
  programType?: string;

  certificationName?: string;

  // ✅ flyout fields
  overviewHeading?: string;
  overviewParagraph?: string;

  overviewEligibilityTitle?: string;
  overviewEligibilityHtml?: string;

  overviewStudentResourcesTitle?: string;
  overviewStudentResourcesHtml?: string;

  overviewJobOpportunitiesTitle?: string;
  overviewJobOpportunitiesHtml?: string;

  learningOutcomesHeading?: string;
  learningOutcomesParagraph?: string;
  learningOutcomesListHtml?: string;

  // ✅ ✅ ADD THESE (this is what was red)
  startingPrice?: string;
  featuresListHtml?: string;
  paymentMethodsListHtml?: string;
  paymentPlansHtml?: string;

  careerOutlookHeading?: string;
  careerOutlookIntro?: string;
  careerCards: CareerCardVM[];

  skillsHeading?: string;
  skillsListHtml?: string;

  certificationsHeading?: string;
  certificationsIntro?: string;
  certificationsImageUrl?: string;
  certificationsImageAlt?: string | null;

  faqsHeading?: string;
  faqs: Array<{ q: string; a: string }>;
};

export type RolePlpVM = {
  name: string;
  slug: string;

  industrySlug?: string;
  industryName?: string;

  heroLabel?: string;
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTitleLine3?: string;
  heroDescription?: string;

  bodyHeading?: string;
  bodyPara?: string;

  programs: FeaturedProgramCardVM[];
};

export function mapRolePlpToVM(data: any): RolePlpVM | null {
  const role = data?.role;
  if (!role) return null;

  const hero = role?.plpContent?.plpHero ?? {};
  const body = role?.plpContent?.plpBody ?? {};
  const parent = role?.parent?.node ?? null;

  const programs: FeaturedProgramCardVM[] = (role?.programs?.nodes ?? []).map((p: any) => {
    const pf = p?.programFields ?? {};
    const pdp = pf?.programPdpFields ?? {};

    const provider = p?.providers?.nodes?.[0];
    const providerMeta = provider?.providerMeta ?? {};
    const providerLogoNode = providerMeta?.providerLogo?.node;

    const cert = pdp?.certificationsSection ?? {};
    const certNameRaw = cert?.certificationsName ?? undefined;
    const certName = typeof certNameRaw === "string" ? certNameRaw.trim() : undefined;

    // career cards
    const co = pdp?.careerOutlookSection ?? {};
    const careerCards: CareerCardVM[] = [];
    const pushCard = (title?: string, salary?: string, imageNode?: any) => {
      if (!title) return;
      careerCards.push({
        title,
        salaryRange: salary ?? undefined,
        imageUrl: imageNode?.sourceUrl ?? undefined,
        imageAlt: imageNode?.altText ?? null,
      });
    };
    pushCard(co?.card1Title, co?.card1SalaryRange, co?.card1Image?.node);
    pushCard(co?.card2Title, co?.card2SalaryRange, co?.card2Image?.node);
    pushCard(co?.card3Title, co?.card3SalaryRange, co?.card3Image?.node);
    pushCard(co?.card4Title, co?.card4SalaryRange, co?.card4Image?.node);

    // faqs
    const faq = pdp?.faqsSection ?? {};
    const faqs = [
      { q: faq.question1, a: faq.answer1 },
      { q: faq.question2, a: faq.answer2 },
      { q: faq.question3, a: faq.answer3 },
      { q: faq.question4, a: faq.answer4 },
      { q: faq.question5, a: faq.answer5 },
    ].filter((x) => x.q && x.a);

    const ov = pdp?.overviewSection ?? {};
    const lo = pdp?.learningOutcomesPdp ?? {};
    const sk = pdp?.skillsSection ?? {};
    const pay = pdp?.paymentsSection ?? {};

    return {
      id: p?.id,
      slug: p?.slug,
      programTitle: p?.title,

      providerName: provider?.name ?? undefined,
      providerUrl: providerMeta?.providerUrl ?? undefined,
      providerLogoUrl: providerLogoNode?.sourceUrl ?? undefined,
      providerLogoAlt: providerLogoNode?.altText ?? null,

      heroShortDescription: pdp?.heroSectionPdp?.heroShortDescription ?? undefined,
      averageSalary: pdp?.heroSectionPdp?.averageSalary ?? undefined,

      programLength: pf?.programLength?.trim?.() ?? pf?.programLength ?? undefined,
      programType: pf?.programType ?? undefined,

      certificationName: certName || undefined,

      // ✅ flyout fields
      overviewHeading: ov?.overviewHeading ?? undefined,
      overviewParagraph: ov?.overviewParagraph ?? undefined,

      overviewEligibilityTitle: ov?.eligibilityTitle ?? undefined,
      overviewEligibilityHtml: ov?.eligibilityContent ?? undefined,

      overviewStudentResourcesTitle: ov?.studentResourcesTitle ?? undefined,
      overviewStudentResourcesHtml: ov?.studentResourcesContent ?? undefined,

      overviewJobOpportunitiesTitle: ov?.jobOpportunitiesTitle ?? undefined,
      overviewJobOpportunitiesHtml: ov?.jobOpportunitiesContent ?? undefined,

      learningOutcomesHeading: lo?.learningOutcomesHeading ?? undefined,
      learningOutcomesParagraph: lo?.learningOutcomesParagraph ?? undefined,
      learningOutcomesListHtml: lo?.learningOutcomesList ?? undefined,

      // ✅ ✅ map payments fields (this removes the red + enables flyout)
      startingPrice: pay?.startingPrice ?? undefined,
      featuresListHtml: pay?.featuresList ?? undefined,
      paymentMethodsListHtml: pay?.paymentMethodsList ?? undefined,
      paymentPlansHtml: pay?.paymentPlansContent ?? undefined,

      careerOutlookHeading: co?.careerOutlookHeading ?? undefined,
      careerOutlookIntro: co?.careerOutlookIntro ?? undefined,
      careerCards,

      skillsHeading: sk?.skillsHeading ?? undefined,
      skillsListHtml: sk?.skillsList ?? undefined,

      certificationsHeading: cert?.certificationsHeading ?? undefined,
      certificationsIntro: cert?.certificationsIntro ?? undefined,
      certificationsImageUrl: cert?.certificationsImage?.node?.sourceUrl ?? undefined,
      certificationsImageAlt: cert?.certificationsImage?.node?.altText ?? null,

      faqsHeading: faq?.faqsHeading ?? undefined,
      faqs,
    };
  });

  return {
    name: role?.name,
    slug: role?.slug,

    industrySlug: parent?.slug ?? undefined,
    industryName: parent?.name ?? undefined,

    heroLabel: hero?.heroLabel ?? undefined,
    heroTitleLine1: hero?.heroTitleLine1 ?? undefined,
    heroTitleLine2: hero?.heroTitleLine2 ?? undefined,
    heroTitleLine3: hero?.heroTitleLine3 ?? undefined,
    heroDescription: hero?.heroDescription ?? undefined,

    bodyHeading: body?.plpBodyHeading ?? undefined,
    bodyPara: body?.plpBodyPara ?? undefined,

    programs,
  };
}

/** =========================
 *  2) PLP Filter Bar data (Industry = parent roles, Role = child roles)
 *  ========================= */
export const GET_ALL_ROLES_FOR_PLP_FILTER = gql`
  query AllRolesForPlpFilter {
    roles(first: 500) {
      nodes {
        name
        slug
        parent {
          node {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getAllRolesForPlpFilter() {
  return client.request(GET_ALL_ROLES_FOR_PLP_FILTER);
}

export type IndustryVM = { slug: string; name: string };
export type RoleChildVM = { slug: string; name: string; parentSlug: string };

export type RolePlpFilterVM = {
  industries: IndustryVM[];
  roles: RoleChildVM[];
};

export function mapRolesToPlpFilterVM(data: any): RolePlpFilterVM {
  const nodes = data?.roles?.nodes ?? [];

  const industries: IndustryVM[] = nodes
    .filter((t: any) => !t?.parent?.node?.slug)
    .filter((t: any) => t?.slug && t?.name)
    .map((t: any) => ({ slug: t.slug, name: t.name }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  const roles: RoleChildVM[] = nodes
    .filter((t: any) => t?.parent?.node?.slug)
    .filter((t: any) => t?.slug && t?.name)
    .map((t: any) => ({
      slug: t.slug,
      name: t.name,
      parentSlug: t.parent.node.slug,
    }))
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  return { industries, roles };
}
