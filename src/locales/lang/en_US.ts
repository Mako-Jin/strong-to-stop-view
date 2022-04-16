const files = import.meta.globEager("./en_US/*.ts");

const lang = { language: "en_US" };
Object.keys(files).forEach((file: string) => {
  const moduleNames = files[file].default;
  Object.keys(moduleNames).forEach((item) => {
    lang[item] = moduleNames[item];
  });
});
export default lang;
