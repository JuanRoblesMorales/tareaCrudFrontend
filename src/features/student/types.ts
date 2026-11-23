export interface Subject {
  id: number;
  code: string;
  name: string;
}

export interface Student {
  id: number;
  nationalId: string;
  name: string;
  lastName: string;
  email: string;
  subjectCount: number;
  subjects: Subject[];
}
