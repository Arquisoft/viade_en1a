import auth from 'solid-auth-client';
import ldflex from '@solid/query-ldflex';
import { errorToaster } from '@utils';

export const documentExists = async (documentUri) =>
  auth.fetch(documentUri, {
    headers: {
      'Content-Type': 'text/turtle'
    }
  });

export const resourceExists = async (resourcePath) => {
  try {
    const result = await auth.fetch(resourcePath);
    return result.status === 403 || result.status === 200;
  } catch (e) {
    errorToaster(e.message, 'Error');
  }
};

export const discoverInbox = async (document) => {
  try {
    const documentExists = await resourceExists(document);
    if (!documentExists) return false;

    const inboxDocument = await ldflex[document]['ldp:inbox'];
    const inbox = inboxDocument ? await inboxDocument.value : false;
    return inbox;
  } catch (error) {
    throw error;
  }
};
