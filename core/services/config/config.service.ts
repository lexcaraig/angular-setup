import { Injectable } from '@angular/core';

import { environment as env } from '@env/environments';

@Injectable()
export class ConfigService {

    private _config:any = env.config;

    constructor() {
    }

    get(key: any) {
        return this._config[key];
    }
}