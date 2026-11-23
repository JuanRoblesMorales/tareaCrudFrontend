export interface Subject {
  id: number;
  code: string;
  name: string;
}

export interface Student {
  id: number;
  cedula: string;
  name: string;
  lastName: string;
  email: string;
  subjectCount: number;
  subjects: Subject[];
  isActive: boolean;
}

export interface createStudentRequest {
  name: string;
  lastName: string;
  cedula: string;
  email: string;
}
