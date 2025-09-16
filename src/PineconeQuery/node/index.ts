import { getPlatformDependencies, type EnhancedNodeDefinition } from "@gravityai-dev/plugin-base";
import PineconeQueryExecutor from "./executor";

export const NODE_TYPE = "PineconeQuery";

function createNodeDefinition(): EnhancedNodeDefinition {
  const { NodeInputType } = getPlatformDependencies();
  
  return {
    packageVersion: "1.0.12",
    type: NODE_TYPE,
    isService: false,
    name: "Pinecone Query",
    description: "Search for similar vectors in a Pinecone index",
    category: "Knowledge",
    color: "#0080FF",
    logoUrl: "https://res.cloudinary.com/sonik/image/upload/v1749139513/gravity/icons/pinecone.png",
    inputs: [
      {
        name: "signal",
        type: NodeInputType.STRING,
        description: "The text query to search for similar vectors",
      },
    ],
    outputs: [
      {
        name: "output",
        type: NodeInputType.ARRAY,
        description: "Array of matching documents",
      },
      {
        name: "topResult",
        type: NodeInputType.OBJECT,
        description: "The highest scoring result",
      },
    ],
    serviceConnectors: [
      {
        name: "embeddingService",
        description: "Embedding service connection - needs createEmbedding method",
        serviceType: "embedding",
        methods: ["createEmbedding"],
      },
    ],
    configSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          title: "Query Text",
          description: "The text query to search for",
          default: "",
          "ui:field": "template",
        },
        indexName: {
          type: "string",
          title: "Index Name",
          description: "The Pinecone index to query",
          default: "",
          "ui:field": "template",
        },
        namespace: {
          type: "string",
          title: "Namespace",
          description: "Optional namespace to search within.",
          default: "",
          "ui:field": "template",
        },
        topK: {
          type: "number",
          title: "Top K Results",
          description: "Number of results to return",
          default: 10,
          minimum: 1,
          maximum: 100,
        },
        includeMetadata: {
          type: "boolean",
          title: "Include Metadata",
          description: "Include metadata in the results",
          default: true,
          "ui:widget": "toggle",
        },
        includeValues: {
          type: "boolean",
          title: "Include Vector Values",
          description: "Include the vector values in results",
          default: false,
          "ui:widget": "toggle",
        },
        scoreThreshold: {
          type: "number",
          title: "Score Threshold",
          description: "Minimum similarity score (0-1) to include results",
          default: 0.3,
          minimum: 0,
          maximum: 1,
          "ui:options": {
            step: 0.1,
          },
        },
        metadataFilter: {
          type: "string",
          title: "Metadata Filter",
          description: "Enter a JSON object to filter results by metadata.",
          default: "",
          "ui:field": "template",
        },
      },
      required: ["indexName", "query"],
    },
    credentials: [
      {
        name: "pineconeCredential",
        required: true,
        displayName: "Pinecone Credentials",
        description: "Pinecone API key",
      },
    ],
    capabilities: {
      isTrigger: false,
    },
    services: {
      provides: [],
      requires: {},
    },
  };
}

const definition = createNodeDefinition();

export const PineconeQueryNode = {
  definition,
  executor: PineconeQueryExecutor,
};

export { createNodeDefinition };
