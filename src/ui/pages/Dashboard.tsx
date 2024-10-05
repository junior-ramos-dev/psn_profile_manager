/** @jsxImportSource @emotion/react */
import { Suspense, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Helmet } from "react-helmet-async";

import { useGetEarnedTrophiesStatsMutation } from "@/services/rtkQueryApi/trophy/trophyApi";
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "@/settings/app/constants";
import { TrophyStackBar } from "@/ui/components/Chart/Trophy/TrophyStackBar";
import { PageContentWrapper } from "@/ui/components/Common/PageContentWrapper";
import { RingMessageLoading } from "@/ui/components/Common/RingMessageLoading";
import { DashboardPageHeader } from "@/ui/components/Dashboard/DashboardPageHeader";
import { Box, Button, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { TrophyPointsStackBar } from "../components/Chart/Trophy/TrophyPointsStackBar";

const sortedTrophiesField = ["Platinum", "Gold", "Silver", "Bronze"];

const Dashboard = () => {
  const [dataStats, setDataStats] = useState(undefined);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [
    getEarnedTrophiesStats,
    { isLoading /* isError, isSuccess  ,data */ },
  ] = useGetEarnedTrophiesStatsMutation();

  // Release year for PS3
  const defaultStartDate = dayjs("2006-01-01");
  // Current Date
  const defaultEndDate = dayjs(new Date());

  useEffect(() => {
    handleGetEarnedTrophiesStats();
  }, []);

  const handleGetEarnedTrophiesStats = async () => {
    // console.log(startDate.toISOString(), endDate.toISOString());

    // startDate: "2018-01-01T00:00:00.000+00:00",
    // endDate: "2024-09-30T00:00:00.000+00:00",
    const startDateStr =
      startDate?.toISOString() ?? defaultStartDate.toISOString();
    const endDateStr = endDate?.toISOString() ?? defaultEndDate.toISOString();

    try {
      await getEarnedTrophiesStats({
        startDate: startDateStr,
        endDate: endDateStr,
      })
        .unwrap()
        .then((data) => {
          console.log(data);

          const sortedArray = [...data];

          // Sort the array by index of trophyType in the sortedArray
          sortedArray.sort(
            (x, y) =>
              sortedTrophiesField.indexOf(x.trophyType) -
              sortedTrophiesField.indexOf(y.trophyType)
          );

          // const { user, profile } = data;
          setDataStats(sortedArray);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_DASHBOARD} | {APP_TITLE}
        </title>
      </Helmet>
      <Box component="header">
        <DashboardPageHeader pageTitle={PAGE_TITLE_DASHBOARD} />
      </Box>
      <PageContentWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              // justifyItems: "right",
              justifyContent: "center",
            }}
          >
            <DatePicker
              label="Start Date"
              format="LL"
              defaultValue={defaultStartDate}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              format="LL"
              defaultValue={defaultEndDate}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />

            <Button
              variant="contained"
              sx={{ mt: 0.2, mb: 2 }}
              onClick={handleGetEarnedTrophiesStats}
              disabled={isLoading}
            >
              Load
            </Button>
          </Box>
        </LocalizationProvider>

        <Suspense>
          {isLoading ? (
            <RingMessageLoading />
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                justifyItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
                <TrophyStackBar dataset={dataStats} />
                <TrophyPointsStackBar dataset={dataStats} />
              </Stack>
            </Box>
          )}
        </Suspense>
      </PageContentWrapper>
    </>
  );
};

export default Dashboard;
