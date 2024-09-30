Array.prototype.toMonthSort = function <T>(this: T[]) {
  let copy=[...this]

  const monthOrder = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return copy?.length > 1
    ? copy?.sort((a, b) => {
        const indexA = monthOrder.indexOf(a as string);
        const indexB = monthOrder.indexOf(b as string);

        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      })
    : copy;
};
