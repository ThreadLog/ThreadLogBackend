export interface SupportTicket {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  sendAsEmail?: boolean;
  createdAt?: Date;
}
