export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}
export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    DUPLICATE = 'DUPLICATE'
}
export enum IssueType {
    BUG = 'BUG',
    FEATURE = 'FEATURE',
    DOCUMENTATION = 'DOCUMENTATION',
    QUESTION = 'QUESTION'
}
export interface Issue {
    id?: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    type: IssueType;
    deadline?: string;
    dateAdded?: string;
    dateResolved?: string;
    imageUrl?: string;
    reporterId?: number;
    assigneeId?: number;
}