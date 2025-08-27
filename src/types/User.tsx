import { Member } from './index';

export type User = {
    userId: string;
    username: string;
    email: string;
    role: number;
    createAt: Date;
    updateAt: Date | string;
    members: Member[] | [];
    deleteFlag: boolean;
};
