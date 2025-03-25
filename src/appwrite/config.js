import { Client, Databases, Storage, ID, Query } from "appwrite";
import configEnv from "../configEnv/configEnv";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(configEnv.appwriteUrl)
      .setProject(configEnv.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // post service

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updateData = { title, content, status };

        if (featuredImage) {
            updateData.featuredImage = featuredImage;
        }
      return await this.databases.updateDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("error in delete", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("error in get post", error);
      return false;
    }
  }

  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        configEnv.appwriteDatabseId,
        configEnv.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return { documents: [] };
    }
  }

  //  file service

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        configEnv.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error in file upload", error);
    }
  }

  async deleteFile(fileId) {
    if (!fileId) {
      throw new Error("Missing fileId in deleteFile function");

    }
    try {
      await this.storage.deleteFile(configEnv.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw new Error("Error deleting file: " + error.message);
    }
  }
  getfilePreview(fileId) {
    if (!fileId) {
      console.error("Missing fileId in getfilePreview function");
      return "";
    }
    return this.storage.getFilePreview(configEnv.appwriteBucketId, fileId);
  }

  async createProfile({ userId, name }) {
    try {
      return await this.databases.createDocument(
        configEnv.appwriteDatabseId,
        configEnv.appwriteProfileId,
        ID.unique(),
        {
          userId,
          name,
        }
      );
    } catch (error) {
      console.error("Error creating profile:", error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const response = await this.databases.listDocuments(
        configEnv.appwriteDatabseId, // Same database ID as posts
        configEnv.appwriteProfileId, // Add this to configEnv
        [Query.equal("userId", userId)] // Query to match userId
      );
      return response.documents[0] || null; // Return the first matching document or null
    } catch (error) {
      console.log("Error fetching user by ID:", error);
      return null; // Return null on error
    }
  }

  // async getAllImages(){
  //   try {
  //     const response =await this.storage.listFiles(configEnv.appwriteBucketId)
  //     const images = response.files.map((file)=>(
  //       {
  //         id:file.$id,
  //         name:file.name,
  //         preview:this.getfilePreview(file.$id)
  //       }
  //     ))
  //     return images
  //   }catch(error){
  //     console.error("Error in fetching images", error)
  //     return []
  //   }
  // }

  async getAllImages(page = 1, limit = 6) {
    try {
      const response = await this.storage.listFiles(configEnv.appwriteBucketId, [
        Query.limit(limit),
        Query.offset((page - 1) * limit),
      ]);
  
      const images = response.files.map((file) => ({
        id: file.$id,
        name: file.name,
        preview: this.getfilePreview(file.$id),
      }));
  
      return images;
    } catch (error) {
      console.error("Error in fetching images", error);
      return [];
    }
  }
  

}
const service = new Service();
export default service;
