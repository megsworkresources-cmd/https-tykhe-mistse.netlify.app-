import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  flowers: defineTable({
    deviceKey: v.string(),
    plantedAt: v.number(),
    createdAt: v.number(),
  }).index("by_deviceKey", ["deviceKey"]),
});
