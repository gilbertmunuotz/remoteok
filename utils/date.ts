export default function getCurrentMonthYear() {

  const currentDate = new Date();

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();


  return `${month}, ${year}`;
}