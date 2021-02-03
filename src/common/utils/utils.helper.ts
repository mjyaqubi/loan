export const dateValidator = (date: string): boolean => /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date);
export const diffDays = (start: string, end: string): number => (!dateValidator(start) || !dateValidator(end)) ? -1 : Math.ceil(Math.abs(new Date(start).getTime() - new Date(end).getTime()) / (1000 * 60 * 60 * 24));
