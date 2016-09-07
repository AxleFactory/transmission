import * as Types from './types';
import {getBranchReferralLink} from '../utils/analytics';

export function getReferralUrl () {
  return {
    type: Types.GET_REFERRAL_URL,
    asyncAction: () => getBranchReferralLink()
  };
}
