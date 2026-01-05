// lib/careerAssessmentCopy.ts
import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_CAREER_ASSESSMENT_COPY = gql`
  query CareerAssessmentCopy {
    page(id: "career-assessment", idType: URI) {
      id
      title

      careerAssessmentCopy {
        step1Heading
        step1Paragraph
        step2Heading
        step2Paragraph
        step3Heading
        step3Paragraph
        step4Heading
        step4Paragraph
        step5Heading
        step5Paragraph
        step6Heading
        step6Paragraph
      }
    }
  }
`;

export async function getCareerAssessmentCopy() {
    return client.request(GET_CAREER_ASSESSMENT_COPY);
}
