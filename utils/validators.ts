import { Interview } from './types';

export function dateIsVacant(list: Interview[], date: Date): boolean {
  return list.reduce((isVacant, interview) => {
    const iDate = interview.date;
    return (
      isVacant &&
      !(
        iDate.getFullYear() === date.getFullYear() &&
        iDate.getMonth() === date.getMonth() &&
        iDate.getDate() === date.getDate() &&
        iDate.getHours() === date.getHours()
      )
    );
  }, true);
}
