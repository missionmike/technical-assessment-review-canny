export default function sortBy(array, key, descending = false) {
  return array.sort((a, b) => {
    if (a[key] === b[key]) return 0; // The same value, no sorting needed.

    // The value of `descending` determines whether or not to reverse the sort.
    return (a[key] > b[key] ? 1 : -1) * (descending ? -1 : 1);
  });
}
