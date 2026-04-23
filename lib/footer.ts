// export async function getFooter() {
//     const res = await fetch(process.env.WP_GRAPHQL_URL as string, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             query: `
//           query GetFooter {
//             page(id: "footer-fields", idType: URI) {
//               footer {
//                 footerDescription

//                 quickLinksTitle
//                 quickLink1Label
//                 quickLink1Url { nodes { uri } }
//                 quickLink2Label
//                 quickLink2Url { nodes { uri } }
//                 quickLink3Label
//                 quickLink3Url { nodes { uri } }
//                 quickLink4Label
//                 quickLink4Url { nodes { uri } }

//                 aboutTitle
//                 aboutLink1Label
//                 aboutLink1Url { nodes { uri } }
//                 aboutLink2Label
//                 aboutLink2Url { nodes { uri } }
//                 aboutLink3Label
//                 aboutLink3Url { nodes { uri } }

//                 resourcesTitle
//                 resourcesLink1Label
//                 resourcesLink1Url { nodes { uri } }
//                 resourcesLink2Label
//                 resourcesLink2Url { nodes { uri } }
//                 resourcesLink3Label
//                 resourcesLink3Url { nodes { uri } }

//                 copyrightLine1
//                 copyrightLine2
//               }
//             }
//           }
//         `,
//         }),
//         next: { revalidate: 60 },
//     });

//     const json = await res.json();
//     return json?.data?.page?.footer;
// }

// // ----------------------------------------
// // MAP FUNCTION
// // ----------------------------------------

// export function mapFooter(data: any) {
//     if (!data) return null;

//     const getUrl = (field: any) => field?.nodes?.[0]?.uri || "#";

//     const buildLinks = (items: any[]) =>
//         items
//             .map((item) => ({
//                 label: item.label,
//                 url: getUrl(item.url),
//             }))
//             .filter((l) => l.label && l.url !== "#");

//     return {
//         description: data.footerDescription,

//         columns: [
//             {
//                 title: data.quickLinksTitle,
//                 links: buildLinks([
//                     { label: data.quickLink1Label, url: data.quickLink1Url },
//                     { label: data.quickLink2Label, url: data.quickLink2Url },
//                     { label: data.quickLink3Label, url: data.quickLink3Url },
//                     { label: data.quickLink4Label, url: data.quickLink4Url },
//                 ]),
//             },
//             {
//                 title: data.aboutTitle,
//                 links: buildLinks([
//                     { label: data.aboutLink1Label, url: data.aboutLink1Url },
//                     { label: data.aboutLink2Label, url: data.aboutLink2Url },
//                     { label: data.aboutLink3Label, url: data.aboutLink3Url },
//                 ]),
//             },
//             {
//                 title: data.resourcesTitle,
//                 links: buildLinks([
//                     { label: data.resourcesLink1Label, url: data.resourcesLink1Url },
//                     { label: data.resourcesLink2Label, url: data.resourcesLink2Url },
//                     { label: data.resourcesLink3Label, url: data.resourcesLink3Url },
//                 ]),
//             },
//         ],

//         bottom: {
//             copyright: data.copyrightLine1,
//             rightText: data.copyrightLine2,
//         },
//     };
// }
import { client } from "./wordpress";
import { gql } from "graphql-request";

// ✅ QUERY HERE (local to footer)
const GET_FOOTER = gql`
  query GetFooter {
    page(id: "footer-fields", idType: URI) {
      footer {
        footerDescription

 footerLogo {
    node {
      sourceUrl
      altText
    }
  }
        quickLinksTitle
        quickLink1Label
        quickLink1Url { nodes { uri link } }
        quickLink2Label
        quickLink2Url { nodes { uri link } }
        quickLink3Label
        quickLink3Url { nodes { uri link } }

        aboutTitle
        aboutLink1Label
        aboutLink1Url { nodes { uri link } }
        aboutLink2Label
        aboutLink2Url { nodes { uri link } }
        aboutLink3Label
        aboutLink3Url { nodes { uri link } }

        resourcesTitle
        resourcesLink1Label
        resourcesLink1Url { nodes { uri link } }
        resourcesLink2Label
        resourcesLink2Url { nodes { uri link } }
        resourcesLink3Label
        resourcesLink3Url { nodes { uri link } }

        copyrightLine1
        copyrightLine2
      }
    }
  }
`;

// ✅ FETCH USING SAME CLIENT AS HEADER
export async function getFooter() {
    try {
        const data = await client.request(GET_FOOTER);
        return data?.page?.footer ?? null;
    } catch (error) {
        console.error("Footer fetch failed:", error);
        return null;
    }
}

// ----------------------------------------
// MAP FUNCTION (UNCHANGED LOGIC)
// ----------------------------------------

export function mapFooter(data: any) {
    if (!data) return null;

    const getUrl = (field: any) =>
        field?.nodes?.[0]?.uri || field?.nodes?.[0]?.link || "#";

    const buildLinks = (items: any[]) =>
        items
            .map((item) => ({
                label: item.label,
                url: getUrl(item.url),
            }))
            .filter((l) => l.label);

    return {
        description: data.footerDescription,
        logo: data.footerLogo?.node?.sourceUrl || null,
        logoAlt: data.footerLogo?.node?.altText || "Footer Logo",

        columns: [
            {
                title: data.quickLinksTitle,
                links: buildLinks([
                    { label: data.quickLink1Label, url: data.quickLink1Url },
                    { label: data.quickLink2Label, url: data.quickLink2Url },
                    { label: data.quickLink3Label, url: data.quickLink3Url },
                ]),
            },
            {
                title: data.aboutTitle,
                links: buildLinks([
                    { label: data.aboutLink1Label, url: data.aboutLink1Url },
                    { label: data.aboutLink2Label, url: data.aboutLink2Url },
                    { label: data.aboutLink3Label, url: data.aboutLink3Url },
                ]),
            },
            {
                title: data.resourcesTitle,
                links: buildLinks([
                    { label: data.resourcesLink1Label, url: data.resourcesLink1Url },
                    { label: data.resourcesLink2Label, url: data.resourcesLink2Url },
                    { label: data.resourcesLink3Label, url: data.resourcesLink3Url },
                ]),
            },
        ],

        bottom: {
            copyright: data.copyrightLine1,
            rightText: data.copyrightLine2,
        },
    };
}