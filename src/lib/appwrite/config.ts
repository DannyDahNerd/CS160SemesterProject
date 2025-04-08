import {Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '67f501f2003703c8ad09',
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL || 'https://cloud.appwrite.io/v1',
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || '67f5a0640027b7160acd',
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '67f5a0a400270962556e',
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID || '67f5a2f5002535a425ac',
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID || '67f5a2e10028e82a3b66',
    postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID || '67f5a13b00157b01b064',
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);