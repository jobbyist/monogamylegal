const env = import.meta.env;

const requiredProductionEnvVars = [
  "VITE_CALCOM_URL",
  "VITE_SUPPORT_EMAIL",
  "VITE_API_BASE_URL",
] as const;

type RequiredProductionEnvVar = (typeof requiredProductionEnvVars)[number];

const getMissingEnvVars = (keys: readonly RequiredProductionEnvVar[]) =>
  keys.filter((key) => !env[key] || String(env[key]).trim().length === 0);

export const validateRuntimeConfig = () => {
  if (!env.PROD) {
    return;
  }

  const missingVars = getMissingEnvVars(requiredProductionEnvVars);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }
};

export const appConfig = {
  calComUrl: String(env.VITE_CALCOM_URL ?? ""),
  supportEmail: String(env.VITE_SUPPORT_EMAIL ?? ""),
  apiBaseUrl: String(env.VITE_API_BASE_URL ?? "").replace(/\/$/, ""),
};
