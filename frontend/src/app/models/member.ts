export interface Member {
    id: number;
    name: string;
    phoneNumber: string;
    idCardNumber: string;
    address: string;
    status: string;
}

export class MemberStatusDictionary {
    public readonly memberStatus = {
        active: 'a',
        inactive: 'i'
    }
    public readonly statusMember = {
        a: 'active',
        i: 'inactive'
    }
    public readonly statuses = ['active', 'inactive'];
}

export enum MemberStatusEnum {
    ACTIVE = 'a', INACTIVE = 'i'
}