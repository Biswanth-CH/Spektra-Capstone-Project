export interface Userrequest {
  userRequestId?: number;
  userId: number;
  requestType: string;
  relatedRecordId: number;
  status: string;
  createdAt: string;
  createdBy: number;
}
