'use strict';

export const BASE_PATH = 'https://instaploystorage.blob.core.windows.net/files/';
const USERS_FILES = 'users';
const COMPANIES_FILES = 'companies';
const AVATARS ="avatars";
const ONE_WAY_INTERVIEWS ="one-way-interviews";
const CHAT_ATTACH ="chat-attach"
const REQUISITION_ATTACH = "requisition-attach"
const RESUMES ="resume";
const RESUME_LOCKED="locked"
const RESUME_UNLOCKED="unlocked"

export const UPLOAD_AVATARS = `${USERS_FILES}/${AVATARS}`;
export const UPLOAD_COMPANY_LOGO  = `${COMPANIES_FILES}/logos`;
export const UPLOAD_ONEWAY_INTERVIEWS = `${USERS_FILES}/${ONE_WAY_INTERVIEWS}`;
export const UPLOAD_CHAT_ATTACHMENTS = `${USERS_FILES}/${CHAT_ATTACH}/`;
export const UPLOAD_REQUISITION_ATTACHMENTS = `${COMPANIES_FILES}/${REQUISITION_ATTACH}`;

export const MAP_USER_AVATARS = (fileName: string) => `${BASE_PATH}${USERS_FILES}/${AVATARS}/${fileName}`;
export const MAP_COMPANY_LOGO = (fileName: string) => `${BASE_PATH}${COMPANIES_FILES}/logos/${fileName}`;
export const MAP_ONEWAY_INTERVIEWS = (fileName: string) => `${BASE_PATH}${USERS_FILES}/${ONE_WAY_INTERVIEWS}/${fileName}`;
export const MAP_REQUISITION_ATTACHMENTS = (fileName: string) => `${BASE_PATH}${COMPANIES_FILES}/${REQUISITION_ATTACH}/${fileName}`;

export const MAP_USER_RESUME_LOCKED = (fileName: string) => `${BASE_PATH}${USERS_FILES}/${RESUMES}/${RESUME_LOCKED}/${fileName}`;
export const MAP_USER_RESUME_UNLOCKED = (fileName: string) => `${BASE_PATH}${USERS_FILES}/${RESUMES}/${RESUME_UNLOCKED}/${fileName}`;
export const MAP_DOWNLOAD_USER_RESUME_LOCKED = (fileName: string) => `${USERS_FILES}/${RESUMES}/${RESUME_LOCKED}/${fileName}`;
export const MAP_DOWNLOAD_USER_RESUME_UNLOCKED = (fileName: string) => `${USERS_FILES}/${RESUMES}/${RESUME_UNLOCKED}/${fileName}`;
