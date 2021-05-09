import { HttpErrorResponse } from '@angular/common/http';

import { IClient } from 'lib/interfaces';
import { IAuthData } from 'lib/interfaces/auth-data.interface';

export class Login {
  public static readonly type = '[Auth] Login';
  constructor(public readonly authData: IAuthData) {}
}

export class Register {
  public static readonly type = '[Auth] Register';
  constructor(public readonly authData: IAuthData) {}
}

export class Logout {
  public static readonly type = '[Auth] Logout';
}

export class CheckSession {
  public static readonly type = '[Auth] CheckSession';
}

export class GetClients {
  public static readonly type = '[Auth] GetClients';
}

export class SaveClientData {
  public static readonly type = '[Auth] SaveClientData';
  constructor(public readonly data: IClient) {}
}

export class LoginSuccess {
  public static readonly type = '[Auth] LoginSuccess';
}

export class RegisterSuccess {
  public static readonly type = '[Auth] RegisterSuccess';
}

export class LoginFailed {
  public static readonly type = '[Auth] LoginFailed';
  constructor(public readonly message: HttpErrorResponse) {}
}

export class RegisterFailed {
  public static readonly type = '[Auth] RegisterFailed';
  constructor(public readonly message: HttpErrorResponse) {}
}
