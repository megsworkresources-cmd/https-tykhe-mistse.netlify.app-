import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from './convex/_generated/api'
import { getGrowthStage } from './gardenGrowth'

const STAGES = {
  seed: { icon: '🌰', name: 'Насінинка', message: 'Усе велике починається з малого.' },
  sprout: { icon: '🌱', name: 'Паросток', message: 'Твій соняшник потроху тягнеться до світла.' },
  bud: { icon: '🌿', name: 'Бутон', message: 'Зміни відбуваються у власному темпі.' },
  bloom: { icon: '🌻', name: 'Квітка', message: 'Твій соняшник розквітнув. Дякуємо, що ти тут.' },
}

function createDeviceKey() {
  return window.crypto?.randomUUID?.() || `device-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`
}

function getDeviceKey() {
  const storageKey = 'tykhe-mistse-sunflower-device-v1'
  try {
    const existing = window.localStorage.getItem(storageKey)
    if (existing) return existing
    const key = createDeviceKey()
    try {
      window.localStorage.setItem(storageKey, key)
    } catch {
      // Keep the garden usable for this visit when browser storage is blocked.
    }
    return key
  } catch {
    // Some private browsing modes or device policies block localStorage entirely.
    return createDeviceKey()
  }
}

function readLocalPlantedAt() {
  try {
    const stored = window.localStorage.getItem('tykhe-mistse-local-sunflower-v1')
    if (!stored) return null
    const timestamp = Number(stored)
    return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null
  } catch {
    return null
  }
}

function LocalGarden() {
  const [now, setNow] = useState(() => Date.now())
  const [storageWarning, setStorageWarning] = useState(false)
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])
  const [plantedAt, setPlantedAt] = useState(readLocalPlantedAt)
  const plant = () => {
    const next = Date.now()
    try {
      window.localStorage.setItem('tykhe-mistse-local-sunflower-v1', String(next))
      setStorageWarning(false)
    } catch {
      setStorageWarning(true)
    }
    setPlantedAt(next)
  }
  const stage = plantedAt ? getGrowthStage(plantedAt, now) : null
  return (
    <section className="sunflower-section" id="garden" aria-labelledby="sunflower-title">
      <div className="wrap sunflower-wrap">
        <div className="sunflower-heading">
          <span className="sunflower-kicker">НАШ СПІЛЬНИЙ СИМВОЛ НАДІЇ</span>
          <h2 id="sunflower-title">Сад соняшників</h2>
          <p>Посади маленький соняшник. Він ростиме з часом — у твоєму темпі.</p>
        </div>
        <div className="sunflower-card">
          <div className="sunflower-illustration" aria-hidden="true"><span>{stage ? STAGES[stage].icon : '🌻'}</span><i>☀️</i><b>💛</b></div>
          <div className="sunflower-copy">
            <h3>{stage ? STAGES[stage].name : 'Тут може початися твоя квітка'}</h3>
            <p>{stage ? STAGES[stage].message : 'Один дотик — і ти посадиш соняшник, який може залишитися на цьому пристрої.'}</p>
            {stage && <p className="sunflower-stage-note">Наступний етап прийде з часом. Не потрібно нічого робити швидше.</p>}
            <button type="button" className="sunflower-button" onClick={plant}>{plantedAt ? 'Посадити заново' : 'Посадити соняшник'}</button>
            {storageWarning && <p className="sunflower-status" role="status">Квітка з’явилася, але браузер не дозволив зберегти її. Якщо оновити сторінку, вона може зникнути.</p>}
          </div>
        </div>
        <p className="sunflower-privacy">У режимі без сервера квітка зберігається на цьому пристрої, якщо браузер дозволяє збереження. Спільний сад з’явиться після підключення сервера.</p>
      </div>
    </section>
  )
}

function ConnectedGarden() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(timer)
  }, [])
  const [deviceKey] = useState(getDeviceKey)
  const flowers = useQuery(api.garden.listCommunity, {})
  const myFlower = useQuery(api.garden.getMyFlower, { deviceKey })
  const plantFlower = useMutation(api.garden.plantFlower)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function plant() {
    setBusy(true)
    setMessage('')
    try {
      await plantFlower({ deviceKey })
      setMessage(myFlower ? 'Твій соняшник починає новий цикл росту.' : 'Твій соняшник посаджено.')
    } catch {
      setMessage('Не вдалося зберегти квітку. Перевір з’єднання й спробуй ще раз.')
    } finally {
      setBusy(false)
    }
  }

  const myStage = myFlower ? STAGES[getGrowthStage(myFlower.plantedAt, now)] : null
  return (
    <section className="sunflower-section" id="garden" aria-labelledby="sunflower-title">
      <div className="wrap sunflower-wrap">
        <div className="sunflower-heading">
          <span className="sunflower-kicker">НАШ СПІЛЬНИЙ СИМВОЛ НАДІЇ</span>
          <h2 id="sunflower-title">Сад соняшників</h2>
          <p>Кожна квітка — маленький знак, що ми поруч. Соняшники ростуть із часом, а сад оновлюється наживо.</p>
        </div>
        <div className="sunflower-card">
          <div className="sunflower-illustration" aria-hidden="true"><span>{myStage ? myStage.icon : '🌻'}</span><i>☀️</i><b>💛</b></div>
          <div className="sunflower-copy">
            <h3>{myStage ? `Твій соняшник: ${myStage.name.toLowerCase()}` : 'Посади свій соняшник'}</h3>
            <p>{myStage ? myStage.message : 'Натисни кнопку, щоб додати квітку до спільного саду.'}</p>
            {myStage && <p className="sunflower-stage-note">Етап зміниться автоматично з часом: насінинка, паросток, бутон і квітка.</p>}
            <button type="button" className="sunflower-button" onClick={plant} disabled={busy}>{busy ? 'Зберігаємо…' : myFlower ? 'Почати ріст заново' : 'Посадити соняшник'}</button>
            {message && <p className="sunflower-status" role="status">{message}</p>}
          </div>
        </div>
        <div className="community-garden-heading">
          <h3>Квіти, які ростуть разом</h3>
          <span>{flowers === undefined ? 'Завантажуємо сад…' : `${flowers.length} ${flowers.length === 1 ? 'соняшник' : flowers.length < 5 ? 'соняшники' : 'соняшників'}`}</span>
        </div>
        {flowers === undefined ? (
          <div className="community-garden-loading" role="status">Сад прокидається…</div>
        ) : flowers.length === 0 ? (
          <div className="community-garden-empty"><span aria-hidden="true">🌱</span><p>Тут є місце для першої квітки. Посади свою, коли будеш готовий/готова.</p></div>
        ) : (
          <div className="community-garden-grid" aria-label="Спільний сад соняшників">
            {flowers.map((flower, index) => {
              const stageKey = getGrowthStage(flower.plantedAt, now)
              const stage = STAGES[stageKey]
              return <div className={`community-flower community-flower-${stageKey}`} key={`${flower.plantedAt}-${index}`} title={stage.name} aria-label={stage.name}><span aria-hidden="true">{stage.icon}</span></div>
            })}
          </div>
        )}
        <p className="sunflower-privacy">Без імен, фото, повідомлень чи облікових записів. Спільний сад показує лише квіти та їхні етапи росту.</p>
      </div>
    </section>
  )
}

export default function SunflowerGarden() {
  return import.meta.env.VITE_CONVEX_URL ? <ConnectedGarden /> : <LocalGarden />
}
