import { Injectable } from '@angular/core';
import { IUserInfo } from '@app/core/interfaces/user.interface';
import { HttpClientService } from '@app/core/services/http-client.service';
import { Router } from '@angular/router';
import { IKV } from '@app/core/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  redirectUrl = '/';
  userInfo: IUserInfo = null!;

  constructor(private _http: HttpClientService, private _router: Router) {}

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  @HttpClientService.MethodAfterLog
  login(params: IKV) {
    return this._http.post('/usersvc/login', params).pipe(
      map(r => {
        if (!r.error) {
          this._router.navigateByUrl(this.redirectUrl);
        }
        return r;
      })
    );
  }

  @HttpClientService.MethodAfterLog
  logout() {
    return this._http.get('/usersvc/logout').pipe(
      map(r => {
        if (!r.error) {
          this._router.navigateByUrl('/sign');
        }
        return r;
      })
    );
  }
}
