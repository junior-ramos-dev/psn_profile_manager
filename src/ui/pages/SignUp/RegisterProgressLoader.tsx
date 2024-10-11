// import { useEffect, useRef, useState } from "react";
// import { RingLoader } from "react-spinners";

// import { ITaskHandler } from "@/models/interfaces/ITaskHandler";
// import { IUserAndProfile } from "@/models/interfaces/user/IUserAndProfile";
// import {
//   STEP_ID,
//   STEP_MSG_MAP,
// } from "@/services/taskLoaders/auth/authTaskLoaders";
// import { BaseTaskLoader } from "@/services/taskLoaders/baseTaskLoader";
// import { Box, LinearProgress, Stack, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// interface TaskProgressLoaderProps {
//   taskLoader: BaseTaskLoader;
// }

// export const RegisterProgressLoader = ({
//   taskLoader,
// }: TaskProgressLoaderProps) => {
//   const theme = useTheme();

//   const [progress, setProgress] = useState(0);
//   const [buffer, setBuffer] = useState(10);
//   const [stepMsg, setStepMsg] = useState(STEP_MSG_MAP[STEP_ID.ONE]);

//   const progressRef = useRef(() => {});

//   const totalSteps = Object.keys(STEP_ID).length / 2;
//   const progressInc = Math.round(100 / totalSteps);

//   let intervalId: NodeJS.Timeout | string | number | undefined;
//   useEffect(() => {
//     intervalId = window.setInterval(() => {
//       progressRef.current();
//       fetchData();
//     }, 1000);

//     const fetchData = async () => {
//       try {
//         const taskHandler: ITaskHandler = await taskLoader.loadData();
//         const taskProps = taskHandler.taskProps;

//         //LinearProgress buffer
//         progressRef.current = () => {
//           setStepMsg(STEP_MSG_MAP[taskProps.taskId]);

//           console.log(taskProps.taskId, STEP_MSG_MAP[taskProps.taskId]);

//           setProgress(taskProps.taskId * progressInc);
//           if (buffer < 100 && progress % 5 === 0) {
//             const newBuffer = buffer + 1 + Math.random() * 10;
//             setBuffer(newBuffer > 100 ? 100 : newBuffer);
//           }
//         };

//         if (taskProps.taskId === STEP_ID.NINE) {
//           setStepMsg(STEP_MSG_MAP[STEP_ID.NINE]);
//           setProgress(100);

//           const responseData = taskHandler.data as IUserAndProfile;

//           console.log("clearInterval(intervalId)");
//           window.clearInterval(intervalId);

//           return responseData;
//         }

//         return taskHandler;
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     return () => {
//       window.clearInterval(intervalId);
//       if ((intervalId as unknown as number) % 2 === 0) {
//         window.clearTimeout(intervalId);
//       }
//     };
//   }, []);

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       minHeight="100vh"
//     >
//       <Stack alignItems="center" spacing={2} sx={{ width: "30%" }}>
//         <RingLoader color={theme.palette.primary.main} />
//         <Typography variant="subtitle2">{`${stepMsg}: ${progress}%`}</Typography>
//         <Box sx={{ width: "100%" }}>
//           <LinearProgress
//             variant="buffer"
//             value={progress}
//             valueBuffer={buffer}
//           />
//         </Box>
//       </Stack>
//     </Box>
//   );
// };
