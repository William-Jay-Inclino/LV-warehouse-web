export function convertMiddleNameToInitial(middleName: string) {
    if (middleName && middleName.length > 0) {
      return middleName.charAt(0).toUpperCase() + ".";
    } else {
      // Return an empty string or another appropriate value if there's no middle name
      return "";
    }
  }


  export function getFullname(firstname: string, middlename: string | null, lastname: string){
    if(middlename){
      return lastname + ', ' + firstname + ' ' + convertMiddleNameToInitial(middlename)
    }
    return lastname + ', ' + firstname
  }


  export function isValidDate(dateString: any): boolean {
    // Parse the input date string
    const parsedDate = new Date(dateString);
  
    // Check if the parsed date is a valid date and the input string is not NaN
    return !isNaN(parsedDate.getTime()) && parsedDate.toString() !== 'Invalid Date';
}