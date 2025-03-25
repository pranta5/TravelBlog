import { Client, Databases, ID } from "appwrite";
import configEnv from "../configEnv/configEnv";

export class EnquiryService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(configEnv.appwriteUrl)
      .setProject(configEnv.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async addEnquiry(data) {
    try {
      return await this.databases.createDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteEnquiryId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("error in enquiry form", error);
    }
  }

  async getEnquiry() {
    try {
      return await this.databases.listDocuments(
        configEnv.appwriteDatabseId,
        configEnv.appwriteEnquiryId
      );
    } catch (error) {
      console.log("error when get enquiry", error);
      return { documents: [] };
    }
  }

  async updateEnquiry(documentId, data) {
    try {
      return await this.databases.updateDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteEnquiryId,
        documentId,
        data
      );
    } catch (error) {
      console.log("error when updating enquiry", error);
      throw error; // Throwing error to handle it in the frontend
    }
  }
}

const enquiryservice = new EnquiryService();

export default enquiryservice;