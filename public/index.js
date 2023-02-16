const shorturl = document.querySelector('.short-url');

const urlValidator = (url = '') => {
  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlRegex.test(url);
}

const getShortUrl = async (e) => {
  try {
    e.preventDefault();
    let value;
    for (const [name, input] of new FormData(e.target).entries()) {
      value = input;
    }

    const valid = urlValidator(value);

    let message;

    if(!valid) {
      message = 'Please use a valid url'
      shorturl.innerHTML = `<p>${message}</p>`;
      return message;
    }

    const req = await fetch('http://localhost:3000/api/shorturl', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        originUrl: value
      })
    })

    if(!req.ok) {
      message = 'Unable to request shorturl'
      shorturl.innerHTML = `<p>${message}</p>`;
      return message;
    }

    const res = await req.text();

    shorturl.innerHTML = `<p>${res}</p>`;

    return res;
    
  } catch (error) {
    console.error(error);
    shorturl.innerHTML = `<p>${error}</p>`;
    return error;
  }
}

const form = document.querySelector('form');

form.addEventListener('submit', getShortUrl)
