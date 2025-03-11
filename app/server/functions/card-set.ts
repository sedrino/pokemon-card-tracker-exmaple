import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import { authMiddleware } from "@/middleware/auth";
import {
  findCardSetsCount,
  findCardSetsPaginated,
} from "@/server/db/queries/card-set/read";

const listCardSetsInput = z.object({
  page: z.number().catch(1),
  pageSize: z.number().catch(50),
});
export const $listCardSets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(zodValidator(listCardSetsInput))
  .handler(async ({ data, context }) => {
    const cardSets = await findCardSetsPaginated(data, context.userId);
    const cardSetsCount = await findCardSetsCount();
    return {
      cardSets,
      totalCardSets: cardSetsCount,
    };
  });
