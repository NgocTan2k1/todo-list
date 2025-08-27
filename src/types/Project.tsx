import { ActualWorkingTime, Member, TaskRefer } from './index';

export interface Project {
    projectId: string;
    projectName: string;
    createAt: string;
    updateAt: string;
    creator: Member;
    projectManager: Member[];
    leaders: Member[] | [];
    members: Member[] | [];
    tasks: TaskRefer[] | [];
    startDate: string;
    endDate: string;
    actualStartDate: Date | null;
    actualEndDate: Date | null;
    status: 'COMING SOON' | 'ONPROGESS' | 'PENDING' | 'DONE' | 'CANCEL';
    deleteFlag: boolean;
}

export interface Task {
    taskId: string;
    taskName: string;
    taskDescription: string;
    createAt: string;
    updateAt: string;
    creator: string;
    startDate: string;
    endDate: string;
    workingTime: number;
    assignDate: string;
    assignedMembers: string[] | [];
    status: 'COMING SOON' | 'TODO' | 'PENDING' | 'DONE' | 'CANCEL';
    actualStartDate: string;
    actualEndDate: string;
    actualWorkingTime: ActualWorkingTime[] | [];
    performance: '' | 'GOOD' | 'BAD' | 'NORMAL';
    deleteFlag: boolean;
}
