export interface Applicant {
  firstName: string;
  lastName: string;
  formIVIndex: string;
  hashedPassword: string;
  phone: string;
  email?: string;
}

export interface FormIVData {
  id: string;
  firstName: string;
  lastName: string;
  formIVIndex: string;
}

export interface GetFormIVDataResponse {
  data: FormIVData;
  error: string | null;
}
