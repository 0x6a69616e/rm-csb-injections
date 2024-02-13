(async () => {
  // prevent the phishing banner from appearing
  if (!localStorage.HIDE_PHISHING_BANNER)
    localStorage.HIDE_PHISHING_BANNER = !0;

  
  // remove the "Open Sandbox" watermark button
  const wm_iframe = await (async () => {
    do {
      const iframes = document.querySelectorAll("iframe");
      for (const iframe of iframes)
        if (iframe.id.startsWith("sb__open-sandbox")) return iframe;
      await new Promise((res) => setTimeout(res, 0));
    } while (!0);
  })();

  const div = document.createElement("div");
  div.id = wm_iframe.id;

  wm_iframe.remove();
  document.body.append(div);


  // detect phishing flag
  const csb_id = document.location.host.split(".")[0];
  const response = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/" + csb_id + "/phishing"
  );
  const { flagged } = await response.json();

  if (flagged) console.warn("This sandbox has been flagged for phishing!");
})();
