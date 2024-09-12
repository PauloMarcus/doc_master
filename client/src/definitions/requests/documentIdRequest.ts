import { http } from "../../components/others/http";
import { Document } from "../types/Document";

type DeleteOutput = void
type DeleteInput = {
  id: number;
}
type PutOutput = Document
type PutInput = {
  id: number;
 } & Document
type GetOutput = Document
type GetInput = {
  id: number;
}

class DocumentIdRequest {
    get = (params: GetInput) => http.get<GetInput,GetOutput>(`/api/documents/${params.id}/`)(params)
    put = (params: PutInput) => http.put<PutInput,PutOutput>(`/api/documents/${params.id}/`, 'FORMDATA')(params)
    delete = (params: DeleteInput) => http.delete<DeleteInput,DeleteOutput>(`/api/documents/${params.id}/`)(params)
}

export const documentIdRequest = new DocumentIdRequest();
