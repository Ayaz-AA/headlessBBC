import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

/* =========================
   SHARED TYPES
========================= */

export interface MediaItem {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: {
    width?: number | null;
    height?: number | null;
  } | null;
}

export type AcfMediaItemConnectionEdge = {
  node?: MediaItem | null;
} | null;

/* =========================
   ACF PAGE LINK TYPE
========================= */

export type AcfPageLink = {
  nodes?: Array<{
    uri?: string | null;
  } | null> | null;
} | null;

/* =========================
   HOMEPAGE QUERY
========================= */

export const GET_HOMEPAGE = gql`
  query GetHomepageAllSections {
    pages(where: { name: "bbc-home" }, first: 1) {
      nodes {
        id
        databaseId
        title
        content
        slug
        uri

        homepageFields {
          homepageFields {

            heroSection {
              heroLabel
              titleLine1
              titleLine2
              heroSubtitle
              heroParagraph
              button1Text
              button1Url
              button2Text
              button2Url
              heroImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            aboutUs {
              aboutUsHeading
              aboutUsParagraph
              aboutUsImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            whatIsABootcamp {
              bootcampSectionHeading
              bootcampSectionPara
              bootcampSectionImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              bootcampSectionCard1Heading
              bootcampSectionCard1Para
              bootcampSectionCard1Icon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              bootcampSectionCard2Heading
              bootcampSectionCard2Para
              bootcampSectionCard2Icon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              bootcampSectionCard3Heading
              bootcampSectionCard3Para
              bootcampSectionCard3Icon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            roadmap {
              roadmapHeading
              roadmapParagraph

              rm1stCardHeading
              rm1stCardPara
              rm1stCardIcon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              rm2ndCardHeading
              rm2ndCardPara
              rm2ndCardIcon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              rm3rdCardHeading
              rm3rdCardPara
              rm3rdCardIcon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            personalizedBootcamp {
              personalizedBootcampHeading
              personalizedBootcampPara
              personalizedBootcampCard1Heading
              personalizedBootcampCard1Para
              personalizedBootcampCard2Heading
              personalizedBootcampCard2Para
              personalizedBootcampCard3Heading
              personalizedBootcampCard3Para
              personalizedBootcampCard4Heading
              personalizedBootcampCard4Para
              personalizedBootcampCard5Heading
              personalizedBootcampCard5Para
            }

            featuredBootcamp {
              featuredSectionHeading
              featuredPara
              featuredMainButton
              featuredCardsButton

              featuredMainButtonUrl {
                nodes { uri }
              }

              bootcamp1Title
              bootcamp1Industry
              bootcamp1Duration
              bootcamp1Schedule
              bootcamp1Link {
                nodes { uri }
              }
              bootcamp1Image {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              bootcamp2Title
              bootcamp2Industry
              bootcamp2Duration
              bootcamp2Schedule
              bootcamp2Link {
                nodes { uri }
              }
              bootcamp2Image {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }

              bootcamp3Title
              bootcamp3Industry
              bootcamp3Duration
              bootcamp3Schedule
              bootcamp3Link {
                nodes { uri }
              }
              bootcamp3Image {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            certificationProgram {
              certificationProgramHeading
              certificationProgramPara
              certificationButtonText
              certificationButtonLink {
                nodes { uri }
              }

              certificationProgramCard1Heading
              certificationProgramCard1Para
              certificationProgramCard2Heading
              certificationProgramCard2Para
              certificationProgramCard3Heading
              certificationProgramCard3Para

              certificationProgramIcon {
                node {
                  sourceUrl
                  altText
                  mediaDetails { width height }
                }
              }
            }

            frequentlyAskedQuestions {
              faqHeadings
              question1 answer1
              question2 answer2
              question3 answer3
              question5 answer5
              question6 answer6
              question4 answer4
            }

          }
        }
      }
    }
  }
`;

/* =========================
   SECTION TYPES
========================= */

export interface HeroSection {
  heroLabel?: string | null;
  titleLine1?: string | null;
  titleLine2?: string | null;
  heroSubtitle?: string | null;
  heroParagraph?: string | null;
  button1Text?: string | null;
  button1Url?: string | null;
  button2Text?: string | null;
  button2Url?: string | null;
  heroImage?: AcfMediaItemConnectionEdge;
}

export interface AboutUsSection {
  aboutUsHeading?: string | null;
  aboutUsParagraph?: string | null;
  aboutUsImage?: AcfMediaItemConnectionEdge;
}

export interface WhatIsABootcampSection {
  bootcampSectionHeading?: string | null;
  bootcampSectionPara?: string | null;
  bootcampSectionImage?: AcfMediaItemConnectionEdge;

  bootcampSectionCard1Heading?: string | null;
  bootcampSectionCard1Para?: string | null;
  bootcampSectionCard1Icon?: AcfMediaItemConnectionEdge;

  bootcampSectionCard2Heading?: string | null;
  bootcampSectionCard2Para?: string | null;
  bootcampSectionCard2Icon?: AcfMediaItemConnectionEdge;

  bootcampSectionCard3Heading?: string | null;
  bootcampSectionCard3Para?: string | null;
  bootcampSectionCard3Icon?: AcfMediaItemConnectionEdge;
}

export interface RoadmapSection {
  roadmapHeading?: string | null;
  roadmapParagraph?: string | null;

  rm1stCardHeading?: string | null;
  rm1stCardPara?: string | null;
  rm1stCardIcon?: AcfMediaItemConnectionEdge;

  rm2ndCardHeading?: string | null;
  rm2ndCardPara?: string | null;
  rm2ndCardIcon?: AcfMediaItemConnectionEdge;

  rm3rdCardHeading?: string | null;
  rm3rdCardPara?: string | null;
  rm3rdCardIcon?: AcfMediaItemConnectionEdge;
}

export interface PersonalizedBootcampSection {
  personalizedBootcampHeading?: string | null;
  personalizedBootcampPara?: string | null;

  personalizedBootcampCard1Heading?: string | null;
  personalizedBootcampCard1Para?: string | null;
  personalizedBootcampCard2Heading?: string | null;
  personalizedBootcampCard2Para?: string | null;
  personalizedBootcampCard3Heading?: string | null;
  personalizedBootcampCard3Para?: string | null;
  personalizedBootcampCard4Heading?: string | null;
  personalizedBootcampCard4Para?: string | null;
  personalizedBootcampCard5Heading?: string | null;
  personalizedBootcampCard5Para?: string | null;
}

export interface FeaturedBootcampSection {
  featuredSectionHeading?: string | null;
  featuredPara?: string | null;
  featuredMainButton?: string | null;
  featuredMainButtonUrl?: AcfPageLink;
  featuredCardsButton?: string | null;

  bootcamp1Title?: string | null;
  bootcamp1Industry?: string | null;
  bootcamp1Duration?: string | null;
  bootcamp1Schedule?: string | null;
  bootcamp1Link?: AcfPageLink;
  bootcamp1Image?: AcfMediaItemConnectionEdge;

  bootcamp2Title?: string | null;
  bootcamp2Industry?: string | null;
  bootcamp2Duration?: string | null;
  bootcamp2Schedule?: string | null;
  bootcamp2Link?: AcfPageLink;
  bootcamp2Image?: AcfMediaItemConnectionEdge;

  bootcamp3Title?: string | null;
  bootcamp3Industry?: string | null;
  bootcamp3Duration?: string | null;
  bootcamp3Schedule?: string | null;
  bootcamp3Link?: AcfPageLink;
  bootcamp3Image?: AcfMediaItemConnectionEdge;
}

export interface CertificationProgramSection {
  certificationProgramHeading?: string | null;
  certificationProgramPara?: string | null;
  certificationButtonText?: string | null;
  certificationButtonLink?: AcfPageLink;
  certificationProgramCard1Heading?: string | null;
  certificationProgramCard1Para?: string | null;
  certificationProgramCard2Heading?: string | null;
  certificationProgramCard2Para?: string | null;
  certificationProgramCard3Heading?: string | null;
  certificationProgramCard3Para?: string | null;
  certificationProgramIcon?: AcfMediaItemConnectionEdge;
}

export interface FAQSection {
  faqHeadings?: string | null;
  question1?: string | null;
  answer1?: string | null;
  question2?: string | null;
  answer2?: string | null;
  question3?: string | null;
  answer3?: string | null;
  question5?: string | null;
  answer5?: string | null;
  question6?: string | null;
  answer6?: string | null;
  answer4?: string | null;
  question4?: string | null;
}

export interface HomepageFieldsGroup {
  heroSection?: HeroSection | null;
  aboutUs?: AboutUsSection | null;
  whatIsABootcamp?: WhatIsABootcampSection | null;
  roadmap?: RoadmapSection | null;
  personalizedBootcamp?: PersonalizedBootcampSection | null;
  featuredBootcamp?: FeaturedBootcampSection | null;
  certificationProgram?: CertificationProgramSection | null;
  frequentlyAskedQuestions?: FAQSection | null;
}

export interface HomepageNode {
  id: string;
  databaseId: number;
  title?: string | null;
  content?: string | null;
  slug?: string | null;
  uri?: string | null;
  homepageFields?: {
    homepageFields?: HomepageFieldsGroup | null;
  } | null;
}

export interface HomepageData {
  pages: {
    nodes: HomepageNode[];
  };
}

export async function getHomepageData(): Promise<HomepageData> {
  return await client.request<HomepageData>(GET_HOMEPAGE);
}