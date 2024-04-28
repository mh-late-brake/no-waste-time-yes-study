import getLatestPlaytime from "./get-latest-playtime";
import { getControlledUrls } from "./get-preferences";

export default async function allowedToContinue(url: string | null): Promise<boolean> {
  if (!url) {
    return false;
  }
  const origin = extractOrigin(url);

  const controlledUrls: string[] = await getControlledUrls();
  if (controlledUrls.every(url => url !== origin)) {
    return true;
  }

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

function extractOrigin(url: string) {
  const urlObject = new URL(url);
  const origin = urlObject.origin;
  return origin;
}
