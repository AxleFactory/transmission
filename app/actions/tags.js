import * as Types from './types';

export function setTags(tags) {
  return {
    type: Types.SET_TAGS,
    tags
  }
}
