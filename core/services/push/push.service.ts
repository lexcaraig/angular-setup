import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, catch, throw } from 'rxjs/operators';

import { CustomHttpClient } from '../custom-http-client';

import { ConfigService } from '../config';

import { handleError } from '@core/helpers';

@Injectable()
export class PushService {

  private API_URL: string

  constructor(private http: CustomHttpClient, private configService: ConfigService) {
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
    console.log('[Push Service] Adding subscriber')

    let body = {
      action: 'subscribe',
      subscription: subscription
    }

    return this.http
      .post(url, body)
      .catch(handleError);

  }

  deleteSubscriber(subscription) {

    const url = `${this.API_URL}/webpush`;
    console.log('[Push Service] Deleting subscriber')

    let body = {
      action: 'unsubscribe',
      subscription: subscription
    }

    return this.http
      .post(url, body)
      .catch(handleError);

  }

}