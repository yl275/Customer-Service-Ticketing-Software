import { NeonDbError } from "@neondatabase/serverless";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;
    if (e.cause instanceof NeonDbError ) {
      const { code, detail } = e.cause;
      if (code === "23505") {
        return `Unique entry required. ${detail}`;
      }
    }
    
    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });


    return e.message;
  },
});
