import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthInterceptor() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cbRef = useRef({ logout, navigate });
  cbRef.current = { logout, navigate };

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (input, init) => {
      const response = await originalFetch(input, init);

      try {
        const url =
          typeof input === "string"
            ? input
            : input instanceof Request
              ? input.url
              : input.toString();

        const reqHeaders =
          input instanceof Request
            ? input.headers
            : init?.headers
              ? new Headers(init.headers)
              : null;

        const hasAuth =
          reqHeaders?.has("authorization") || reqHeaders?.has("Authorization");

        if (
          url.includes("/api/") &&
          hasAuth &&
          (response.status === 401 || response.status === 403)
        ) {
          const body = await response
            .clone()
            .json()
            .catch(() => ({}));

          if (body?.code === "token_expired" || body?.code === "token_invalid") {
            cbRef.current.logout("expired");
            cbRef.current.navigate("/login", { replace: true });
          }
        }
      } catch {
        // ignore peeking errors so we never break the original response
      }

      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
