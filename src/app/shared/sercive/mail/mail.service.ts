import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private httpRequest: HttpClient) {}

  sendMail(mailInfo: any) {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpRequest.post(
      'https://www.api.sm-digitalizer.fr/mail',
      mailInfo,
      headers
    );
  }
}
