export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}
export enum Status {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED'
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