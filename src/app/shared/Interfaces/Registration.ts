import { Course } from "./Course";

export interface Registration {
    id: string;
    name: string;
    birthdate: string,
    registrationdate: string,
    email: string,
    course: Course,
    courseId: number
  }
