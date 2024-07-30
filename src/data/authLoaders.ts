import { BaseLoader } from "@/data/common/baseLoader";
import { authApi } from "@/services/rtkQueryApi/auth/authApi";

export class AuthLoader extends BaseLoader {
  registerLoader = async ({ request }) => {
    const register = await this.loader(
      authApi.endpoints.register,
      request,
      {},
      {}
    );
    return { register };
  };

  loginLoader = async ({ request }) => {
    const login = await this.loader(authApi.endpoints.login, request, {}, {});
    return { login };
  };

  logoutLoader = async ({ request }) => {
    const logout = await this.loader(authApi.endpoints.logout, request, {}, {});
    return { logout };
  };

  getUserLoader = async ({ params, request }) => {
    return await this.loader(authApi.endpoints.getUser, request, params.id, {});
  };
}
