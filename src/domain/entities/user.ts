export enum UserAccountStatus {
    ACTIVE = 'ACTIVE', 
    INACTIVE = 'INACTIVE',
    QUEUED = 'QUEUED'
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    primaryEmail: string;
    secondaryEmail: string | null;
    accountStatus: UserAccountStatus;
    createdAt: Date;
    updatedAt: Date;
}