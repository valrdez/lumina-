import { hashPassword, encryptData, decryptData } from './cryptoUtils.js';


document.addEventListener('DOMContentLoaded',()=>{

    

    const Form = document.getElementById('Form');
    Form.addEventListener('submit', async(event)=>{ 

        event.preventDefault();
        console.log('Formulario enviado - precesando datos... ');
        const nombre = document.getElementById('username').value;
        const correo = document.getElementById('formPassword').value;
        const problema = document.getElementById('problem').value;
        const formResult = document.getElementById('formResult');

        const ferKey = "ProfNoEntiendoAYUDA";
        const nombreEncriptado = await encryptData(nombre,ferKey);
        const decryptNombre = await decryptData(nombreEncriptado,ferKey);

        
        const correoEncriptado = await encryptData(correo, ferKey);
        const decryptCorreo = await decryptData( correoEncriptado, ferKey );

        const problemaEncriptado = await encryptData(problema, ferKey);
        const descryptProblema = await decryptData(problemaEncriptado, ferKey);


        formResult.innerHTML = `
                    <br><br>
                    <strong>Datos protegidos exitosamente</strong><br><br>
                
                    <strong>Nombre Encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${nombreEncriptado}
                    </div>
                    <br><br>
                     <strong>Nombre desencriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${decryptNombre}
                    </div>
                    
                    <br>
                    
                    <strong>Correo encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${correoEncriptado}
                    </div>
                    
                     <strong>Correo Desencriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${decryptCorreo}
                    </div>
                    <br>
                    
                    <strong>Problema encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${problemaEncriptado}
                    </div>
                    
                     <strong>problema Desencriptado :</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${descryptProblema}
                    </div>
                    

                    
                    
                `;

    });




    
});


        // console.log(`Nombre: ${nombre}`);
        // console.log(`Coreo: ${correo}`);
        // console.log(`Problema: ${problema}`);
        // console.log(`Nombre Encriptado: ${nombreEncriptado}`);
        // console.log(`Nombre Desencriptado: ${decryptNombre}`);
        // console.log(`correo Encriptado: ${correoEncriptado}`);
        // console.log(`Correo Desencriptado: ${decryptCorreo}`);
        // console.log(`problema Encriptado: ${problemaEncriptado}`);
        // console.log(`problema desencryptado: ${descryptProblema}`);