const INTERVAL_SECOND = 60;
const css = `
  #no-youtube {
    padding: 50px;
    font-size: large;
    color: white;
    background: #121212;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  #no-youtube::backdrop {
    background: #242424dd;
  }

  #no-youtube button {
    color: white;
    background: transparent;
    border-radius: 10px;
    font-size: medium;
    padding: 5px 10px;
    border: 1px solid white;
  }

  #no-youtube button:hover {
    background: white;
    color: #121212;
    border: 1px solid black;
  }
`;

const modalRedirectInnerHTML = `
  <h1>You haven't study yet</h1>
  <h1>Redirect after 5 seconds</h1>
`;

const modalErrorFetchInnerHTML = `
  <h1>Error when connect to localhost server</h1>
  <h1>Please be sure that the server at localhost is running</h1>
`;

async function main() {
  const origin = window.location.href;
  const url = encodeURIComponent(origin);
  let data;
  try {
    const res = await fetch(
      `http://localhost:1234/api/get-permission?url=${url}`,
    );
    data = await res.json();
  } catch (e) {
    const body = document.body;
    const modal = document.createElement("dialog");
    modal.id = "no-youtube";
    modal.innerHTML = modalErrorFetchInnerHTML;

    injectCSS(css);
    body.appendChild(modal);
    modal.showModal();
  }
  console.log("Response from no-youtube-yes-study localhost server", data);
  if (data.redirect) {
    const body = document.body;
    const modal = document.createElement("dialog");
    modal.id = "no-youtube";
    modal.innerHTML = modalRedirectInnerHTML;

    injectCSS(css);
    body.appendChild(modal);
    modal.showModal();
    setTimeout(() => (window.location.href = "http://localhost:3000/"), 5000);
  }
}

function injectCSS(cssContent) {
  const styleElement = document.createElement("style");
  styleElement.textContent = cssContent;
  document.head.appendChild(styleElement);
  return styleElement;
}

main();
setInterval(main, 1000 * INTERVAL_SECOND);
