export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const truncateText = (text: string, maxLength = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
