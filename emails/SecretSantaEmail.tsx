interface SecretSantaEmailProps {
  giverName: string;
  receiverName: string;
  receiverAlias: string;
}

export function SecretSantaEmailHTML({
  giverName,
  receiverName,
  receiverAlias,
}: SecretSantaEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tu Amigo Invisible 🎅</title>
</head>
<body style="margin:0;padding:0;background-color:#0d1b2a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0d1b2a 0%,#1a0a0a 50%,#0a1f0a 100%);min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:0 0 20px;">
              <div style="font-size:60px;line-height:1;">🎅</div>
              <h1 style="margin:10px 0;color:#FFD700;font-size:36px;font-weight:bold;text-shadow:0 0 20px rgba(255,215,0,0.5);">
                Amigo Invisible
              </h1>
              <div style="width:100px;height:3px;background:linear-gradient(90deg,transparent,#FFD700,transparent);margin:0 auto;"></div>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td>
              <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,215,0,0.3);border-radius:20px;padding:40px;backdrop-filter:blur(10px);">

                <!-- Greeting -->
                <p style="color:#ffffff;font-size:22px;margin:0 0 10px;text-align:center;">
                  ¡Hola, <strong style="color:#FFD700;">${giverName}</strong>! 🎄
                </p>
                <p style="color:#cccccc;font-size:16px;text-align:center;margin:0 0 30px;">
                  El sorteo de Amigo Invisible ya se realizó y...
                </p>

                <!-- Secret reveal -->
                <div style="background:linear-gradient(135deg,#8B0000,#CC0000);border-radius:16px;padding:30px;text-align:center;margin:0 0 30px;box-shadow:0 10px 30px rgba(204,0,0,0.3);">
                  <p style="color:#FFD700;font-size:14px;text-transform:uppercase;letter-spacing:3px;margin:0 0 15px;">
                    🤫 Tu Amigo Invisible es...
                  </p>
                  <div style="font-size:48px;margin:10px 0;">🎁</div>
                  <h2 style="color:#ffffff;font-size:32px;margin:10px 0;text-shadow:0 2px 10px rgba(0,0,0,0.5);">
                    ${receiverName}
                  </h2>
                  <p style="color:#FFD700;font-size:18px;margin:5px 0;">
                    Alias: <strong>${receiverAlias}</strong>
                  </p>
                </div>

                <!-- Warning -->
                <div style="background:rgba(0,100,0,0.3);border:1px solid rgba(0,200,0,0.4);border-radius:12px;padding:20px;text-align:center;margin:0 0 30px;">
                  <p style="color:#90EE90;font-size:18px;font-weight:bold;margin:0;">
                    🤫 ¡No se lo cuentes a nadie!
                  </p>
                </div>

                <!-- Decorative separator -->
                <div style="text-align:center;font-size:24px;margin:20px 0;">
                  🎄 &nbsp; ⭐ &nbsp; 🎁 &nbsp; ⭐ &nbsp; 🎄
                </div>

                <!-- Footer message -->
                <p style="color:#aaaaaa;font-size:14px;text-align:center;margin:20px 0 0;">
                  ¡Que tengas una muy feliz Navidad y un próspero Año Nuevo! 🥂✨
                </p>
              </div>
            </td>
          </tr>

          <!-- Bottom stars -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <p style="color:#555;font-size:12px;margin:0;">
                Este mensaje fue generado automáticamente por Amigo Invisible App
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
