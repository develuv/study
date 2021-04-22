export default function getTestData(count = 111) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({id: new Date().getTime(), count}), 1000);
  })
}