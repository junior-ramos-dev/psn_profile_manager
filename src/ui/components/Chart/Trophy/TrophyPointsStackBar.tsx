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

export const TrophyPointsStackBar = ({ dataset }: ITrophyStackBarProps) => {
  const dataSetPoints = getTrophyPoints(dataset);

  // [TROPHY_TYPE_NAME.BRONZE]: 15,
  // [TROPHY_TYPE_NAME.SILVER]: 30,
  // [TROPHY_TYPE_NAME.GOLD]: 90,
  // [TROPHY_TYPE_NAME.PLATINUM]: 300,

  return dataSetPoints ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 3 }}
    >
      <Typography variant="h6" sx={{ fontSize: 18 }}>
        Earned Points by Trophy Type
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
        [Platinum: 300]&nbsp;[Gold: 90]&nbsp;[Silver: 30]&nbsp;[Bronze: 15]
      </Typography>
      <BarChart
        skipAnimation
        dataset={dataSetPoints}
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

interface ITrophyPoints {
  earnedTotal: number;
  notEarnedTotal: number;
  total: number;
  trophyType: string;
}

const getTrophyPoints = (dataset: DatasetType) => {
  // console.log(dataset);
  // [TROPHY_TYPE_NAME.BRONZE]: 15,
  // [TROPHY_TYPE_NAME.SILVER]: 30,
  // [TROPHY_TYPE_NAME.GOLD]: 90,
  // [TROPHY_TYPE_NAME.PLATINUM]: 300,

  const trophyPointsList = [];

  if (dataset) {
    dataset.forEach((item) => {
      const trophyPoints: ITrophyPoints = {
        earnedTotal: 0,
        notEarnedTotal: 0,
        total: 0,
        trophyType: "0",
      };

      switch (item.trophyType) {
        case "Platinum": {
          trophyPoints.earnedTotal = Number(item.earnedTotal) * 300;
          trophyPoints.notEarnedTotal = Number(item.notEarnedTotal) * 300;
          trophyPoints.total = Number(item.total) * 300;
          trophyPoints.trophyType = "Platinum";

          trophyPointsList.push(trophyPoints);
          break;
        }
        case "Gold": {
          trophyPoints.earnedTotal = Number(item.earnedTotal) * 90;
          trophyPoints.notEarnedTotal = Number(item.notEarnedTotal) * 90;
          trophyPoints.total = Number(item.total) * 90;
          trophyPoints.trophyType = "Gold";

          trophyPointsList.push(trophyPoints);
          break;
        }
        case "Silver": {
          trophyPoints.earnedTotal = Number(item.earnedTotal) * 30;
          trophyPoints.notEarnedTotal = Number(item.notEarnedTotal) * 30;
          trophyPoints.total = Number(item.total) * 30;
          trophyPoints.trophyType = "Silver";

          trophyPointsList.push(trophyPoints);
          break;
        }
        case "Bronze": {
          trophyPoints.earnedTotal = Number(item.earnedTotal) * 15;
          trophyPoints.notEarnedTotal = Number(item.notEarnedTotal) * 15;
          trophyPoints.total = Number(item.total) * 15;
          trophyPoints.trophyType = "Bronze";

          trophyPointsList.push(trophyPoints);
          break;
        }
      }
    });
  }

  return trophyPointsList as DatasetType;
};
