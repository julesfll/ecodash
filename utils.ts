  // https://stackoverflow.com/a/196991
  export function toTitleCase(str: string) {
    if (!str) return "";
    return str.replace(/([^\W_]+[^\s-]*) */g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
