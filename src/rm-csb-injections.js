(async function(delay, key, timestamp) {
  // keep the phishing banner hidden
  localStorage[key] || (localStorage[key] = !0);
  
  // remove the "Open Sandbox" watermark button
  const wm_iframe = await (async function() {
    for (; Date.now() < timestamp + delay;) {
      for (let iframe of document.querySelectorAll('iframe'))
        if (iframe.id.startsWith('sb__open-sandbox')) return iframe;
      await new Promise(res => setTimeout(res, 0));
    }
    return;
  })();

  if (!wm_iframe) return console.warn(`no watermark button detected within ${delay}ms`);
  const div = document.createElement('div');
  div.id = wm_iframe.id;

  wm_iframe.remove();
  document.body.append(div);
})(1750, 'HIDE_PHISHING_BANNER', Date.now());
