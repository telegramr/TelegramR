export const transTime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return `${ minute > 10 ? minute : (`0${ minute }`) }:${ second > 9 ? second : ('0' + second) }`
};
