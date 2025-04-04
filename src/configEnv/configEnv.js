
const configEnv = {
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteEnquiryId:String(import.meta.env.VITE_APPWRITE_ENQUIRY_ID),
    appwriteCommentsId:String(import.meta.env.VITE_APPWRITE_COMMENTS_ID),
    appwriteProfileId:String(import.meta.env.VITE_APPWRITE_Profile_ID),
    appwriteRequestId:String(import.meta.env.VITE_APPWRITE_Request_ID),
    

    tinyApiKey:String(import.meta.env.VITE_TINY_TEXT_EDITOR_API_KEY)
}


export default configEnv