export interface LegalInquiry {
  legalInquiryId?: number;
  userId: number;
  category: string;
  priority: string;
  subject: string;
  description: string;
  information: string;
  document: string;
  createdAt: string;
  createdBy: number;
}
