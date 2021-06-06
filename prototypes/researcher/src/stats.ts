type Records = Record<string, any>[];
const rankTally = (tally: Record<string, number>) => {
  return Object.entries(tally)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};

const tallyByKeyName = (records: Records, keyName: string) => {
  const acc: Record<string, number> = {};
  const counted = records.reduce((acc, record) => {
    const k = record[keyName];
    acc[k] = acc[k] ? acc[k] + 1 : 1;
    return acc;
  }, acc);
  return rankTally(counted);
};

const inspectKeys = (records: Records) => {
  const acc: Record<string, number> = {};
  const counted = records.reduce((acc, sample) => {
    let keys: string[] = Object.keys(sample);
    keys.forEach((key) => {
      acc[key] = acc[key] ? acc[key] + 1 : 1;
    });
    return acc;
  }, acc);
  return rankTally(counted);
};

const inspectUser = (records: Records) => tallyByKeyName(records, "user");
const inspectType = (records: Records) => tallyByKeyName(records, "type");
const inspectLinkCount = (records: Records) =>
  tallyByKeyName(records, "linkCount");
const inspectTextLength = (records: Records) =>
  tallyByKeyName(records, "relativeTextLength");

const generateStats = (records: Records) => {
  return {
    rankedKeys: inspectKeys(records),
    rankedTypes: inspectType(records),
    rankedUsers: inspectUser(records),
    textLength: inspectTextLength(records),
    linkCount: inspectLinkCount(records),
  };
};

export default generateStats;

export { inspectUser, inspectType, inspectKeys };
