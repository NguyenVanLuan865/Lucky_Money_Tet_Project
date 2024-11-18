import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import axios, { AxiosInstance } from 'axios';

export class RxRemoteProvider {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  post<T>(url: string, data: any): Observable<T> {
    return from(this.axiosInstance.post<T>(url, data)).pipe(
      map((response) => response.data) // Lấy dữ liệu từ AxiosResponse
    );
  }

  get<T>(url: string): Observable<T> {
    return from(this.axiosInstance.get<T>(url)).pipe(
      map((response) => response.data) // Lấy dữ liệu từ AxiosResponse
    );
  }
}
