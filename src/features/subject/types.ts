export interface Subject {
  subjectId: number;
  code: string;
  name: string;
}

export interface CreateSubjectRequest{
    code: string;  
    name: string;
}