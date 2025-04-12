export interface Job {
  id?: string;
  uid?: string;
  company: string;
  image: string;
  position: string;
  salary: string;
  location: string;
  appliedDate: string;
  status: 'Pending' | 'Interview' | 'Rejected';
  description?: string;
}