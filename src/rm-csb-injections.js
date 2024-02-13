(async () => {
  // prevent the phishing banner from appearing
  if (!localStorage.HIDE_PHISHING_BANNER)
    localStorage.HIDE_PHISHING_BANNER = !0;

  // remove the "Open Sandbox" watermark button
  const wm_iframe = await (async () => {
    do {
      const iframes = document.querySelectorAll('iframe');
      for (const iframe of iframes)
        if (iframe.id.startsWith('sb__open-sandbox')) return iframe;
      await new Promise((res) => setTimeout(res, 0));
    } while (!0);
  })();

  const div = document.createElement('div');
  div.id = wm_iframe.id;
  
  wm_iframe.remove();
  document.body.append(div);
})();
