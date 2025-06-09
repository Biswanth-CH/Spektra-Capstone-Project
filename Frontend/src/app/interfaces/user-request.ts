export interface UserRequest {
  userRequestId?: number; // optional for POST
  userId: number;
  requestType: string;
  relatedRecordId: number;
  status: string;
  createdAt: string;
  createdBy: number;
}
