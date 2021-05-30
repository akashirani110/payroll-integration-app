import { XeroTokenSet } from './xeroTokenSet.model';

export interface XeroSession {
  tokenSet: XeroTokenSet
  activeTenantId: string
}
