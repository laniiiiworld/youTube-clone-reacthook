import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko-KR', koLocale);

export function formatAgo(date) {
  return format(date, navigator.language === 'ko-KR' ? 'ko-KR' : 'en-US');
}
