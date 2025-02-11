import type { ErrorResponse, FetchOptions } from "../../types";

export async function connectAPI<T>(
  url: string,
  options: FetchOptions = {}
): Promise<[Error | null, T | null]> {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      body:
        options.body && typeof options.body === "object"
          ? JSON.stringify(options.body)
          : options.body,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(
        errorData.details || "Error occurred while fetching data"
      );
    }

    const responseData = await response.text();
    const data: T = responseData ? JSON.parse(responseData) : ({} as T);
    return [null, data];
  } catch (error) {
    if (error instanceof Error) {
      return [error, null];
    }
    return [new Error("Unknown error occurred"), null];
  }
}
