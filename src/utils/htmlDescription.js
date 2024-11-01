export const parseHTMLDescription = (htmlDescription) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlDescription, 'text/html');
    return doc.body.textContent || "";
};
