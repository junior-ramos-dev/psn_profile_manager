import { ITaskProps } from "@/models/interfaces/ITaskHandler";
import { AuthRegisterRequest } from "@/models/types/rtkQuery/auth";
import { authApi } from "@/services/rtkQueryApi/auth/authApi";
import { VERBS } from "@/settings/app/constants";
import {
  AUTH_ENDPOINT_NAME,
  AUTH_URL_MAP,
} from "@/settings/app/constants/api/auth";

import { BaseTaskLoader } from "../baseTaskLoader";

// The number of steps for the task
export enum STEP_ID {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
}

// Return the message for each step
export const STEP_MSG_MAP: Record<STEP_ID, string> = {
  [STEP_ID.ONE]: "Checking PSN On-Line ID...",
  [STEP_ID.TWO]: "Checking E-Mail...",
  [STEP_ID.THREE]: "Checking NPSSO code...",
  [STEP_ID.FOUR]: "Getting PSN credentials...",
  [STEP_ID.FIVE]: "Creating Account...",
  [STEP_ID.SIX]: "Getting User games list...",
  [STEP_ID.SEVEN]: "Loading games icons...",
  [STEP_ID.EIGHT]: "Getting games trophy lists...",
  [STEP_ID.NINE]: "Finishing...",
};

export class AuthTaskLoader extends BaseTaskLoader {
  // queryString = `?runTask=${this.runTask}&runSubTask=${this.runSubTask}&stepId=${this.stepId}`;

  loadData = async () => {
    const registerData = await this.baseLoader(
      authApi.endpoints.registerLoader,
      this.loaderQuery
    );

    return registerData;
  };

  initAuthregisterLoaderQuery = (authRegisterRequest: AuthRegisterRequest) => {
    this.loaderQuery = {
      endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.REGISTER_LOADER],
      method: VERBS.POST,
      bodyData: authRegisterRequest,
      collection: "Auth",
      endpointName: AUTH_ENDPOINT_NAME.REGISTER_LOADER,
    };
  };

  handleStepsParams = (taskProps: ITaskProps) => {
    if (taskProps.stepId === STEP_ID.ONE && taskProps.runSubTask === 0) {
      // this.stepId = STEP_ID.TWO;
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.TWO && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.THREE && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }
    if (taskProps.stepId === STEP_ID.FOUR && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.FIVE && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.SIX && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.SEVEN && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.EIGHT && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }

    if (taskProps.stepId === STEP_ID.NINE && taskProps.runSubTask === 0) {
      this.runSubTask = 1;
    }
  };
}
