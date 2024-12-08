export interface UserModal {
    userId: string;
    username: string;
    email: string;
    role: number;
    createAt: Date;
    updateAt: Date | string;
    members: {
        userId: string;
        username: string;
    }[];
    deleteFlag: number;
}
