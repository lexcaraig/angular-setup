import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CustomHttpClient } from '../custom-http-client';

import { ConfigService } from '../config';

@Injectable()
export class PushService {

  // tslint:disable-next-line:no-inferrable-types
  private API_URL: string = '';

  constructor(
    private http: CustomHttpClient,
    private configService: ConfigService
  ) {
    this.API_URL = this.configService.get('BASE_URL');
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  addSubscriber(subscription) {

    const url = `${this.API_URL}/webpush`;
    console.log('[Push Service] Adding subscriber');

    const body = {
      action: 'subscribe',
      subscription: subscription
    };

    return this.http.post(url, body);

  }

  deleteSubscriber(subscription) {

    const url = `${this.API_URL}/webpush`;
    console.log('[Push Service] Deleting subscriber');

    const body = {
      action: 'unsubscribe',
      subscription: subscription
    };

    return this.http.post(url, body);

  }

}
