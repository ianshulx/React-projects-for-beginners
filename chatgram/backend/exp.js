function convertUTCToIST(utcDateString) {
    const utcDate = new Date(utcDateString);
    const utcTime = utcDate.getTime();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = utcTime + istOffset;
    const istDate = new Date(istTime);
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strHours = hours.toString().padStart(2, '0');
    const strMinutes = minutes.toString().padStart(2, '0');
    return `${strHours}:${strMinutes} ${ampm}`;
}

// Example usage:
const utcDateString = '2024-07-12T16:22:40.333+00:00'; 
const istTimeString = convertUTCToIST(utcDateString);
console.log(istTimeString); 
