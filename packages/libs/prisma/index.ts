// import { PrismaClient } from "@prisma/client";

// declare global {
//     namespace globalThis {
//         var prismadb: PrismaClient;
//     }
// }

// const prisma = new PrismaClient();

// if (process.env.NODE_ENV === "production") global.prismadb = prisma;

// export default prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // optional: add log levels for debugging
        // log: ["query"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
