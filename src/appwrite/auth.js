import configEnv from "../../src/configEnv/configEnv";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(configEnv.appwriteUrl)
      .setProject(configEnv.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({name, email, password}) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount
      // if (userAccount) {
      //   //login
      //   return this.login(email,password)
      // } else {
      //   return userAccount;
      // }
    } catch (error) {
      console.log("error while create account",error);
    }
  }

  async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }
  }

  async getCurrentUser(){
    try {
       return await this.account.get()
        
    } catch (error) {
        console.log(error);  
    }
    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
  }

}

const authService = new AuthService();
export default authService
