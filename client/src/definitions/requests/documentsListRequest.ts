import { http } from '../../components/others/http';
import { Document } from '../types/Document';

type PostOutput = void;
type PostInput = {} & Document;
type GetOutput = {count: number;next: string;previous: string; results: Array<Document> };
type GetInput = {
      startDate?: string;
      endDate?: string;
      title?: string;
      fileType?: string;
      page?: number;
      limit?: number;
      sortField?: 'createdAt' | 'title' | 'fileName' | 'fileType';
      sortOrder?: 'asc' | 'desc';
};

class DocumentsRequest {
      get = (params: GetInput) => http.get<GetInput, GetOutput>(`/api/documents/`)(params);
      post = (params: PostInput) => http.post<PostInput, PostOutput>(`/api/documents/`, 'FORMDATA')(params);
}

export const documentsRequest = new DocumentsRequest();
