// js/app.js
import { hashPassword, encryptData, decryptData } from './cryptoUtils';

// Variable global para almacenar el último paquete encriptado
let lastEncryptedPackage = null;

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // ---- EJEMPLO 1: HASH DE CONTRASEÑA ----
    const hashBtn = document.getElementById('hashBtn');
    if (hashBtn) {
        hashBtn.addEventListener('click', async () => {
            const password = document.getElementById('plainPassword').value;
            const hashResult = document.getElementById('hashResult');
            
            if (!password) {
                hashResult.innerHTML = '<span class="error">❌ Escribe una contraseña</span>';
                return;
            }
            
            try {
                const hashed = await hashPassword(password);
                hashResult.innerHTML = `
                    <strong>Hash generado:</strong><br>
                    ${hashed}<br>
                    <span class="success">✅ Listo para guardar o enviar en lugar del texto plano.</span>
                    <br><small>🔍 Longitud: ${hashed.length} caracteres</small>
                `;
                console.log('Hash generado:', hashed);
            } catch (error) {
                hashResult.innerHTML = `<span class="error">Error: ${error.message}</span>`;
                console.error('Error en hash:', error);
            }
        });
    }
    
    // ---- EJEMPLO 2: ENCRIPTACIÓN SIMÉTRICA ----
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    
    if (encryptBtn) {
        encryptBtn.addEventListener('click', async () => {
            const secret = document.getElementById('secretData').value;
            const masterPwd = document.getElementById('masterKey').value;
            const encryptedResult = document.getElementById('encryptedResult');
            const decryptedResult = document.getElementById('decryptedResult');
            
            if (!secret || !masterPwd) {
                alert('⚠️ Completa el dato secreto y la contraseña maestra');
                return;
            }
            
            if (masterPwd.length < 4) {
                alert('⚠️ La contraseña maestra debería tener al menos 4 caracteres');
                return;
            }
            
            try {
                const encrypted = await encryptData(secret, masterPwd);
                lastEncryptedPackage = encrypted;
                encryptedResult.innerHTML = `
                    <strong>📦 Dato Encriptado:</strong><br>
                    <div style="font-size: 12px; word-break: break-all;">${encrypted}</div>
                    <br>
                    <span class="success">✅ Este texto es seguro. Sin la contraseña maestra es inútil.</span>
                    <br><small>💾 Puedes guardar este texto en localStorage o enviarlo al servidor</small>
                `;
                decryptedResult.innerHTML = '';
                
                // Guardar en localStorage
                localStorage.setItem('encryptedNote', encrypted);
                console.log('✅ Dato encriptado y guardado en localStorage:', encrypted);
                
            } catch (error) {
                encryptedResult.innerHTML = `<span class="error">Error: ${error.message}</span>`;
                console.error('Error en encriptación:', error);
            }
        });
    }
    
    if (decryptBtn) {
        decryptBtn.addEventListener('click', async () => {
            const masterPwd = document.getElementById('masterKey').value;
            const decryptedResult = document.getElementById('decryptedResult');
            
            if (!lastEncryptedPackage) {
                // Intentar recuperar del localStorage si existe
                const saved = localStorage.getItem('encryptedNote');
                if (saved) {
                    lastEncryptedPackage = saved;
                    document.getElementById('encryptedResult').innerHTML = `
                        <strong>📦 Recuperado del localStorage:</strong><br>
                        <div style="font-size: 12px; word-break: break-all;">${saved}</div>
                        <br>
                        <small>✅ Dato recuperado, ingresa la contraseña para desencriptar</small>
                    `;
                    console.log('📦 Dato recuperado de localStorage');
                } else {
                    alert('🔐 Primero encripta algún dato o no hay datos guardados');
                    return;
                }
            }
            
            if (!masterPwd) {
                alert('🔑 Ingresa la contraseña maestra para desencriptar');
                return;
            }
            
            try {
                const decrypted = await decryptData(lastEncryptedPackage, masterPwd);
                decryptedResult.innerHTML = `
                    <strong>🔓 Dato Original:</strong><br>
                    <div style="background: white; padding: 10px; border-radius: 5px;">${decrypted}</div>
                    <br>
                    <span class="success">✅ Recuperado exitosamente.</span>
                `;
                console.log('✅ Dato desencriptado correctamente:', decrypted);
            } catch (error) {
                decryptedResult.innerHTML = `
                    <strong>❌ Error:</strong><br>
                    <span class="error">${error.message}</span>
                    <br><small>Verifica que la contraseña maestra sea correcta</small>
                `;
                console.error('Error en desencriptación:', error);
            }
        });
    }
    
    // ---- EJEMPLO 3: FORMULARIO CON ENCRIPTACIÓN ----
    const demoForm = document.getElementById('demoForm');
    
    if (demoForm) {
        demoForm.addEventListener('submit', async (event) => {
            // Prevenir el envío normal del formulario
            event.preventDefault();
            
            console.log('🚀 Formulario enviado - Procesando datos...');
            
            // Obtener los valores del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('formPassword').value;
            const formResult = document.getElementById('formResult');
            
            // Validar que los campos no estén vacíos
            if (!username || !password) {
                formResult.innerHTML = `
                    <span class="error">❌ Por favor, completa todos los campos del formulario</span>
                `;
                return;
            }
            
            try {
                // Mostrar estado de procesamiento
                formResult.innerHTML = `
                    <span class="info">⏳ Procesando y protegiendo datos...</span>
                `;
                
                // PASO 1: Generar hash de la contraseña (no se guarda el texto plano)
                console.log('📝 Generando hash de la contraseña...');
                const hashedPassword = await hashPassword(password);
                
                // PASO 2: Encriptar el nombre de usuario (simulando datos sensibles)
                console.log('🔒 Encriptando nombre de usuario...');
                const masterKey = "claveMaestraDelSistema"; // En un caso real, esto sería única por usuario
                const encryptedUsername = await encryptData(username, masterKey);
                
                // PASO 3: Simular envío al servidor (aquí normalmente harías un fetch)
                const datosProtegidos = {
                    username_encriptado: encryptedUsername,
                    password_hash: hashedPassword,
                    timestamp: new Date().toISOString(),
                    metodo: "POST",
                    endpoint: "/api/registro"
                };
                
                console.log('📦 Datos que se enviarían al servidor:', datosProtegidos);
                
                // Mostrar resultados en el HTML
                formResult.innerHTML = `
                    <strong>✅ Datos protegidos exitosamente</strong><br><br>
                    
                    <strong>🔐 Hash de contraseña (lo que se guarda):</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${hashedPassword}
                    </div>
                    
                    <br>
                    
                    <strong>🔒 Nombre de usuario encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${encryptedUsername}
                    </div>
                    
                    <br>
                    
                    <strong>📤 Simulación de envío al servidor:</strong><br>
                    <div style="background: #f0f0f0; padding: 10px; border-radius: 4px; font-size: 12px; margin-top: 5px;">
                        <code style="word-break: break-all;">
                            ${JSON.stringify(datosProtegidos, null, 2)}
                        </code>
                    </div>
                    
                    <br>
                    
                    <span class="success">🎉 ¡Los datos están protegidos! Ni siquiera en la consola se ve la contraseña original.</span>
                    
                    <br><br>
                    
                    <small>💡 <strong>Nota:</strong> En un entorno real, estos datos se enviarían mediante fetch() a tu backend, 
                    nunca la contraseña en texto plano.</small>
                `;
                
                // Limpiar los campos del formulario (opcional)
                // document.getElementById('username').value = '';
                // document.getElementById('formPassword').value = '';
                
            } catch (error) {
                console.error('❌ Error en el procesamiento del formulario:', error);
                formResult.innerHTML = `
                    <span class="error">❌ Error al procesar el formulario: ${error.message}</span>
                `;
            }
        });
    } else {
        console.warn('⚠️ No se encontró el formulario con id "demoForm"');
    }
    
    // Mostrar mensaje de inicio
    console.log('🚀 Utilidades de encriptación cargadas correctamente');
    console.log('💡 Prueba el formulario: completa los campos y haz clic en enviar');
    
    // Verificar si hay datos guardados previamente
    const savedNote = localStorage.getItem('encryptedNote');
    if (savedNote && document.getElementById('encryptedResult')) {
        document.getElementById('encryptedResult').innerHTML = `
            <strong>💾 Dato recuperado del localStorage:</strong><br>
            <div style="font-size: 12px; word-break: break-all;">${savedNote}</div>
            <br>
            <small>Usa la contraseña maestra original para desencriptar</small>
        `;
        lastEncryptedPackage = savedNote;
        console.log('💾 Dato recuperado de localStorage al cargar');
    }
});