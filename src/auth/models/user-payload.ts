export interface UserPayload {
  sub: number | undefined;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
