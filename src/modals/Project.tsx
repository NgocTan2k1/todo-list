export interface Project {
    projectId: string;
    projectName: string;
    createDate: string;
    creator: string;
    leaders: string[] | [];
    members: string[] | [];
    tasks: string[] | [];
    startDate: Date;
    endDate: Date;
    status: string;
}
