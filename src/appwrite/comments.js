import { Client, Databases, ID, Query } from "appwrite";
import configEnv from "../configEnv/configEnv";

export class CommentService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(configEnv.appwriteUrl)
      .setProject(configEnv.appwriteProjectId);

    this.databases = new Databases(this.client);
  }
  async createComment(commentData) {
    try {
      const response = await this.databases.createDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCommentsId,
        ID.unique(),
        commentData
      );
      return response;
    } catch (error) {
      console.log("error  creating comment", error);
    }
  }

  async getComments(postId) {
    try {
      const response = await this.databases.listDocuments(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCommentsId,
        [Query.equal("postId", postId), Query.orderDesc("$createdAt")]
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  } 
}

const commentservice = new CommentService();

export default commentservice;
