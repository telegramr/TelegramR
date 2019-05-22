/**
 * ArrayObjs.sort( compare(sortKey) );
 * @param   sortKey       {string}      依据key
 * @param   [re=false]    {boolean}     排序方式, 默认递增
 * */
const sortBy = (sortKey: string, re: boolean = false) => (a, b) => {
  if (a[`${ sortKey }`] < b[`${ sortKey }`]) {
    return re ? -1 : 1;
  }
  if (a[`${ sortKey }`] > b[`${ sortKey }`]) {
    return re ? 1 : -1;
  }
  return 0;
}

export {
  sortBy
}
