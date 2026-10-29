export const GROWTH_STAGE_ORDER = ['seed', 'sprout', 'bud', 'bloom']

export function getGrowthStage(plantedAt, now = Date.now()) {
  // Corrupt or unavailable timestamps should never make a flower appear fully grown.
  if (!Number.isFinite(plantedAt) || plantedAt <= 0 || !Number.isFinite(now)) {
    return 'seed'
  }

  const age = Math.max(0, now - plantedAt)
  if (age < 60_000) return 'seed'
  if (age < 60 * 60_000) return 'sprout'
  if (age < 24 * 60 * 60_000) return 'bud'
  return 'bloom'
}
