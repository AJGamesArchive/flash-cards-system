/**
 * Function to generate a date string in the format of "dd/mm/yyyy"
 * @param date Optional - Date object to generate the date string for
 * @returns Date string in the format of "dd/mm/yyyy"
 */
function getDateString(date?: Date): string {
	var timestamp: Date;
	if (date) {
		timestamp = date;
	} else {
		timestamp = new Date();
	}
	const dateString: string =
		String(timestamp.getDate()).padStart(2, '0') +
		'/' +
		String(timestamp.getMonth() + 1).padStart(2, '0') +
		'/' +
		timestamp.getFullYear();
	return dateString;
}

export default getDateString;
