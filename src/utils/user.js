import UserStore from '../store/userStore';
import {getLetters} from './common';
import dayjs from 'dayjs';
import {
  PROFILE_PHOTO_BIG_SIZE,
  PROFILE_PHOTO_SMALL_SIZE,
  SERVICE_NOTIFICATIONS_USER_ID,
} from '../constants/Constants';

function getUserStatus(user) {
  if (!user) {
    return null;
  }
  if (!user.status) {
    return null;
  }

  if (user.id === SERVICE_NOTIFICATIONS_USER_ID) {
    return 'service notifications';
  }

  if (user.type && user.type['@type'] === 'userTypeBot') {
    return 'bot';
  }

  switch (user.status['@type']) {
    case 'userStatusEmpty': {
      return 'last seen a long time ago';
    }
    case 'userStatusLastMonth': {
      return 'last seen within a month';
    }
    case 'userStatusLastWeek': {
      return 'last seen within a week';
    }
    case 'userStatusOffline': {
      let {was_online} = user.status;
      if (!was_online) {
        return 'offline';
      }

      const now = new Date();
      const wasOnline = new Date(was_online * 1000);
      if (wasOnline > now) {
        return 'last seen just now';
      }

      let diff = new Date(now - wasOnline);

      // within a minute
      if (diff.getTime() / 1000 < 60) {
        return 'last seen just now';
      }

      // within an hour
      if (diff.getTime() / 1000 < 60 * 60) {
        const minutes = Math.floor(diff.getTime() / 1000 / 60);
        return `last seen ${
          minutes === 1 ? '1 minute' : minutes + ' minutes'
        } ago`;
      }

      // today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (wasOnline > today) {
        // up to 6 hours ago
        if (diff.getTime() / 1000 < 6 * 60 * 60) {
          const hours = Math.floor(diff.getTime() / 1000 / 60 / 60);
          return `last seen ${hours === 1 ? '1 hour' : hours + ' hours'} ago`;
        }

        // other
        return `last seen today at ${dayjs(wasOnline).format('H:MM')}`;
      }

      // yesterday
      let yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      today.setHours(0, 0, 0, 0);
      if (wasOnline > yesterday) {
        return `last seen yesterday at ${dayjs(wasOnline).format('H:MM')}`;
      }

      return `last seen ${dayjs(wasOnline).format('dd.mm.yyyy')}`;
    }
    case 'userStatusOnline': {
      return 'online';
    }
    case 'userStatusRecently': {
      return 'last seen recently';
    }
  }

  return null;
}

function getUserFullName(user) {
  if (!user) {
    return null;
  }
  if (!user.type) {
    return null;
  }

  switch (user.type['@type']) {
    case 'userTypeBot':
    case 'userTypeRegular': {
      if (user.first_name && user.last_name) {
        return `${user.first_name} ${user.last_name}`;
      }
      if (user.first_name) {
        return user.first_name;
      }
      if (user.last_name) {
        return user.last_name;
      }
    }
    case 'userTypeDeleted':
    case 'userTypeUnknown': {
      return 'Deleted account';
    }
  }

  return null;
}

function getUserShortName(userId) {
  const user = UserStore.get(userId);
  if (!user) {
    return null;
  }
  if (!user.type) {
    return null;
  }

  switch (user.type['@type']) {
    case 'userTypeBot':
    case 'userTypeRegular': {
      if (user.first_name) {
        return user.first_name;
      }
      if (user.last_name) {
        return user.last_name;
      }
    }
    case 'userTypeDeleted':
    case 'userTypeUnknown': {
      return 'Deleted account';
    }
  }

  return null;
}

function getUserLetters(userId, firstName, lastName) {
  const user = UserStore.get(userId);
  if (!user && !(firstName || lastName)) {
    return null;
  }

  const title = getUserFullName(user) || `${firstName} ${lastName}`.trim();
  const letters = getLetters(title);

  if (letters && letters.length > 0) {
    return letters;
  }

  if (user) {
    return user.first_name
      ? user.first_name.charAt(0)
      : user.last_name
      ? user.last_name.charAt(0)
      : '';
  }

  return firstName ? firstName.charAt(0) : lastName ? lastName.charAt(0) : '';
}

function isUserOnline(user) {
  if (!user) {
    return false;
  }

  const {id, status, type} = user;
  if (!status) {
    return false;
  }
  if (!type) {
    return false;
  }
  if (id === SERVICE_NOTIFICATIONS_USER_ID) {
    return false;
  }

  return (
    status['@type'] === 'userStatusOnline' && type['@type'] !== 'userTypeBot'
  );
}

export {
  getUserStatus,
  getUserFullName,
  getUserShortName,
  getUserLetters,
  isUserOnline,
};
