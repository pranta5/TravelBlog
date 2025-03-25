import { Client, Databases, ID, Query } from "appwrite";
import configEnv from "../configEnv/configEnv";

export class RequestService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(configEnv.appwriteUrl)
      .setProject(configEnv.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // Function to check if a request already exists for a given email
  async getRequestByEmail(email) {
    try {
      const response = await this.databases.listDocuments(
        configEnv.appwriteDatabseId,
        configEnv.appwriteRequestId,
        [Query.equal("email", email)] // Filter by email
      );
      return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
      console.error("Error fetching request by email:", error);
      return null;
    }
  }


  async getRequestByEmailAndStatus(email) {
    try {
        const response = await this.databases.listDocuments(
            configEnv.appwriteDatabseId,
            configEnv.appwriteRequestId,
            [
                Query.equal("email", email),
                Query.equal("status", "Accepted")
            ]
        );
        return response.documents.length > 0 ? response.documents[0] : null;
    } catch (error) {
        console.error("Error fetching request by email and status:", error);
        return null;
    }
}


  // Create a new request only if no existing request is found
  async createRequest(data) {
    try {
      const existingRequest = await this.getRequestByEmail(data.email);
      if (existingRequest) {
        throw new Error("A request already exists for this email.");
      }

      const response = await this.databases.createDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteRequestId,
        ID.unique(),
        data
      );
      return response;
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  }

  async getRequests() {
    try {
      const response = await this.databases.listDocuments(
        configEnv.appwriteDatabseId,
        configEnv.appwriteRequestId
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching requests:", error);
      return [];
    }
  }

  async updateRequestStatus(requestId, status) {
    try {
      const response = await this.databases.updateDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteRequestId,
        requestId,
        { status }
      );
      return response;
    } catch (error) {
      console.error("Error updating status:", error);
      return null;
    }
  }
}

const requestservice = new RequestService();
export default requestservice;
