import { BarChart } from "@mui/x-charts/BarChart";
import { DatasetType } from "@mui/x-charts/internals";

const translations = {
  earnedTotal: "Total Earned",
  notEarnedTotal: "Total Not Earned",
  total: "Total Overall",
} as const;

export function addLabels<T extends { dataKey: keyof typeof translations }>(
  series: T[]
) {
  return series.map((item) => ({
    ...item,
    label: translations[item.dataKey],
    valueFormatter: (v: number | null) => (v ? `${v}` : "-"),
  }));
}

interface ITrophyStackBarProps {
  dataset: DatasetType;
}

export const TrophyStackBar = ({ dataset }: ITrophyStackBarProps) => {
  return dataset ? (
    <BarChart
      skipAnimation
      dataset={dataset}
      series={addLabels([
        { dataKey: "earnedTotal", label: "earned" },
        { dataKey: "notEarnedTotal", label: "notEarned" },
        { dataKey: "total", label: "overall" },
      ])}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "trophyType",
          colorMap: {
            type: "ordinal",
            values: ["Platinum", "Gold", "Silver", "Bronze"],
            colors: ["#29bdfc", "#b99e3b", "#828080", "#a37725"],
          },
        },
      ]}
      slotProps={{
        legend: { hidden: true },
      }}
      width={700}
      height={400}
      barLabel="value"
    />
  ) : (
    <></>
  );
};
