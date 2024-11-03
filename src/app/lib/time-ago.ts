export const timeAgo = (notificationDate: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - notificationDate.getTime());

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes === 0) return `همین الان`;
  if (minutes < 60) return `${minutes} دقیقه پیش`;
  if (hours < 24) return `${hours} ساعت پیش`;
  return `${days} روز پیش`;
};
