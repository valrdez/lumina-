// js/app.js
import { hashPassword, encryptData } from './cryptoUtils';

// Variable global para almacenar el último paquete encriptado
let lastEncryptedPackage = null;

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    
    // ---- EJEMPLO 3: FORMULARIO CON ENCRIPTACIÓN ----
    const Form = document.getElementById('demoForm');
    
    if (Form) {
        Form.addEventListener('submit', async (event) => {
            // Prevenir el envío normal del formulario
            event.preventDefault();
            
            console.log('🚀 Formulario enviado - Procesando datos...');
            
            // Obtener los valores del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('formPassword').value;
            const problem = document.getElementById('problem').value;
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
                const encryptedUserproblem = await encryptData(problem,masterKey);
                
                // PASO 3: Simular envío al servidor (aquí normalmente harías un fetch)
                const datosProtegidos = {
                    username_encriptado: encryptedUsername,
                    password_hash: hashedPassword,
                    problem_encriptado: encryptedUserproblem,
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

                    <strong>🔒 Prblema de usuario encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${encryptedUserproblem}
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
    mensaje= "Se envio cuestionario"
    
});