import { TokenSet } from "openid-client";

  export class XeroTokenSet extends TokenSet {
    employer_user_id: string;
    id_token: string;
    access_token?: string;
    token_type?: string;
    refresh_token?: string;
    scope?: string;
    session_state?: string;
    expires_at?: number;
    redirect_url?: string;
    createAt?: Date;
    updatedAt?: Date;
  }