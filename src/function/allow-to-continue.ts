import getLatestPlaytime from "./get-latest-playtime";

export default async function allowedToContinue(): Promise<boolean> {
  const latestPlaytime = await getLatestPlaytime();

  if (!latestPlaytime) {
    return false;
  }

  const now = Date.now();
  const { startTime, endTime } = latestPlaytime;

  if (now >= startTime && now <= endTime) {
    return true;
  }
  return false;
}


