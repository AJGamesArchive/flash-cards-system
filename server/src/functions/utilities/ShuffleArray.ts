/**
 * Function to shuffle the elements in an array
 * @param array Array to shuffle
 * @returns A New Array
 */
function shuffleArray<T>(array: T[]): T[] {
  // Soft copy array to avoid mutation issues
  const shuffled = [...array];

  // Iterate over the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Pick random index' and swap elements
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  };

  // Return shuffled array
  return shuffled;
};

export default shuffleArray;