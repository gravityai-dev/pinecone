/**
 * Pinecone Package Plugin
 * Provides vector database operations for knowledge management
 */

import { createPlugin, type GravityPluginAPI } from "@gravityai-dev/plugin-base";
import packageJson from "../package.json";

const plugin = createPlugin({
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  
  async setup(api: GravityPluginAPI) {
    // Initialize platform dependencies
    const { initializePlatformFromAPI } = await import("@gravityai-dev/plugin-base");
    initializePlatformFromAPI(api);

    // Import and register PineconeQuery node
    const { PineconeQueryNode } = await import("./PineconeQuery/node");
    api.registerNode(PineconeQueryNode);

    // Import and register PineconeService node
    const { PineconeServiceNode } = await import("./PineconeService/node");
    api.registerNode(PineconeServiceNode);

    // Import and register PineconeUpload node
    const { PineconeUploadNode } = await import("./PineconeUpload/node");
    api.registerNode(PineconeUploadNode);

    // Import and register Pinecone credentials
    const { pineconeCredential } = await import("./credentials");
    api.registerCredential(pineconeCredential);
  },
});

export default plugin;
