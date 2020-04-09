import {Alert, AsyncStorage, Image, Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {PHOTO_SIZE} from '../constants/Constants';
import MessageStore from '../store/messageStore';

function stringToBoolean(string: string): string {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(string);
  }
}

function getFitSize(size, max, increaseToMax = true) {
  if (!size) {
    return {width: 0, height: 0};
  }
  if (!increaseToMax) {
    if (size.width < max && size.height < max) {
      return size;
    }
  }

  if (size.width > size.height) {
    return {width: max, height: Math.floor((size.height * max) / size.width)};
  }
  return {width: Math.floor((size.width * max) / size.height), height: max};
}

function getPhotoSize(sizes, displaySize = PHOTO_SIZE) {
  return getSize(sizes, displaySize);
}

function getSize(sizes, dimension) {
  if (!sizes) {
    return null;
  }
  if (sizes.length === 0) {
    return null;
  }
  if (dimension === 0) {
    return null;
  }

  // let iSize = sizes[2];//.find(x => x.type === 'i');
  // if (iSize){
  //     return iSize;
  // }

  let useWidth = sizes[0].width >= sizes[0].height;
  let diff = Math.abs(
    dimension - (useWidth ? sizes[0].width : sizes[0].height),
  );
  let index = 0;
  for (let i = 1; i < sizes.length; i++) {
    if (
      sizes[i].type === 'i' &&
      !sizes[i].photo.local.is_downloading_completed
    ) {
      continue;
    }

    let currDiff = Math.abs(
      dimension - (useWidth ? sizes[i].width : sizes[i].height),
    );
    if (currDiff < diff) {
      index = i;
      currDiff = diff;
    }
  }

  return sizes[index];
}

function getFirstLetter(str) {
  if (!str) {
    return '';
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i].toUpperCase() !== str[i].toLowerCase()) {
      return str[i];
    } else if (str[i] >= '0' && str[i] <= '9') {
      return str[i];
    }
  }

  return '';
}

function getLetters(title) {
  if (!title) {
    return null;
  }
  if (title.length === 0) {
    return null;
  }

  const split = title.split(' ');
  if (split.length === 1) {
    return getFirstLetter(split[0]);
  }
  if (split.length > 1) {
    return getFirstLetter(split[0]) + getFirstLetter(split[1]);
  }

  return null;
}

function getOS(): string {
  return Platform.OS;
}

function getDeviceId(): string {
  return DeviceInfo.getDeviceId();
}

const sortBy = (sortKey: string, reverse: boolean = false) => (a, b) => {
  if (a[`${sortKey}`] < b[`${sortKey}`]) {
    return reverse ? -1 : 1;
  }
  if (a[`${sortKey}`] > b[`${sortKey}`]) {
    return reverse ? 1 : -1;
  }
  return 0;
};

// function getImageSize(uri) {
//   if(!uri) {
//     return {
//       width: 0,
//       height: 0,
//     };
//   }
//   Image.getSize(`${uri}`, (width, height) => {
//     console.log('width==>', {width, height})
//     return {
//       width,
//       height,
//     };
//   });
// }

const getImageSize = function(uri) {
  return new Promise(function(resolve, reject) {
    Image.getSize(`${uri}`, (width, height) => {
      if (!width || !height) {
        reject({width: 0, height: 0});
      } else {
        resolve({
          width,
          height,
        });
      }
    });
  });
};

async function getScaleImageSize(uri, w, h) {
  const imageSize = await getImageSize(uri);
  if (w) {
    const imageHeight = (imageSize.height * w) / imageSize.width;
    return {
      width: w,
      height: imageHeight,
    };
  } else if (h) {
    const imageWidth = (h / imageSize.height) * imageSize.width;
    return {
      width: imageWidth,
      height: h,
    };
  } else {
    return imageSize;
  }
}

const openLink = (url: string, insite = false) => {
  const isSelectedMode = MessageStore.selectedItems.size >= 1;
  if (isSelectedMode) {
    return;
  }

  if (insite) {
    // TODO: open in webview
  } else {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('', 'open link failed');
      }
    });
  }
};

async function storageSet(key: string, value) {
  await AsyncStorage.setItem(key, value);
}

async function storageGet(key: string, cb) {
  await AsyncStorage.removeItem(key, cb);
}

function isIncludes(item: number, array: any): boolean {
  return array.includes(item);
}

function isBlank(val: string): boolean {
  const reg = /^\s*$/;
  return reg.test(val);
}

function getStaticStickerData(stickerId): any {
  const stickerList = [
    {
      id: '457590613194309887',
      data: require('../assets/stickers/457590613194309887.json'),
    },
    {
      id: '1592756632805185992',
      data: require('../assets/stickers/1592756632805185992.json'),
    },
    {
      id: '1592756632805185993',
      data: require('../assets/stickers/1592756632805185993.json'),
    },
    {
      id: '1592756632805185994',
      data: require('../assets/stickers/1592756632805185994.json'),
    },
    {
      id: '1592756632805185995',
      data: require('../assets/stickers/1592756632805185995.json'),
    },
    {
      id: '1592756632805185996',
      data: require('../assets/stickers/1592756632805185996.json'),
    },
    {
      id: '1592756632805185997',
      data: require('../assets/stickers/1592756632805185997.json'),
    },
    {
      id: '1592756632805185998',
      data: require('../assets/stickers/1592756632805185998.json'),
    },
    {
      id: '1592756632805185999',
      data: require('../assets/stickers/1592756632805185999.json'),
    },
    {
      id: '457590613194309878',
      data: require('../assets/stickers/457590613194309878.json'),
    },
    {
      id: '457590613194309869',
      data: require('../assets/stickers/457590613194309869.json'),
    },
    {
      id: '457590613194309870',
      data: require('../assets/stickers/457590613194309870.json'),
    },
  ];
  return stickerList.find(item => item.id === stickerId);
}

export {
  stringToBoolean,
  getFitSize,
  getPhotoSize,
  getSize,
  getFirstLetter,
  getLetters,
  sortBy,
  getImageSize,
  getScaleImageSize,
  openLink,
  getOS,
  getDeviceId,
  storageSet,
  storageGet,
  isIncludes,
  isBlank,
  getStaticStickerData,
};
