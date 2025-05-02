import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function timeAgo(input: string | Date): string {
  return dayjs(input).fromNow();
}
