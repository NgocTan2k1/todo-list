export interface UserModal {
    userId: string;
    username: string;
    role: number;
    createAt: Date;
    updateAt: Date | string;
    members: {
        userId: string;
        username: string;
    }[];
    deleteFlag: number;
}
