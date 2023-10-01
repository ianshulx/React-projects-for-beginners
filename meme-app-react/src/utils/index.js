/****************************************************************
 * App Utilities functions
 ****************************************************************/

/**
 * Convert from bytes to KB, MB or GB
 * @param {number} bytes number to be converted from bytes to
 */
function formatSizeUnits(bytes) {
    // Check if number
    if (typeof bytes !== 'number') {
        return bytes;
    }

    let format;
    // Check
    if (bytes >= 1073741824) {
        format = (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
        format = (bytes / 1048576).toFixed(2) + ' MB';
    } else {
        format = (bytes / 1024).toFixed(2) + ' KB';
    }
    return format;
}

export { formatSizeUnits };
