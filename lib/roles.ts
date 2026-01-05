import { gql } from "graphql-request";
import { client } from "@/lib/wordpress";

export const GET_ROLES_TREE = gql`
  query RolesTree {
    roles(where: { parent: 0 }, first: 100) {
      nodes {
        name
        slug
        industryMeta {
          icon
          subtitle
        }
        children(first: 200) {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getRolesTree() {
    return client.request(GET_ROLES_TREE);
}
