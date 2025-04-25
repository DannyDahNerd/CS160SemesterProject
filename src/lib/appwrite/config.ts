import {Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '67f501f2003703c8ad09',
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL || 'https://cloud.appwrite.io/v1',
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || '67f5a0640027b7160acd',
    databaseId: import.meta.env.VITE_APPWRITE_DATABSE_ID || '67f5a0a400270962556e',
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID || '67fe4358001cda75a38e',
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID || '67fe435b0012a8603a09',
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || '67fe435300139c17c657'


}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);