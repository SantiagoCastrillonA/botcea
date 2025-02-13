// Invocamos el lector de codigo qr
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); 
const client = new Client({puppeteer: {executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',}});

// habilitamos el acceso al codigo qr
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// informa que el whatsapp está conectado
client.on('ready', () => {
    console.log('Todo bien! WhatsApp conectado.');
});
// Iniciación
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Función que usamos para crear un retraso entre una acción y otra

// Flujo de conversación

let saudacaoEnviada = {};

client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificar si el mensaje es de un grupo o si es de un usuario
    if (!msg.from.endsWith('@c.us')) {
        return; // Ignorar mensages de grupos
    }

    if (!saudacaoEnviada[msg.from]) {
        saudacaoEnviada[msg.from] = true;
        
        await chat.sendStateTyping();
        await delay(5000);
        const contact = await msg.getContact(); //extrayendo el contacto
        const name = contact.pushname; //extrayendo el nombre del contacto

        //saludo y presenta el menu de opciones
        await client.sendMessage(msg.from, '¡Hola! '+ name.split(" ")[0] + '👋 Bienvenid@ al Mejor Centro de Enseñanza Automovilísitico del Quindío 🚗 🏁 😎\n\nElige uno de los numeros del menu:\n\n1- Curso de conduccion de motocicleta.\n2- Curso de conduccion de automovil particular.\n3-*Doble Curso de conduccion de motocicleta y automovil*\n4- Curso de conduccion de automovil publico.\n5- Refrendacion licencia.\n6- Horarios.\n7- Formas de pago.\n8- Ubicacion\n*9Me intereza ¿cual es el paso a seguir?*\n0- AYUDA');
    }

    
    
if (msg.body >= 0 && msg.body <= 9) {
            // Si el número está en el rango de 1 a 9, continuar con el menú
            const chat = await msg.getChat();
            await delay(5000);
      
            
            
            // Aquí va la lógica para el menú o la siguiente acción

        //menu de opciones del 0 al 9   
     if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Moto categoría A2 🛵\n📝Teoría:28 horas\n🛵Prácticas: 15 horas\nIncluye:\n✅certificado de conducción\n✅Examen médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil depende de cada sede de tránsito.\n💰💳 Precio publico ~$910.00~\nPara ti: 😍🎁 $850.000 🎁🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }
      
     if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Carro particular B1 🚗\n📝Teoria: 30 horas\n🚗Prácticas: 20 horas\nEl valor incluye:\n✅ certificado teórico práctico ✅certificado médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil depende de cada sede de tránsito.\n💰💳Precio publico ~1.245.000~\nPara ti: 😍🎁 $1.050.000🎁 hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

     if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' *Doble para moto A2🏍️ y carro particular B1🚗*\nConsta de 30 horas de teoría\n🛵15 horas de práctica en moto \n🚗20 horas  en carro\n💰💳el valor incluye:\n✅ certificado teórico práctico ✅examen médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de $80 mil a $90 mil*(por categoría, si es doble cada tránsito cobra por 2)*.\n💸 Precio publico ~$2.013.000~\nPara ti:😍🎁 $1.800.000 🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }


     if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Para Carro PÚBLICO C1 🚔\n📝Teoría: 35 horas\n🚔 Práctica: 30 horas\nIncluye:\n✅certificado teórico práctico \n✅examen  médico\n❌No incluye derechos de tránsito (plástico-lamina) cada persona decide en qué parte del Quindío le conviene imprimir su lámina. El valor puede ser de 80-90*(por categoría, si es doble cada tránsito cobra por 2)*\n💰💵El precio publico  es de ~$1.520.000~\nPara ti 😍 🎁 $1.300.000🎁🎁  hasta el 31 de diciembre\n*Proceso de inscripcion:\n⏰Horario:\nLunes a viernes de 8:00 am a 6:30 pm (jornada continua)\nSábado de 8:00 am a 1:30 pm\n👆🏼Proceso presencial personal\nContar con 25 minutos para la realizacion del proceso de registro, documento de identidad original y el respectivo pago.');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

     if (msg.body !== null && msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' La refrendación consta de un examen medico en el CRC Certifimed por valor de $219.000, lo puedes pagar aqui o directamente en el CRC, luego ir a la oficina de transito de su eleccion a imprimir la licencia');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }
    
     if (msg.body !== null && msg.body === '6' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Conoce nuestras 3 Jornadas\n\n*Jornada Diurna*\nIdeal para aquellas personas que tienen tiempo libre durante el transcurso del día\nTeoría: De 8.00 am a 7:30 pm de lunes a viernes y sábados de 8 a 2 pm\nPrácticas: Domingo a domingo de 6.00 am a 8.00 pm\n\nLas clases son en bloques de 2 horas: De 8.00am a 10.00am - 10.00am a 12.00m / 2.00pm a 4.00pm - 4.00pm a 6.00pm\n\n*Jornada Nocturna*\nIdeal para aquellas personas que trabajan durante el día y solo tienen un espacio en las noches\nTeoría: De 6.00 pm a 7:30 pm de lunes a viernes\nPrácticas: Domingo a domingo de 6.00 pm a 8.00 pm\n\n*Jornada Sabatina*\nIdeal para aquellas personas que trabajan durante toda la semana y solo tienen un espacio los días sábados y domingos\nTeoría: Sábados de 8.00 am a 2:00 pm\nPrácticas: Sábados de 6.00 am a 8.00 pm\nLas clases son en bloques de 2 horas: De 8.00am a 10.00am - 10.00am a 12.00m - 12.00m - 2.00pm');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

     if (msg.body !== null && msg.body === '7' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Puede iniciar con el 30% del valor total; para iniciar clases prácticas paga el 50% y el otro 20% al finalizar el curso💰\nRecibimos: Efectivo,Tarjetas debido y crédito y transferencias y lo puede financiar con Addi, Tio Paco, confialianza, sistecrédito (NO APLICA DESCUENTOS/PROMOCIONES CON FINANCIACIÓN)');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

      if (msg.body !== null && msg.body === '8' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, ' Estamos ubicados en la Cra 15 # 15-23 Piso 2, Armenia, Quindío.\n🕿 6067362577\n📱 312 739 4286\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

      if (msg.body !== null && msg.body === '9' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'El paso a seguir seria\nVenir a nuestra cede para hacer la respectiva inscripción con el documento de identidad original\nRealizar el pago, en la modalidad que mas se le acomode, de la o las categoría(s) que eligió.\nNuestra oficina que queda ubicada en la CARRERA 15 # 15 - 23 PISO 2 CEA DEL CAFÉ en el centro de la ciudad de Armenia. 😍\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7');
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Si tienes otra pregunta digita otro número según la opción deseada, o escribe AYUDA para que una persona pueda atenderte.');

      }

     if (msg.body !== null && msg.body === '0'|| msg.body ==='AYUDA'|| msg.body === 'Ayuda'|| msg.body ==='ayuda' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, 'Acabamos de informar a uno de nuestros asesores para ayudarte, favor espera un momento');

      }
    }
       // Si el número no está en el rango, enviar un mensaje de error
    else {
         await chat.sendStateTyping();
         await delay(5000);
         await client.sendMessage(msg.from, 'Favor digite uno de los números del menú (1 al 9).');
         }
 
const cerrarPrograma = async (msg) => {
    // Enviar mensaje de despedida al cliente
    await client.sendMessage(msg.from, 'Fue un placer brindarte información. Recuerda que:\nEstamos ubicados en la Cra 15 # 15-23 Piso 2, Armenia, Quindío.\n🕿 6067362577\n📱 312 739 4286\n📍link de Gps Google maps: https://maps.app.goo.gl/jkeyePXnaJU2vp2n7 \nTe esperamos en la oficina para ayudarte con tu trámite para obtener la licencia de conducción.');

    // Esperar unos segundos antes de cerrar el programa
    await delay(2000); 

    // Cerrar la asesoria
    
};

// Llama a esta función cuando quieras despedir al cliente y cerrar el programa
client.on('message', async (msg) => {
    if (msg.body.toLowerCase() === 'salir' || msg.body.toLowerCase() === 'Gracias' || msg.body.toLowerCase() === 'gracias' || msg.body.toLowerCase() === 'adios' || msg.body.toLowerCase() === 'bye') {
        await cerrarPrograma(msg); // Despedir y cerrar
    }
});

    
});