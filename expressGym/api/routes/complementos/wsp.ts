import {Client, LocalAuth, NoAuth} from "whatsapp-web.js";
const qrcode = require('qrcode-terminal');

const wspClient = new Client({
    authStrategy:new NoAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        }
});
wspClient.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr,{small:true})
    console.log('QR RECEIVED', qr);
});

wspClient.on('ready', () => {
    console.log('Client is ready!');

});
wspClient.on("message_create",async(msg)=>{
    try{
        if(msg){
            if(msg.from != "status@broadcast"){
                const contact = await msg.getContact();
                console.log(contact,msg.body)
            }
        }
    }catch(error:any){
        console.log(error)
    }
})


export default module.exports=wspClient