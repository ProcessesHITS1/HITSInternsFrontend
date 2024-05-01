export const getEnvVar = (key: string) => {
  return import.meta.env[key]
}
