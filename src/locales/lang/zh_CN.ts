const files = import.meta.globEager("./zh_CN/*.ts");

const lang = { language: "zh_CN" };
Object.keys(files).forEach((file: string) => {
  const moduleNames = files[file].default;
  Object.keys(moduleNames).forEach((item) => {
    lang[item] = moduleNames[item];
  });
});

export default lang;
