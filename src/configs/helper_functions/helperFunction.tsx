import moment from "moment-timezone";
import * as XLSX from "xlsx-js-style";
export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
};

export function dateTimeAccToTimeZone(timezone: string) {
  return moment().tz(`${timezone}`).format("YYYY-MM-DD HH:mm:ss");
}

export function customDateFormat(date: string, format: string) {
  return moment(`${new Date(date)}`).format(`${format}`);
}

export const downloadxsls = (
  data: Array<Record<string, any>>,
  name: string
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  const headerrowsettings = [{ hpt: 30 }];
  let headerdatasettings = {
    font: { bold: true, sz: 16 },
    fill: { patternType: "solid", fgColor: { rgb: "F26720" } },
  };
  let innerdatasettings = {
    font: { sz: 13 },
    alignment: { horizontal: "left" },
  };
  let myarr = [];
  for (let key in worksheet) {
    let newdata: string[] = key.split("");
    if (newdata[newdata.length - 1] == "1" && newdata.length === 2) {
      worksheet[`${key}`]["s"] = { ...headerdatasettings };
    } else if (
      key !== "!ref" &&
      !(newdata[newdata.length - 1] == "1" && newdata.length === 2)
    ) {
      worksheet[`${key}`]["s"] = { ...innerdatasettings };
    }
    myarr.push({ wch: 32 });
  }
  // const merge = [
  //     { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } }, { s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
  // ];
  // worksheet["!merges"] = merge;
  worksheet["!cols"] = [...myarr];
  worksheet["!rows"] = headerrowsettings;
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${name}.xlsx`);
};
