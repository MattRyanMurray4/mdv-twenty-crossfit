import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '@crossfit/api-interfaces';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private model = 'boxes';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Box[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Box>(this.getUrlById(id));
  }

  create(box: Box) {
    return this.httpClient.post<Box>(this.getUrl(), box);
  }

  update(box: Box) {
    return this.httpClient.patch<Box>(this.getUrlById(box.id), box);
  }

  delete(boxId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(boxId))
      .pipe(mapTo(boxId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
