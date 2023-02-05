export const flickerButtonRed = (
  setFunc: (color: string) => void,
  originalColor: string
) => {
  setFunc("bg-red-600");
  setTimeout(() => setFunc("bg-red-600"), 200);
  setTimeout(() => setFunc("bg-red-500"), 300);
  setTimeout(() => setFunc("bg-red-600"), 400);
  setTimeout(() => setFunc("bg-red-500"), 500);
  setTimeout(() => setFunc(originalColor), 600);
};
