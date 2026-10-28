import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listCommunity = query({
  args: {},
  handler: async (ctx) => {
    const flowers = await ctx.db.query("flowers").order("desc").take(200);
    // Never return device keys or other per-device identifiers to the community.
    return flowers.map((flower) => ({ plantedAt: flower.plantedAt }));
  },
});

export const getMyFlower = query({
  args: { deviceKey: v.string() },
  handler: async (ctx, { deviceKey }) => {
    const flower = await ctx.db
      .query("flowers")
      .withIndex("by_deviceKey", (q) => q.eq("deviceKey", deviceKey))
      .first();
    return flower ? { plantedAt: flower.plantedAt } : null;
  },
});

export const plantFlower = mutation({
  args: { deviceKey: v.string() },
  handler: async (ctx, { deviceKey }) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("flowers")
      .withIndex("by_deviceKey", (q) => q.eq("deviceKey", deviceKey))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { plantedAt: now });
      return existing._id;
    }

    return await ctx.db.insert("flowers", {
      deviceKey,
      plantedAt: now,
      createdAt: now,
    });
  },
});
