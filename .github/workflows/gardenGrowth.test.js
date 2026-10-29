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

test('invalid planting timestamps never show a fully grown flower', () => {
  assert.equal(getGrowthStage(Number.NaN, 100_000_000), 'seed')
  assert.equal(getGrowthStage(Number.POSITIVE_INFINITY, 100_000_000), 'seed')
  assert.equal(getGrowthStage(0, 100_000_000), 'seed')
  assert.equal(getGrowthStage(-1, 100_000_000), 'seed')
})

test('invalid current time falls back to the seed stage', () => {
  assert.equal(getGrowthStage(1_000, Number.NaN), 'seed')
})
