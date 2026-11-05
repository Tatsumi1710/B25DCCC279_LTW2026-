import { POINTS, RANKS } from './data';

export const calcScore = (answers) => {
  return answers
    .filter((ans) => ans.correct)
    .reduce((sum, ans) => sum + POINTS[ans.level], 0);
};

export const getRank = (score) => {
  const found = RANKS.find((r) => score >= r.min);
  return found ? found.title : '';
};