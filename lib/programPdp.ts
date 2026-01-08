// src/lib/programPdp.ts
import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_PROGRAM_PDP_BY_SLUG = gql`
  query ProgramPdpBySlug($slug: ID!) {
    program(id: $slug, idType: SLUG) {
      id
      title
      slug
      uri

      providers {
        nodes {
          name
          slug

          # ✅ your schema exposes provider term ACF as providerMeta
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

        programPdpFields {
          heroSectionPdp {
            heroShortDescription
            averageSalary
          }

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

          certificationsSection {
            certificationsHeading
            certificationsName
            certificationsIntro
            certificationsImage {
              node {
                sourceUrl
                altText
              }
            }
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
`;

export async function getProgramPdpBySlug(slug: string) {
  return client.request(GET_PROGRAM_PDP_BY_SLUG, { slug });
}

export type CareerCardVM = {
  title: string;
  salaryRange?: string;
  imageUrl?: string;
  imageAlt?: string | null;
};

export type ProgramPdpVM = {
  id: string;
  title: string;
  slug: string;
  uri?: string;

  providerName?: string;
  providerUrl?: string;
  providerLogoUrl?: string;
  providerLogoAlt?: string | null;

  programLength?: string;
  programType?: string;

  heroShortDescription?: string;
  averageSalary?: string;

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
  certificationsName?: string;
  certificationsIntro?: string;
  certificationsImageUrl?: string;
  certificationsImageAlt?: string | null;

  faqsHeading?: string;
  faqs: Array<{ q: string; a: string }>;
};

export function mapProgramPdpToVM(data: any): ProgramPdpVM | null {
  const p = data?.program;
  if (!p) return null;

  const pf = p?.programFields ?? {};
  const pdp = pf?.programPdpFields ?? {};

  // ✅ Provider info (first provider)
  const provider = p?.providers?.nodes?.[0];
  const providerLogoNode = provider?.providerMeta?.providerLogo?.node;

  // Overview accordion fields
  const ov = pdp?.overviewSection ?? {};

  // Career cards
  const co = pdp?.careerOutlookSection ?? {};
  const careerCards: CareerCardVM[] = [];

  const pushCard = (
    title?: string,
    salaryRange?: string,
    imageNode?: { sourceUrl?: string; altText?: string | null }
  ) => {
    if (!title) return;
    careerCards.push({
      title,
      salaryRange: salaryRange ?? undefined,
      imageUrl: imageNode?.sourceUrl ?? undefined,
      imageAlt: imageNode?.altText ?? null,
    });
  };

  pushCard(
    co?.card1Title,
    co?.card1SalaryRange,
    co?.card1Image?.node
  );

  pushCard(
    co?.card2Title,
    co?.card2SalaryRange,
    co?.card2Image?.node
  );

  pushCard(
    co?.card3Title,
    co?.card3SalaryRange,
    co?.card3Image?.node
  );

  pushCard(
    co?.card4Title,
    co?.card4SalaryRange,
    co?.card4Image?.node
  );


  // FAQs
  const faq = pdp?.faqsSection ?? {};
  const faqs = [
    { q: faq.question1, a: faq.answer1 },
    { q: faq.question2, a: faq.answer2 },
    { q: faq.question3, a: faq.answer3 },
    { q: faq.question4, a: faq.answer4 },
    { q: faq.question5, a: faq.answer5 },
  ].filter((x) => x.q && x.a);

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    uri: p.uri,

    providerName: provider?.name ?? undefined,
    providerUrl: provider?.providerMeta?.providerUrl ?? undefined,
    providerLogoUrl: providerLogoNode?.sourceUrl ?? undefined,
    providerLogoAlt: providerLogoNode?.altText ?? null,

    programLength: pf?.programLength ?? undefined,
    programType: pf?.programType ?? undefined,

    heroShortDescription: pdp?.heroSectionPdp?.heroShortDescription ?? undefined,
    averageSalary: pdp?.heroSectionPdp?.averageSalary ?? undefined,

    overviewHeading: ov?.overviewHeading ?? undefined,
    overviewParagraph: ov?.overviewParagraph ?? undefined,

    overviewEligibilityTitle: ov?.eligibilityTitle ?? undefined,
    overviewEligibilityHtml: ov?.eligibilityContent ?? undefined,

    overviewStudentResourcesTitle: ov?.studentResourcesTitle ?? undefined,
    overviewStudentResourcesHtml: ov?.studentResourcesContent ?? undefined,

    overviewJobOpportunitiesTitle: ov?.jobOpportunitiesTitle ?? undefined,
    overviewJobOpportunitiesHtml: ov?.jobOpportunitiesContent ?? undefined,

    learningOutcomesHeading:
      pdp?.learningOutcomesPdp?.learningOutcomesHeading ?? undefined,
    learningOutcomesParagraph:
      pdp?.learningOutcomesPdp?.learningOutcomesParagraph ?? undefined,
    learningOutcomesListHtml:
      pdp?.learningOutcomesPdp?.learningOutcomesList ?? undefined,

    startingPrice: pdp?.paymentsSection?.startingPrice ?? undefined,
    featuresListHtml: pdp?.paymentsSection?.featuresList ?? undefined,
    paymentMethodsListHtml: pdp?.paymentsSection?.paymentMethodsList ?? undefined,
    paymentPlansHtml: pdp?.paymentsSection?.paymentPlansContent ?? undefined,

    careerOutlookHeading: co?.careerOutlookHeading ?? undefined,
    careerOutlookIntro: co?.careerOutlookIntro ?? undefined,
    careerCards,

    skillsHeading: pdp?.skillsSection?.skillsHeading ?? undefined,
    skillsListHtml: pdp?.skillsSection?.skillsList ?? undefined,

    certificationsHeading:
      pdp?.certificationsSection?.certificationsHeading ?? undefined,
    certificationsName:
      pdp?.certificationsSection?.certificationsName ?? undefined,
    certificationsIntro:
      pdp?.certificationsSection?.certificationsIntro ?? undefined,
    certificationsImageUrl:
      pdp?.certificationsSection?.certificationsImage?.node?.sourceUrl ?? undefined,
    certificationsImageAlt:
      pdp?.certificationsSection?.certificationsImage?.node?.altText ?? null,

    faqsHeading: faq?.faqsHeading ?? undefined,
    faqs,
  };
}
