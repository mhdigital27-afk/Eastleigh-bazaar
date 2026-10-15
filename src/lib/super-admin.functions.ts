import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const authenticateSuperAdmin = createServerFn({ method: "POST" })
  .validator((data: any) => 
    z.object({ 
      email: z.string(), 
      password: z.string() 
    }).parse(data)
  )
  .handler(async ({ data }) => {
    // Looks for Environment variables first, then uses fallback for local testing
    const masterEmail = process.env.BOSS_EMAIL || "Eastleighbazaar6@gmail.com";
    const masterPass = process.env.BOSS_PASSCODE || "next 2758";

    if (
      data.email.toLowerCase().trim() === masterEmail.toLowerCase() && 
      data.password === masterPass
    ) {
      return { token: "BOSS_SESSION_AUTHORIZED" };
    }

    throw new Error("Unauthorized: Access Denied");
  });
