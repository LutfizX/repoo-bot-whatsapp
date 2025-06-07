import makeWASocket, { DisconnectReason, fetchLatestBaileysVersion, useSingleFileAuthState } from '@adiwajshing/baileys'
import pino from 'pino'
import { fileURLToPath } from 'url'
import path from 'path'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function startBot() {
  const { version } = await fetchLatestBaileysVersion()

  // Input pairing code
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const pairingCode = await new Promise(resolve => {
    rl.question('Masukkan pairing code: ', answer => {
      rl.close()
      resolve(answer.trim())
    })
  })

  const validPairingCode = 'LUTF-IZX1'
  if (pairingCode !== validPairingCode) {
    console.log('Pairing code salah. Bot dihentikan.')
    process.exit(1)
  }

  // Lokasi file auth sesuai pairing code
  const authFile = path.join(__dirname, `auth_${pairingCode}.json`)
  const { state, saveState } = useSingleFileAuthState(authFile)

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' }),
  })

  sock.ev.on('creds.update', saveState)

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      console.log('Scan QR code dengan WhatsApp kamu untuk login.')
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('Koneksi terputus, reconnect?', shouldReconnect)
      if (shouldReconnect) startBot()
      else {
        console.log('Logged out. Silakan login ulang dengan scan QR.')
        process.exit()
      }
    } else if (connection === 'open') {
      console.log('Bot sudah tersambung ke WhatsApp!')
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const from = msg.key.remoteJid
    const text = msg.message.conversation || (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) || ''

    if (text.toLowerCase() === '.ping') {
      await sock.sendMessage(from, { text: 'Bagus bang' })
    }

    if (text.toLowerCase() === '.listgc') {
      await sock.sendMessage(from, {
        image: { url: 'https://files.catbox.moe/hmxaf5.jpg' },
        caption: '📢𝙇𝙄𝙎𝙏 𝙋𝙍𝙊𝘿𝙐𝙆 𝙇𝙐𝙏𝙁𝙄𝙕𝙓📢

`𝘽𝙊𝙏 𝙋𝙐𝙎𝙃𝙆𝙊𝙉𝙏𝘼𝙆`
*1 𝙃𝘼𝙍𝙄 = 2𝙆*
*5 𝙃𝘼𝙍𝙄 = 4𝙆*
*1 𝙈𝙄𝙉𝙂𝙂𝙐 = 5𝙆*
*3 𝙈𝙄𝙉𝙂𝙂𝙐 = 10𝙆*
*5 𝙈𝙄𝙉𝙂𝙂𝙐 = 15𝙆*
*1 𝘽𝙐𝙇𝘼𝙉 = 30𝙆*
*2 𝘽𝙐𝙇𝘼𝙉 = 35𝙆*
*3 𝘽𝙐𝙇𝘼𝙉 = 40𝙆*

`𝘽𝙊𝙏 𝘽𝙐𝙂`
*1 𝙃𝘼𝙍𝙄 = 3𝙆*
*5 𝙃𝘼𝙍𝙄 = 6𝙆*
*7 𝙃𝘼𝙍𝙄 = 10𝙆*
*8 𝙃𝘼𝙍𝙄 = 15𝙆*
*10 𝙃𝘼𝙍𝙄 = 20𝙆*
*15 𝙃𝘼𝙍𝙄 = 30𝙆*

`𝘽𝙊𝙏 𝙈𝘿/𝙅𝘼𝙂𝘼 𝙂𝙍𝙐𝘽`
*1 𝙃𝘼𝙍𝙄 = 2𝙆*
*5 𝙃𝘼𝙍𝙄 = 4𝙆*
*7 𝙃𝘼𝙍𝙄= 7𝙆*
*8 𝙃𝘼𝙍𝙄 = 8𝙆*
*9 𝙃𝘼𝙍𝙄 = 9𝙆*
*10 𝙃𝘼𝙍𝙄 = 10𝙆*
*11 𝙃𝘼𝙍𝙄 = 11𝙆*
*12 𝙃𝘼𝙍𝙐 = 12𝙆*

`𝙇𝙄𝙎𝙏 𝙋𝘼𝙉𝙀𝙇 1𝙂𝘽-𝙐𝙉𝙇𝙄`
📡 *𝙋𝙖𝙣𝙚𝙡 1𝙜𝙗 = 1𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 2𝙜𝙗 = 2𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 3𝙜𝙗 = 3𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 4𝙜𝙗 = 4𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 5𝙜𝙗 = 5𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 6𝙜𝙗 = 6𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 7𝙜𝙗 = 7𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 8𝙜𝙗 = 8𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 9𝙜𝙗 = 9𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 10𝙜𝙗 = 10𝙠*
📡 *𝙋𝙖𝙣𝙚𝙡 𝙐𝙣𝙡𝙞 = 11𝙠*

`𝘼𝘿𝘼 𝙇𝙊𝙂𝙊 𝘼𝙄 𝙅𝙐𝙂𝘼`
𝙇𝙊𝙂𝙊 𝘼𝙄 𝘾𝙐𝙎𝙏𝙊𝙈 𝙉𝘼𝙈𝘼 = 𝟮𝙆

𝙇𝙊𝙂𝙊 𝘼𝙄 𝘾𝙐𝙎𝙏𝙊𝙈 𝙉𝘼𝙈𝘼 𝙏𝘼𝙈𝙋𝙄𝙇𝘼𝙉 𝙀𝙎𝙏𝙀𝙏𝙄𝙆 = 𝟯𝙆

𝙇𝙊𝙂𝙊 𝘼𝙄 𝘾𝙐𝙎𝙏𝙊𝙈 𝙉𝘼𝙈𝘼
𝘽𝙄𝙎𝘼 𝙍𝙀𝙌𝙐𝙀𝙎𝙏 𝙏𝙀𝙈𝘼 = 𝟱𝙆

█░ █░█ ▀█▀ █▀ █ ▀█ ▀▄▀
█▄ █▄█ ░█░ █▀ █ █▄ █░█'
      })
    }
  })
}

startBot()