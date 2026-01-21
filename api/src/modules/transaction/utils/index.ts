export const startsOfMonth = (date: Date) => {
  const result = new Date(date);

  result.setDate(1);
  result.setHours(0, 0, 0, 0);

  return result;
};

export const endsOfMonth = (date: Date) => {
  const result = new Date(date);

  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  result.setHours(23, 59, 59, 999);

  return result;
};
