// Configuración y dependencias
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');

// Configuración centralizada
const config = {
    CHROME_PATH: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    TYPING_DELAY: 5000,
    VALID_EXIT_COMMANDS: ['salir', 'gracias', 'adios', 'bye']
};

// Sistema de registro
const logger = {
    info: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
    error: (message) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`)
};

// Inicialización del cliente
const client = new Client({
    puppeteer: {
        executablePath: config.CHROME_PATH,
    }
});

// Función de delay
const delay = ms => new Promise(res => setTimeout(res, ms));

// Mensajes predefinidos
const messages = {
    welcome: (name) => `¡Hola! ${name.split(" ")[0]} 👋 Bienvenid@ al Mejor Centro de Enseñanza Automovilísitico del Quindío 🚗 🏁 😎\n\nElige uno de los numeros del menu:\n\n1- Curso de conduccion de motocicleta.\n2- Curso de conduccion de automovil particular.\n3-*Doble Curso de conduccion de motocicleta y automovil*\n4- Curso de conduccion de automovil publico.\n5- Refrendacion licencia.\n6- Horarios.\n7- Formas de pago.\n8- Ubicacion\n*9Me intereza ¿cual es el paso a seguir?*\n0- AYUDA`,
    invalidOption: 'Favor digite uno de los números del menú (1 al 9).',
    goodbye: 'Fue un placer brindarte información. Recuerda que:\nEstamos ubicados en la Cra 15 # 15-23 Piso 2, Armenia, Quindío.\n🕿 6067362577\n📱 312 739 4286\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7 \nTe esperamos en la oficina para ayudarte con tu trámite para obtener la licencia de conducción.',
    error: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.',
    followUp: 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.'
};

// Respuestas del menú
const menuResponses = {
    '1': ' Moto categoría A2 🛵\n📝Teoría:28 horas\n🛵Prácticas: 15 horas\nIncluye:\n✅certificado de conducción\n✅Examen médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil depende de cada sede de tránsito.\n💰💳 Precio publico ~$910.00~\nPara ti: 😍🎁 $850.000 🎁🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.',
    '2': ' Carro particular B1 🚗\n📝Teoria: 30 horas\n🚗Prácticas: 20 horas\nEl valor incluye:\n✅ certificado teórico práctico ✅certificado médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil depende de cada sede de tránsito.\n💰💳Precio publico ~1.245.000~\nPara ti: 😍🎁 $1.050.000🎁 hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.',
    '3': ' *Doble para moto A2🏍️ y carro particular B1🚗*\nConsta de 30 horas de teoría\n🛵15 horas de práctica en moto \n🚗20 horas  en carro\n💰💳el valor incluye:\n✅ certificado teórico práctico ✅examen médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil*(por categoría, si es doble cada tránsito cobra por 2)*.\n💸 Precio publico ~$2.013.000~\nPara ti:😍🎁 $1.800.000 🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.',
    '4': ' Para Carro PÚBLICO C1 🚔\n📝Teoría: 35 horas\n🚔 Práctica: 30 horas\nIncluye:\n✅certificado teórico práctico \n✅examen  médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de 80-90*(por categoría, si es doble cada tránsito cobra por 2)*\n💰💵El precio publico  es de ~$1.520.000~\nPara ti 😍 🎁 $1.300.000🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.',
    '5': ' La refrendación consta de un examen medico en el CRC Certifimed por valor de $219.000, lo puedes pagar aqui o directamente en el CRC, luego ir a la oficina de transito de su eleccion a imprimir la licencia',
    '6': ' Conoce nuestras 3 Jornadas\n\n*Jornada Diurna*\nIdeal para aquellas personas que tienen tiempo libre durante el transcurso del día\nTeoría: De 8.00 am a 7:30 pm de lunes a viernes y sábados de 8 a 2 pm\nPrácticas: Domingo a domingo de 6.00 am a 8.00 pm\n\nLas clases son en bloques de 2 horas: De 8.00am a 10.00am - 10.00am a 12.00m / 2.00pm a 4.00pm - 4.00pm a 6.00pm\n\n*Jornada Nocturna*\nIdeal para aquellas personas que trabajan durante el día y solo tienen un espacio en las noches\nTeoría: De 6.00 pm a 7:30 pm de lunes a viernes\nPrácticas: Domingo a domingo de 6.00 pm a 8.00 pm\n\n*Jornada Sabatina*\nIdeal para aquellas personas que trabajan durante toda la semana y solo tienen un espacio los días sábados y domingos\nTeoría: Sábados de 8.00 am a 2:00 pm\nPrácticas: Sábados de 6.00 am a 8.00 pm\nLas clases son en bloques de 2 horas: De 8.00am a 10.00am - 10.00am a 12.00m - 12.00m - 2.00pm',
    '7': ' Puede iniciar con el 30% del valor total; para iniciar clases prácticas paga el 50% y el otro 20% al finalizar el curso💰\nRecibimos: Efectivo,Tarjetas debido y crédito y transferencias y lo puede financiar con Addi, Tio Paco, confialianza, sistecrédito (NO APLICA DESCUENTOS/PROMOCIONES CON FINANCIACIÓN)',
    '8': ' Estamos ubicados en la Cra 15 # 15-23 Piso 2, Armenia, Quindío.\n🕿 6067362577\n📱 312 739 4286\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7',
    '9': 'El paso a seguir seria\nVenir a nuestra cede para hacer la respectiva inscripción con el documento de identidad original\nRealizar el pago, en la modalidad que mas se le acomode, de la o las categoría(s) que eligió.\nNuestra oficina que queda ubicada en la CARRERA 15 # 15 - 23 PISO 2 CEA DEL CAFÉ en el centro de la ciudad de Armenia. 😍\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7',
    '0': 'Acabamos de informar a uno de nuestros asesores para ayudarte, favor espera un momento'
};

// Helper functions
async function sendMessageWithTyping(chat, message) {
    try {
        await chat.sendStateTyping();
        await delay(config.TYPING_DELAY);
        await client.sendMessage(chat.id._serialized, message);
    } catch (error) {
        logger.error(`Error sending message: ${error.message}`);
        await client.sendMessage(chat.id._serialized, messages.error);
    }
}

function isValidMenuOption(input) {
    return /^[0-9]$/.test(input);
}

// Event Handlers
client.on('qr', qr => {
    logger.info('QR Code generated');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    logger.info('WhatsApp client is ready');
    console.log('Todo bien! WhatsApp conectado.');
});

// Manejo de saludos
let saudacaoEnviada = {};

// Manejador principal de mensajes
client.on('message', async (msg) => {
    try {
        const chat = await msg.getChat();

        // Ignorar mensajes de grupos
        if (!msg.from.endsWith('@c.us')) {
            return;
        }

        // Manejo de comandos de salida
        if (config.VALID_EXIT_COMMANDS.includes(msg.body.toLowerCase())) {
            await sendMessageWithTyping(chat, messages.goodbye);
            return;
        }

        // Saludo inicial
        if (!saudacaoEnviada[msg.from]) {
            saudacaoEnviada[msg.from] = true;
            const contact = await msg.getContact();
            const name = contact.pushname;
            await sendMessageWithTyping(chat, messages.welcome(name));
            return;
        }

        // Manejo de opciones del menú
        if (isValidMenuOption(msg.body)) {
            const response = menuResponses[msg.body];
            if (response) {
                await sendMessageWithTyping(chat, response);
                await sendMessageWithTyping(chat, messages.followUp);
            } else {
                await sendMessageWithTyping(chat, messages.invalidOption);
            }
        } else if (msg.body.toLowerCase() === 'ayuda') {
            await sendMessageWithTyping(chat, menuResponses['0']);
        } else {
            await sendMessageWithTyping(chat, messages.invalidOption);
        }

    } catch (error) {
        logger.error(`Error in message handler: ${error.message}`);
        await client.sendMessage(msg.from, messages.error);
    }
});

// Inicialización
client.initialize();