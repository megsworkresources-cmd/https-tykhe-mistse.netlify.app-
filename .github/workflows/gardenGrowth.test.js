import test from 'node:test'
import assert from 'node:assert/strict'
import { getGrowthStage } from './gardenGrowth.js'

test('sunflower growth stages follow elapsed time', () => {
  const plantedAt = 1_000_000
  assert.equal(getGrowthStage(plantedAt, plantedAt), 'seed')
  assert.equal(getGrowthStage(plantedAt, plantedAt + 59_999), 'seed')
  assert.equal(getGrowthStage(plantedAt, plantedAt + 60_000), 'sprout')
  assert.equal(getGrowthStage(plantedAt, plantedAt + 60 * 60_000), 'bud')
  assert.equal(getGrowthStage(plantedAt, plantedAt + 24 * 60 * 60_000), 'bloom')
})

test('a clock earlier than planting does not make growth negative', () => {
  assert.equal(getGrowthStage(10_000, 5_000), 'seed')
})
