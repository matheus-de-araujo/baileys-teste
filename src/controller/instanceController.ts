import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom'

export class instanceController {
    async connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState('session1')
    
        const sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
            browser: ['Teste', "MacOS", "3.0"],
        })

        console.log(sock.ev);
    
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update
            console.log(connection);
            if(connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                // console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)
                // reconnect if not logged out
                if(shouldReconnect) {
                    // await this.connectToWhatsApp()
                }
            } else if(connection === 'open') {
                // console.log('opened connection')
            }

            



        })
    
        // sock.ev.on('messages.upsert', m => {
        //     console.log(JSON.stringify(m, undefined, 2))
    
        //     console.log('replying to', m.messages[0].key.remoteJid)
        //     sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
        // })
    }
}
