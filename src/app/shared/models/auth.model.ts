export interface RegisterPlayerRequest {
  accountName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  accessExpireAt: string;
  refreshToken: string;
  refreshExpireAt: string;
}
