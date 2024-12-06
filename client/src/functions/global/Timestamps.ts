/**
 * Create string with current date and time or the date and time specified by an iso string if provided
 * @param iosString Optional - An iso string to generate the time stamp for
 * @param removeHours Optional - A boolean to remove the hours from the time stamp
 * @returns Date and Time in format of DD/MM/YYYY - HH/mm
 */
function getReadableTimestamp(iosString?: string, removeHours?: boolean): string;

/**
 * Create string with current date and time or the date and time specified by a unix code if provided
 * @param unixCode Optional - A unix time code to generate the time stamp for
 * @param removeHours Optional - A boolean to remove the hours from the time stamp
 * @returns Date and Time in format of DD/MM/YYYY - HH/mm
 */
function getReadableTimestamp(unixCode?: number, removeHours?: boolean): string;

// Implementation
function getReadableTimestamp(providedDate?: string | number, removeHours?: boolean): string {
  var timestamp: Date;
  if(typeof providedDate === 'string') {
    timestamp = new Date(providedDate);
  } else if(typeof providedDate === 'number') {
    timestamp = new Date(providedDate * 1000);
  } else {
    timestamp = new Date();
  };
  let date: string = String(timestamp.getDate()).padStart(2, "0") + "/" + String(timestamp.getMonth() + 1).padStart(2, "0") + "/" + timestamp.getFullYear();
  if(!removeHours) date += " - " + String(timestamp.getHours()).padStart(2, "0") + ":" + String(timestamp.getMinutes()).padStart(2, "0");
  return date;
};

export default getReadableTimestamp;