import { Router } from 'express';
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom'

const router = Router();

router.get('/', async (req, res) => {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

    const sock = makeWASocket({ 
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                // connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })

    // sock.ev.on('messages.upsert', m => {
    //     console.log(JSON.stringify(m, undefined, 2))

    //     console.log('replying to', m.messages[0].key.remoteJid)
    //     sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    // })

    res.send('Olá mundos');
})

export default router