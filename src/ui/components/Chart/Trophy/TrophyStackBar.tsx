import { Box, Typography } from "@mui/material";
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 3 }}
    >
      <Typography variant="h6" sx={{ fontSize: 18 }}>
        Earned Trophies by Type
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
        [Platinum]&nbsp;[Gold]&nbsp;[Silver]&nbsp;[Bronze]
      </Typography>
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
    </Box>
  ) : (
    <></>
  );
};
