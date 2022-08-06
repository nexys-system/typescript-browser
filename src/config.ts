export const title = "Typescript in Browser";

export const version: string = import.meta.env.VITE_VERSION || "unset_version";
export const sha: string = import.meta.env.VITE_GIT_SHA || "unset_sha";
export const basename = import.meta.env.BASE_URL;

const ghUrl = "https://github.com/nexys-system/typescript-browser";

export const github = {
  sha: `${ghUrl}/commit/${sha}`,
  version: `${ghUrl}/releases/tag/${version}`,
  url: ghUrl,
};
