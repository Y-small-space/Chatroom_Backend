const dateString = "2024-03-25T16:00:00.000Z";
const date = new Date(dateString);
const formattedDate = date.toLocaleDateString();

console.log(formattedDate);