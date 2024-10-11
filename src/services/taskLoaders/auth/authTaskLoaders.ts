import { AuthRegisterRequest } from "@/models/types/rtkQuery/auth";
import { authApi } from "@/services/rtkQueryApi/auth/authApi";
import { VERBS } from "@/settings/app/constants";
import {
  AUTH_ENDPOINT_NAME,
  AUTH_URL_MAP,
} from "@/settings/app/constants/api/auth";

import { BaseTaskLoader } from "../baseTaskLoader";

// Return the message for each step
export const TASK_MSG_MAP: Record<number, string> = {
  0: "Starting...",
  1: "Checking PSN On-Line ID...",
  2: "Checking E-Mail...",
  3: "Checking NPSSO code...",
  4: "Getting PSN credentials...",
  5: "Creating Account...",
  6: "Getting User games list...",
  7: "Loading games icons...",
  8: "Getting games trophy lists...",
  9: "Finishing...",
};

export class AuthTaskLoader extends BaseTaskLoader {
  // queryString = `?runTask=${this.runTask}&runSubTask=${this.runSubTask}&stepId=${this.stepId}`;

  loadData = async (authRegisterRequest: AuthRegisterRequest) => {
    const registerData = await this.baseLoader(
      authApi.endpoints.registerLoader,
      this.initAuthRegisterLoaderQuery(authRegisterRequest)
    );

    return registerData;
  };

  initAuthRegisterLoaderQuery = (authRegisterRequest: AuthRegisterRequest) => {
    return {
      endpointUrl: AUTH_URL_MAP[AUTH_ENDPOINT_NAME.REGISTER_LOADER],
      method: VERBS.POST,
      bodyData: authRegisterRequest,
      collection: "Auth",
      endpointName: AUTH_ENDPOINT_NAME.REGISTER_LOADER,
    };
  };
}
