function buildSimpleTextMessage(msisdn, message) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'text',
    text: {
      body: message,
    },
  });
}

function buildImageMessage(msisdn, imageUrl) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'image',
    image: {
      link: imageUrl,
    },
  });
}

function buildImageMessage(msisdn, audioUrl) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'audio',
    audio: {
      link: audioUrl,
    },
  });
}

function buildVideoMessage(msisdn, videoUrl) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'video',
    video: {
      link: videoUrl,
    },
  });
}

function buildDocumentMessage(msisdn, documentUrl) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'document',
    document: {
      link: documentUrl,
    },
  });
}

function buildLocationMessage(msisdn, latitude, longitude, name, address) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'location',
    location: {
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: address,
    },
  });
}

function buildButtonMessage(msisdn, header, body, buttons) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'text',
        text: header,
      },
      body: {
        text: body,
      },
      action: {
        buttons: buttons,
      },
    },
  });
}

function buildButtonMessage(msisdn, header, body, buttons) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'interactive',
    interactive: {
      type: 'button',
      header: {
        type: 'text',
        text: header,
      },
      body: {
        text: body,
      },
      action: {
        buttons: buttons,
      },
    },
  });
}

function buildListMessage(msisdn, header, body, footer, buttonText, sections) {
  return JSON.stringify({
    messaging_product: 'whatsapp',
    to: msisdn,
    type: 'interactive',
    interactive: {
      type: 'list',
      header: {
        type: 'text',
        text: header,
      },
      body: {
        text: body,
      },
      footer: {
        text: footer,
      },
      action: {
        button: buttonText,
        sections: sections,
      },
    },
  });
}

function getButtonItem(id, title) {
  return JSON.stringify({
    type: 'reply',
    reply: {
      id: id,
      title: title,
    },
  });
}

function getListItem(id, title, description) {
  return JSON.stringify({
    id: id,
    title: title,
    description: description,
  });
}

function getListSection(title, rows) {
  return JSON.stringify({
    title: title,
    rows: rows,
  });
}

module.exports = {
  buildSimpleTextMessage,
  buildImageMessage,
  buildAudioMessage,
  buildVideoMessage,
  buildDocumentMessage,
  buildLocationMessage,
  buildButtonMessage,
  buildListMessage,
  getButtonItem,
  getListItem,
  getListSection,
};
