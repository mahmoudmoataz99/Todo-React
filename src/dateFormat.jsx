export const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDate = date.toLocaleString('en-GB', options);
    return formattedDate.replace(',', '').replace(/\//g, '-');
};
