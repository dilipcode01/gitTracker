export function formatDateToReadableString(isoDate:any) {
    const date = new Date(isoDate);
  
    // Extract individual components
    const options = { month: "long" };
    const month = new Intl.DateTimeFormat("en-US", options).format(date);
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Format hours and minutes
    const period = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour clock
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${month} ${day}, ${formattedHours}:${formattedMinutes} ${period}`;
  }