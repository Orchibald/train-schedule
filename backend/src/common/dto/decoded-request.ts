import { Role } from "@prisma/client";

export class DecodedRequest {
  id: string;
  role: Role;
}