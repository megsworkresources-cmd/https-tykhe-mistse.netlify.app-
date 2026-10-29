import { useState } from 'react'
import Playroom from './Playroom'
import SunflowerGarden from './SunflowerGarden'

const features = [
  {
    icon: '🌿',
    title: 'Спокійна перевірка',
    text: 'Діти можуть позначити, як себе почувають, без натиску на оцінку або “правильну” відповідь.',
    tone: 'peach',
    index: '01'
  },
  {
    icon: '🫧',
    title: 'Легкі вправи',
    text: 'Короткі, м’які практики для повернення до тіла, уваги та відчуття безпеки.',
    tone: 'sage',
    index: '02'
  },
  {
    icon: '✨',
    title: 'Підтримка без тиску',
    text: 'Взаємодія побудована на виборі, паузі та уважності — без обіцянок, які не можна виконати.',
    tone: 'yellow',
    index: '03'
  }
]

const steps = [
  {
    number: '01',
    heading: 'Зупинись',
    text: 'Обери свій рівень спокою або попроси паузу. Нічого не потрібно “виправляти”.'
  },
  {
    number: '02',
    heading: 'Почни маленько',
    text: 'Просте дихання, відчуття ноги на підлозі або короткий погляд на навколишній простір.'
  },
  {
    number: '03',
    heading: 'Повернись до себе',
    text: 'Можна продовжити вправу або просто відпочити і спробувати ще раз пізніше.'
  }
]

const faq = [
  {
    q: 'Чи це замінює допомогу дорослого?',
    a: 'Ні. Це інструмент підтримки, а не заміна професійної допомоги або більш глибокого контакту з дорослим.'
  },
  {
    q: 'Чи можна використовувати без реєстрації?',
    a: 'Так. Для цієї версії немає облікового запису, входу або зберігання особистих даних.'
  },
  {
    q: 'Що робити, якщо дитині важко?',
    a: 'Можна перейти до сторінки “Допомога зараз” і звернутися до дорослого або довіреної людини.'
  }
]

const worldCards = [
  {
    title: 'Будиночок, який ти носиш із собою',
    text: 'Уявний простір безпеки, який можна відновлювати в будь-який момент.',
    image: '/artwork/house-you-carry.svg'
  },
  {
    title: 'Думка, що розплутується',
    text: 'Легкі метафори для відчуття, що думки можуть змінюватись і не бути “вічними”.',
    image: '/artwork/thought-thread.svg'
  },
  {
    title: 'Сходи, що слухають',
    text: 'Ритм тіла і вміння повільно збирати увагу без надмірного навантаження.',
    image: '/artwork/listening-staircase.svg'
  },
  {
    title: 'Камінчик має що сказати',
    text: 'Тихе спостереження за навколишнім світом, щоб відчути присутність і стабільність.',
    image: '/artwork/pebble-listener.svg'
  }
]

const watchClips = [
  { title: 'Хмари, що пливуть', category: 'НЕБО', description: 'Дивись на хмари. Уяви, на що вони схожі.', symbol: '☁️', scene: 'clouds' },
  { title: 'Тихий зелений світ', category: 'САД', description: 'Знайди квітку, листочок або промінчик сонця.', symbol: '🌿', scene: 'garden' },
  { title: 'Вода в русі', category: 'ВОДА', description: 'Стеж очима за хвильками. Нічого не треба робити.', symbol: '〰️', scene: 'water' },
  { title: 'Маленький всесвіт', category: 'ЗІРКИ', description: 'Уяви, що зірки тихенько мерехтять для тебе.', symbol: '✨', scene: 'space' }
]

const navItems = [
  'Головна',
  'Ігри',
  'Сад соняшників',
  'Активності',
  'Відеосвіти',
  'Перевірка',
  'Допомога',
  'Ресурси',
  'Для дорослих',
  'Про проект'
]

const sectionMap = {
  Головна: 'home',
  Ігри: 'playroom',
  'Сад соняшників': 'garden',
  Активності: 'activities',
  Відеосвіти: 'watch',
  Перевірка: 'check-in',
  Допомога: 'resources',
  Ресурси: 'resources',
  'Для дорослих': 'adults',
  'Про проект': 'about'
}

function App() {
  const [activeNav, setActiveNav] = useState('Головна')
  const [menuOpen, setMenuOpen] = useState(false)
  const [feeling, setFeeling] = useState('')
  const [activeTool, setActiveTool] = useState('draw')
  const [exerciseStep, setExerciseStep] = useState(0)
  const [selectedSkill, setSelectedSkill] = useState('')
  const [brushColor, setBrushColor] = useState('#416b4c')
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showVisuals, setShowVisuals] = useState(true)
  const [activeWatch, setActiveWatch] = useState(0)
  const [watchFocus, setWatchFocus] = useState(false)

  const scrollToSection = (sectionId) => {
    // "Ігри" was previously mapped to an element ID that does not exist in
    // the rendered app. Send it to the actual interactive activities section.
    const targetAliases = {
      playroom: 'skills',
      hero: 'home',
      help: 'resources'
    }
    const targetId = targetAliases[sectionId] || sectionId
    const pageForSection = {
      home: 'Головна',
      'check-in': 'Перевірка',
      skills: 'Активності',
      activities: 'Активності',
      garden: 'Сад соняшників',
      watch: 'Відеосвіти',
      resources: 'Допомога',
      adults: 'Для дорослих',
      about: 'Про проект'
    }
    const target = document.getElementById(targetId)
    setActiveNav(pageForSection[targetId] || 'Головна')
    setMenuOpen(false)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Keep the action useful if a future link points to a removed section.
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavClick = (label) => {
    setActiveNav(label)
    const sectionId = sectionMap[label]
    if (sectionId) {
      scrollToSection(sectionId)
    }
  }

  const startDrawing = (event) => {
    const canvas = event.currentTarget
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.beginPath()
    ctx.moveTo((event.clientX - rect.left) * (canvas.width / rect.width), (event.clientY - rect.top) * (canvas.height / rect.height))
    setIsDrawing(true)
  }
  const draw = (event) => {
    if (!isDrawing) return
    const canvas = event.currentTarget
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = brushColor
    ctx.lineWidth = brushSize
    ctx.lineTo((event.clientX - rect.left) * (canvas.width / rect.width), (event.clientY - rect.top) * (canvas.height / rect.height))
    ctx.stroke()
  }
  const stopDrawing = (event) => { setIsDrawing(false); if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId) }
  const clearDrawing = () => {
    const canvas = document.getElementById('drawing-canvas')
    if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div id="home">
      <div className="top-note">
        <span className="sun-dot">✦</span>
        <span>Тихе місце — український дитячий простір підтримки</span>
        <div className="top-lang"><span className="language-label" aria-label="Мова інтерфейсу">UA · Українська</span></div>
      </div>

      <header className="header">
        <button type="button" className="brand" aria-label="Головна" onClick={() => handleNavClick('Головна')}>
          <span className="brand-mark">✦</span>
          <span>
            Тихе <span className="brand-light">місце</span>
            <small>з підтримкою</small>
          </span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Основна навігація" id="primary-navigation">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={activeNav === item ? 'nav-active' : ''}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="head-actions">
          <button type="button" className="help-pill" onClick={() => scrollToSection('resources')}>
            <span>🫶</span>
            Допомога зараз
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      <main className={`app-page app-page-${sectionMap[activeNav] || "home"}`} aria-label={activeNav}>
        <section className="hero wrap" id="hero">
          <div className="hero-copy">
            <h1>
              Тихе <em>місце</em> для спокою й відновлення.
            </h1>

            <p className="hero-desc">
              Простір, де дитина може зупинитися, зібратись, обрати потрібну ритмічну активність
              та відчути себе в безпеці — без тиску, нав’язливих сигналів і складних правил.
            </p>

            <div className="hero-eyebrow-after-title" aria-label="М’яка підтримка для дітей">
              <span aria-hidden="true">✦</span>
              <span>М’яка підтримка для дітей</span>
            </div>

            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('check-in')}>
                Почати
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => { setActiveTool('draw'); scrollToSection('skills') }}>
                Подивитись активності
              </button>
            </div>

            <div className="trust-line">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L14.8 6.7L20 7.5L16.3 11.1L17.2 16.3L12 13.8L6.8 16.3L7.7 11.1L4 7.5L9.2 6.7L12 2Z" fill="currentColor"/>
              </svg>
              <span>Дружній, безпечний, український формат</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Ілюстрація світу">
            <div className="art-sun"><span>☼</span></div>
            <div className="art-cloud cloud-one" />
            <div className="art-cloud cloud-two" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="art-flower flower-a">✿</div>
            <div className="art-flower flower-b">✦</div>
            <div className="art-stone stone-a" />
            <div className="art-leaf">❀</div>
            <div className="art-caption">Світ підтримки й спокою</div>
          </div>

          <div className="hero-spark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 1.5L14.4 8.1L21 10.5L14.4 12.9L12 19.5L9.6 12.9L3 10.5L9.6 8.1L12 1.5Z" fill="currentColor" />
            </svg>
            <span>Можна почати з одного глибокого вдиху.</span>
          </div>
        </section>

        <div className="feeling-strip" id="check-in">
          <div className="wrap strip-inner">
            <span>Як ти себе почуваєш зараз?</span>
            {['Спокійно','Тривожно','Збуджено','Сумно','Злюся','Не знаю'].map((item) => <button type="button" key={item} className={feeling === item ? 'feeling-word feeling-selected' : 'feeling-word'} onClick={() => setFeeling(item)}>{item}</button>)}
            {feeling && <p className="feeling-response" role="status">Дякую, що поділився/поділилася. Не потрібно нічого змінювати просто зараз. Ти обрав/обрала: {feeling.toLowerCase()}.</p>}
          </div>
        </div>

        <Playroom />

        <SunflowerGarden />

        <section className="section wrap" id="activities">
          <div className="section-heading">
            <h2>Що тут є</h2>
            <p>Невеликий і чіткий набір інструментів підтримки — без складних правил і без зайвого тиску.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.index} className="feature-card">
                <div className={`feature-icon ${feature.tone}`}>{feature.icon}</div>
                <div className="card-index">{feature.index}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <button type="button" className="text-link" onClick={() => { setActiveTool(feature.index === '01' ? 'draw' : feature.index === '02' ? 'exercise' : 'skills'); scrollToSection('skills') }}>
                  Спробувати <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

 
        <section className="section wrap interactive-section" id="skills">
          <div className="section-heading"><h2>Що хочеш спробувати?</h2><p>Обери картку. Можна малювати, вчитися або зробити маленьку вправу.</p></div>
          <div className="tool-tabs" role="tablist" aria-label="Активності">
            <button type="button" className={activeTool === 'draw' ? 'tool-tab selected' : 'tool-tab'} onClick={() => setActiveTool('draw')}>🎨 Малювання</button>
            <button type="button" className={activeTool === 'skills' ? 'tool-tab selected' : 'tool-tab'} onClick={() => setActiveTool('skills')}>🌱 Навички</button>
            <button type="button" className={activeTool === 'exercise' ? 'tool-tab selected' : 'tool-tab'} onClick={() => setActiveTool('exercise')}>🫧 Вправи</button>
          </div>
          <div className="visuals-toggle-row"><span>Малюнки-підказки</span><button type="button" className="visual-toggle" aria-pressed={showVisuals} onClick={() => setShowVisuals(v => !v)}>{showVisuals ? 'Сховати малюнки' : 'Показати малюнки'} <span aria-hidden="true">{showVisuals ? '◌' : '✦'}</span></button></div>
          {activeTool === 'draw' && <div className="interactive-panel">
            {showVisuals && <div className="motion-scene scene-doodle" role="img" aria-label="Кольорові кола та зірочки"><span className="scene-orbit orbit-one"/><span className="scene-orbit orbit-two"/><span className="scene-orb">✦</span><span className="scene-caption">Намалюй те, що відчуваєш</span></div>}
            <h3>Намалюй те, що відчуваєш</h3><p>Малюй пальцем на екрані або мишкою. Тут немає правильного чи неправильного малюнка.</p>
            <div className="drawing-controls"><label>Колір <input aria-label="Колір пензля" type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} /></label><label>Розмір <input aria-label="Розмір пензля" type="range" min="2" max="20" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} /></label><button className="btn btn-quiet" type="button" onClick={clearDrawing}>Очистити малюнок</button></div>
            <canvas id="drawing-canvas" width="1000" height="420" aria-label="Полотно для малювання" onPointerDown={(e) => {e.currentTarget.setPointerCapture(e.pointerId); startDrawing(e)}} onPointerMove={draw} onPointerUp={stopDrawing} onPointerCancel={stopDrawing} />
          </div>}
          {activeTool === 'skills' && <div className="interactive-panel">{showVisuals && <div className="motion-scene scene-garden" role="img" aria-label="Сад із сонцем і квіткою"><span className="garden-sun"/><span className="garden-hill hill-a"/><span className="garden-hill hill-b"/><span className="garden-flower">✿</span><span className="scene-caption">Обирай те, що підходить саме зараз</span></div>}<h3>Маленькі речі, що можуть допомогти</h3><p>Обери одну картку й спробуй, якщо хочеш.</p><div className="skill-grid">
            {[['Заземлення','Відчуй обидві стопи. Знайди навколо себе три речі, які бачиш.'],['Назвати емоцію','Скажи: «Зараз я відчуваю…». Можна не пояснювати чому.'],['М’яка пауза','Розтисни зуби й трохи опусти плечі, якщо так зручно.'],['Попросити допомогу','Скажи дорослому: «Мені важко. Побудь зі мною, будь ласка».']].map(([title,body]) => <button key={title} type="button" className={selectedSkill === title ? 'skill-card chosen' : 'skill-card'} onClick={() => setSelectedSkill(title)}><strong>{title}</strong><span>{body}</span></button>)}
          </div>{selectedSkill && <p className="success-note" role="status">Твій вибір: {selectedSkill}. Можна спробувати зараз або повернутися пізніше.</p>}</div>}
          {activeTool === 'exercise' && <div className="interactive-panel exercise-panel">{showVisuals && <div className={`motion-scene scene-breath scene-step-${exerciseStep}`} role="img" aria-label="Малюнок-підказка до вправи"><span className="body-visual" aria-hidden="true">{['🦶','👀','🙆','🌬️'][exerciseStep]}</span><span className="breath-ring ring-back"/><span className="breath-ring ring-front"/><span className="breath-core">{['Опора','Увага','Відпусти','Видих'][exerciseStep]}</span><span className="scene-caption">Рухайся у своєму темпі</span></div>}<span className="exercise-count">ВПРАВА {exerciseStep + 1} З 4</span><h3>{[['Відчуй ноги','Якщо зручно, постав обидві ноги на підлогу. Відчуй, як підлога тримає їх.'],['Подивись навколо','Знайди одну річ навколо. Якого вона кольору? Якої форми?'],['Плечі відпочивають','Якщо хочеш, підніми плечі до вух. А тепер повільно опусти їх.'],['Повільний видих','Дихай як завжди. Спробуй видихнути повільно. Не треба затримувати подих.']][exerciseStep][0]}</h3><p>{[['Відчуй опору','Постав стопи на підлогу, якщо це зручно. Поміть, як поверхня підтримує тебе.'],['Поміть навколо','Знайди очима одну річ спокійного кольору. Роздивись її форму.'],['Плечі відпочивають','Якщо комфортно, підніми плечі до вух на мить, а потім м’яко відпусти.'],['Видих без зусиль','Зроби звичайний вдих і дозволь видиху бути трохи довшим. Не затримуй дихання.']][exerciseStep][1]}</p><div className="exercise-actions"><button type="button" className="btn btn-quiet" onClick={() => setExerciseStep((step) => Math.max(0, step - 1))} disabled={exerciseStep === 0}>Назад</button><button type="button" className="btn btn-primary" onClick={() => setExerciseStep((step) => (step + 1) % 4)}>{exerciseStep === 3 ? 'Почати знову' : 'Наступний крок →'}</button></div><p className="gentle-note">Зупинись або пропусти будь-яку дію, якщо вона тобі не підходить.</p></div>}
        </section>
        <section className="quote-band">
          <div className="quote-mark">“</div>
          <p>Не все треба виправляти одразу. Достатньо лише на мить відчути себе в безпеці.</p>
          <span>— філософія Тихого місця</span>
          <div className="quote-flower">✿</div>
        </section>

        <section className="watch-section" id="watch">
          <div className="wrap">
            <div className="section-heading watch-heading">
              <div><div className="page-eyebrow"><span>ВІЗУАЛЬНА ПЕРЕРВА</span></div><h2>Місце, де можна <em>загубитися у спокої</em></h2></div>
              <p>Обери малюнок і трохи відпочинь. Натисни на іншу картку, щоб побачити інший світ.</p>
            </div>
            <div className={watchFocus ? 'watch-experience focus-mode' : 'watch-experience'}>
              <div className={`illustrated-world world-${watchClips[activeWatch]?.scene || 'clouds'}`} aria-label={watchClips[activeWatch]?.title || 'Тихий ілюстрований світ'}>
                <div className="world-art" aria-hidden="true">
                  <span className="world-sun">☼</span>
                  <span className="world-cloud">☁</span>
                  <span className="world-water">〰 〰 〰 〰 〰</span>
                  <span className="world-flower">✿</span>
                  <span className="world-moon">☾</span>
                  <span className="world-stars">✦ · ✧ · ✦</span>
                  <span className="world-hill world-hill-one" />
                  <span className="world-hill world-hill-two" />
                  <span className="body-visual">{watchClips[activeWatch]?.symbol || '☁️'}</span>
                </div>
                <div className="watch-player-caption">
                  <span>{watchClips[activeWatch]?.symbol} {watchClips[activeWatch]?.category}</span>
                  <strong>{watchClips[activeWatch]?.title}</strong>
                  <p>{watchClips[activeWatch]?.description}</p>
                </div>
                <button type="button" className="watch-focus-toggle" aria-pressed={watchFocus} onClick={() => setWatchFocus(v => !v)}>{watchFocus ? 'Повернути меню' : 'Збільшити світ'} <span aria-hidden="true">{watchFocus ? '↙' : '↗'}</span></button>
              </div>
              <div className="watch-world-options" role="group" aria-label="Обрати ілюстрований світ">
                {watchClips.map((clip, index) => (
                  <button type="button" key={clip.scene} className={activeWatch === index ? 'watch-world-option selected' : 'watch-world-option'} aria-pressed={activeWatch === index} onClick={() => setActiveWatch(index)}>
                    <span aria-hidden="true">{clip.symbol}</span>
                    <strong>{clip.title}</strong>
                    <small>{clip.category}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="watch-reminder"><span aria-hidden="true">✦</span> Ці рухомі ілюстрації працюють без зовнішнього відеофайлу, тому не залежать від стороннього відеосервера. Обери інший світ або збільш його; рух можна вимкнути в налаштуваннях пристрою.</div>
        </section>

        <section className="resources-section" id="resources">
          <div className="wrap">
            <div className="section-heading resources-heading">
              <div>
                <div className="page-eyebrow"><span>Перевірені джерела підтримки</span></div>
                <h2>Допомога дітям та родинам України</h2>
              </div>
              <p>Якщо потрібна підтримка поза цим простором, ці організації працюють із дітьми та родинами, які постраждали від війни, переміщення, втрати або інших складних обставин.</p>
            </div>
            <div className="resources-notice">
              <strong>Потрібна допомога просто зараз?</strong>
              <p>Якщо дитина в безпосередній небезпеці, зверніться до місцевих екстрених служб або до надійного дорослого поруч. Телефонні лінії та доступність можуть змінюватися — перевіряйте актуальні умови на офіційних сайтах. Якщо ви за межами України, уточніть, чи доступні українські номери з вашої країни.</p>
              <a className="resource-urgent-link" href="https://la-strada.org.ua/en/kontakty" target="_blank" rel="noreferrer">Контакти дитячої гарячої лінії La Strada-Україна <span aria-hidden="true">↗</span></a>
            </div>
            <div className="resources-grid">
              <article className="resource-card resource-featured">
                <span className="resource-category">Психологічна підтримка</span>
                <h3>Голоси дітей · Voices of Children</h3>
                <p>Український фонд, що надає дітям і батькам психологічну та психосоціальну підтримку, зокрема індивідуальні й групові консультації, арттерапію та допомогу через регіональні центри.</p>
                <p className="resource-contact"><strong>Телефон підтримки в Україні:</strong> 0 800 210 106. На офіційному сайті вказані години роботи та онлайн-канали.</p>
                <a href="https://voices.org.ua/en" target="_blank" rel="noreferrer">Відкрити сайт і способи звернення <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Захист дітей · консультації</span>
                <h3>La Strada-Україна</h3>
                <p>Національна дитяча та молодіжна гаряча лінія; консультації щодо прав дитини, насильства, експлуатації та складних життєвих ситуацій. На сайті є телефонні й онлайн-канали зв’язку.</p>
                <p className="resource-contact"><strong>Номери в Україні:</strong> 0 800 500 225 або 116 111. Перевірте актуальні години й доступність на офіційній сторінці.</p>
                <a href="https://la-strada.org.ua/en/kontakty" target="_blank" rel="noreferrer">Контакти та канали звернення <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Гуманітарна допомога · освіта · здоров’я</span>
                <h3>UNICEF Україна</h3>
                <p>Підтримка дітей і родин у сфері захисту дітей, освіти, охорони здоров’я, психосоціальної допомоги, води та санітарії. Програми доступні в Україні й через партнерів у країнах, що приймають українських біженців.</p>
                <a href="https://www.unicef.org/ukraine/en/what-we-do" target="_blank" rel="noreferrer">Програми UNICEF в Україні <span aria-hidden="true">↗</span></a>
                <a className="resource-secondary-link" href="https://www.unicef.org/ukraine/en/spilno-social-support" target="_blank" rel="noreferrer">Програма соціальної підтримки «Спільно» <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Безпека · навчання · психічне здоров’я</span>
                <h3>Save the Children</h3>
                <p>Допомагає дітям і родинам, постраждалим від війни, зокрема через безпечні простори для дітей, доступ до освіти, психосоціальну підтримку та базову гуманітарну допомогу.</p>
                <a href="https://www.savethechildren.net/ukraine" target="_blank" rel="noreferrer">Програми в Україні <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Сімейна підтримка · альтернативний догляд</span>
                <h3>SOS Дитячі Містечка Україна</h3>
                <p>Підтримує вразливі родини, щоб діти могли залишатися в безпечному сімейному середовищі, а також допомагає дітям без батьківського піклування та молоді, яка виходить із системи догляду.</p>
                <a href="https://en.sos-ukraine.org/" target="_blank" rel="noreferrer">Послуги та програми <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Евакуація · відновлення · возз’єднання</span>
                <h3>Save Ukraine</h3>
                <p>Українська організація, що працює з дітьми та родинами, яких потрібно евакуювати або повернути в безпечне середовище; надає підтримку з житлом, відновленням, освітою та юридичними питаннями.</p>
                <a href="https://saveukraine.org/" target="_blank" rel="noreferrer">Дізнатися про допомогу <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Психологічна допомога батькам і дітям</span>
                <h3>Important</h3>
                <p>Українська неприбуткова організація, що організовує психологічну підтримку для дітей і батьків, чиє життя постраждало від війни, зокрема групи підтримки.</p>
                <a href="https://important.org.ua/en" target="_blank" rel="noreferrer">Дізнатися про підтримку <span aria-hidden="true">↗</span></a>
              </article>
              <article className="resource-card">
                <span className="resource-category">Поради та контакти державних служб</span>
                <h3>«Дитина не сама»</h3>
                <p>Офіційний державний ресурс України з порадами й контактами служб щодо захисту дітей, зокрема в питаннях порушення прав, насильства та інших небезпечних ситуацій.</p>
                <a href="https://dity.msp.gov.ua/eng/useful-tips" target="_blank" rel="noreferrer">Поради й контакти служб <span aria-hidden="true">↗</span></a>
              </article>
            </div>
            <p className="resources-footnote">Цей перелік — відправна точка, а не гарантія доступності послуг у кожному регіоні. Перевіряйте територію роботи, мову, вікові критерії, вартість і актуальність контактів безпосередньо в організації. Цей сайт не є службою екстреної допомоги й не замінює фахову оцінку потреб дитини.</p>
          </div>
        </section>

        <section className="faq-section" id="help">
          <div className="wrap faq-wrap">
            <div>
              <div className="page-eyebrow">
                <span>Часті питання</span>
              </div>
              <h2>Питання і відповіді</h2>
            </div>

            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap final-cta">
          <div>
            <div className="page-eyebrow">
              <span>Готовність до наступного кроку</span>
            </div>
            <h2>Почніть із малого — з одного спокійного моменту.</h2>
            <p>Обери коротку вправу, потренуй навичку або малюй у власному темпі. Будь-яку активність можна пропустити.</p>
          </div>
          <div className="final-sun">☼</div>
          <button type="button" className="btn btn-dark" onClick={() => scrollToSection('resources')}>
            Знайти підтримку
          </button>
        </section>

        <section className="world-section wrap" id="about">
          <div className="section-heading">
            <h2>Ілюстрований світ</h2>
            <p>Невеликі образи, які допомагають дитині відчути різні типи спокою, підтримки й уваги.</p>
          </div>

          <div className="world-grid">
            {worldCards.map((card) => (
              <article className="world-card" key={card.title} role="button" tabIndex={0} aria-label={'Відкрити відеосвіт: ' + card.title} onClick={() => { setActiveWatch(worldCards.indexOf(card)); scrollToSection('watch') }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setActiveWatch(worldCards.indexOf(card)); scrollToSection('watch') } }}>
                <img src={card.image} alt={card.title} />
                <div>
                  <span>ІЛЮСТРАЦІЯ</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="world-note">
            Кожна ілюстрація призначена для м’якої візуальної підтримки, а не для нав’язливого
            або драматичного контенту. Вони створені, щоб заспокоїти, а не перевантажити.
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="brand">
            <span className="brand-mark">✦</span>
            <span>
              Тихе <span className="brand-light">місце</span>
            </span>
          </div>
          <p>
            Простір підтримки для дітей, де важливі спокій, безпечність, ясність і можливість зупинитися.
          </p>
        </div>

        <div className="footer-links">
          <strong>Навігація</strong>
          <button type="button" onClick={() => handleNavClick('Головна')}>Головна</button>
          <button type="button" onClick={() => handleNavClick('Активності')}>Активності</button>
          <button type="button" onClick={() => handleNavClick('Допомога')}>Допомога</button>
          <button type="button" onClick={() => scrollToSection('resources')}>Контакт</button>
        </div>

        <div className="footer-links">
          <strong>Політики</strong>
          <button type="button" onClick={() => scrollToSection('resources')}>Безпека та допомога</button>
          <button type="button" onClick={() => scrollToSection('about')}>Про ілюстрації</button>
          <button type="button" onClick={() => handleNavClick('Про проект')}>Про проект</button>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Тихе місце</span>
          <span>Простір підтримки · українська версія</span>
        </div>
      </footer>

      <button type="button" className="floating-help" onClick={() => scrollToSection('resources')}>
        <span>🫶</span> Допомога зараз
      </button>
    </div>
  )
}

export default App
