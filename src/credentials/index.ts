/**
 * Pinecone Credential Definition
 */

import { NodeCredential } from "@gravityai-dev/plugin-base";

export const pineconeCredential: NodeCredential = {
  name: "pineconeCredential",
  displayName: "Pinecone API Key",
  description: "API key for Pinecone vector database access",
  fields: [
    {
      name: "apiKey",
      type: "password",
      label: "API Key",
      description: "Your Pinecone API key",
      required: true,
    },
  ],
};
