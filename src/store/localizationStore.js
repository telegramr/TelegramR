import {EventEmitter} from 'events';
import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import DBController from '../controllers/dbController';
import {storageGet, storageSet} from '../utils/common';
import en from '../assets/i18n/en'
import ar from '../assets/i18n/ar'

const defaultLanguage = 'en';
const defaultNamespace = 'translation';
const language = storageGet('i18n') || defaultLanguage;
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb(defaultLanguage),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    ns: [defaultNamespace, 'local'],
    defaultNS: defaultNamespace,
    fallbackNS: ['local', 'emoji'],
    fallbackLng: defaultLanguage,
    debug: true,
    resources: {
      en: {
        local: {
          LeftChannel: 'Left channel',
          LeftGroup: 'Left group',
          EnterPassword: 'Enter a Password',
          YourAccountProtectedWithPassword:
            'Your account is protected with an additional password.',
          DeletedMessage: 'Deleted message',
          YourPhone: 'Your Phone',
          SignInToTelegram: 'Sign in to Telegram',
          PhoneNumber: 'Phone Number',
          Country: 'Country',
          KeepMeSignedIn: 'Keep me signed in',
          StartText:
            'Please confirm your country code and enter your phone number.',
          Next: 'Next',
          InvalidPhoneNumber:
            'Invalid phone number. Please check the number and try again.',
          More: 'More',
          SendFileConfirmation: 'Are you sure you want to send file?',
          SendFilesConfirmation: 'Are you sure you want to send files?',
          SendMessage: 'Send Message',
          ChatInfo: 'Chat Info',
          ChannelInfo: 'Channel Info',
          Stickers: 'STICKERS',
          Emoji: 'EMOJI',
          SelectChatToStartMessaging: 'Select a chat to start messaging',
          Text: 'Text',
          ViewChannelInfo: 'View channel info',
          ViewGroupInfo: 'View group info',
          ViewProfile: 'View profile',
          GoToMessage: 'Go to message',
          PhotosTitle: 'Photos',
          VideosTitle: 'Videos',
          VoiceTitle: 'Voice messages',
          UpdateDraftConfirmation: 'Are you sure you want to update draft?',
        },
        emoji: {
          Search: 'Search',
          NotEmojiFound: 'No Emoji Found',
          ChooseDefaultSkinTone: 'Choose your default skin tone',
          SearchResults: 'Search Results',
          Recent: 'Frequently Used',
          SmileysPeople: 'Smileys & People',
          AnimalsNature: 'Animals & Nature',
          FoodDrink: 'Food & Drink',
          Activity: 'Activity',
          TravelPlaces: 'Travel & Places',
          Objects: 'Objects',
          Symbols: 'Symbols',
          Flags: 'Flags',
          Custom: 'Custom',
        },
        translation: {
          AppName: 'Telegram',
          Connecting: 'Connecting...',
          ConnectingToProxy: 'Connecting to proxy...',
          Loading: 'Loading...',
          Updating: 'Updating...',
          WaitingForNetwork: 'Waiting for network...',
          ContinueOnThisLanguage: 'Continue in English',
          ...en,
        },
      },
      ru: {
        local: {
          LeftChannel: 'Канал покинут',
          LeftGroup: 'Группа покинута',
          EnterPassword: 'Введите пароль',
          YourAccountProtectedWithPassword:
            'Ваш аккаунт защищен дополнительным паролем.',
          DeletedMessage: 'Удаленное сообщение',
          YourPhone: 'Ваш телефон',
          SignInToTelegram: 'Вход в Telegram',
          PhoneNumber: 'Телефонный номер',
          Country: 'Страна',
          KeepMeSignedIn: 'Сохранить авторизацию',
          StartText: 'Пожалуйста, укажите код страны и свой номер телефона.',
          Next: 'Далее',
          InvalidPhoneNumber:
            'Некорректный номер телефона. Пожалуйста, проверьте номер и попробуйте ещё раз.',
          More: 'Ещё',
          SendFileConfirmation: 'Вы действительно хотите отправить файл?',
          SendFilesConfirmation: 'Вы действительно хотите отправить файлы?',
          SendMessage: 'Отправить сообщение',
          ChatInfo: 'Информация о чате',
          ChannelInfo: 'Информация о канале',
          Stickers: 'СТИКЕРЫ',
          Emoji: 'ЕМОДЗИ',
          SelectChatToStartMessaging: 'Выберите, кому хотели бы написать',
          Text: 'Текст',
          ViewChannelInfo: 'Информация о канале',
          ViewGroupInfo: 'Информация о группе',
          ViewProfile: 'Показать профиль',
          GoToMessage: 'Перейти к сообщению',
          PhotosTitle: 'Фотографии',
          VideosTitle: 'Видеозаписи',
          VoiceTitle: 'Голосовые сообщения',
          UpdateDraftConfirmation:
            'Вы действительно хотите обновить черновик сообщения?',
        },
        emoji: {
          Search: 'Поиск',
          NotEmojiFound: 'Емодзи не найдены',
          ChooseDefaultSkinTone: 'Выберите тон кожи по умолчанию',
          SearchResults: 'Результаты поиска',
          Recent: 'Часто используемые',
          SmileysPeople: 'Смайлики и люди',
          AnimalsNature: 'Животные и природа',
          FoodDrink: 'Еда и напитки',
          Activity: 'Активность',
          TravelPlaces: 'Путешествия и местности',
          Objects: 'Предметы',
          Symbols: 'Символы',
          Flags: 'Флаги',
          Custom: 'Пользовательские',
        },
        translation: {
          AppName: 'Telegram',
          Connecting: 'Соединение...',
          ConnectingToProxy: 'Подключение к прокси...',
          Loading: 'Загрузка...',
          Updating: 'Обновление...',
          WaitingForNetwork: 'Ожидание сети...',
          ContinueOnThisLanguage: 'Продолжить на русском',
        },
      },
      ar: {
        local: {
          LeftChannel: 'Left channel',
          LeftGroup: 'Left group',
          EnterPassword: 'Enter a Password',
          YourAccountProtectedWithPassword:
            'Your account is protected with an additional password.',
          DeletedMessage: 'Deleted message',
          YourPhone: 'Your Phone',
          SignInToTelegram: 'Sign in to Telegram',
          PhoneNumber: 'Phone Number',
          Country: 'Country',
          KeepMeSignedIn: 'Keep me signed in',
          StartText:
            'Please confirm your country code and enter your phone number.',
          Next: 'Next',
          InvalidPhoneNumber:
            'Invalid phone number. Please check the number and try again.',
          More: 'More',
          SendFileConfirmation: 'Are you sure you want to send file?',
          SendFilesConfirmation: 'Are you sure you want to send files?',
          SendMessage: 'Send Message',
          ChatInfo: 'Chat Info',
          ChannelInfo: 'Channel Info',
          Stickers: 'STICKERS',
          Emoji: 'EMOJI',
          SelectChatToStartMessaging: 'Select a chat to start messaging',
          Text: 'Text',
          ViewChannelInfo: 'View channel info',
          ViewGroupInfo: 'View group info',
          ViewProfile: 'View profile',
          GoToMessage: 'Go to message',
          PhotosTitle: 'Photos',
          VideosTitle: 'Videos',
          VoiceTitle: 'Voice messages',
          UpdateDraftConfirmation: 'Are you sure you want to update draft?',
        },
        emoji: {
          Search: 'Search',
          NotEmojiFound: 'No Emoji Found',
          ChooseDefaultSkinTone: 'Choose your default skin tone',
          SearchResults: 'Search Results',
          Recent: 'Frequently Used',
          SmileysPeople: 'Smileys & People',
          AnimalsNature: 'Animals & Nature',
          FoodDrink: 'Food & Drink',
          Activity: 'Activity',
          TravelPlaces: 'Travel & Places',
          Objects: 'Objects',
          Symbols: 'Symbols',
          Flags: 'Flags',
          Custom: 'Custom',
        },
        translation: {
          AppName: 'Telegram',
          Connecting: 'Connecting...',
          ConnectingToProxy: 'Connecting to proxy...',
          Loading: 'Loading...',
          Updating: 'Updating...',
          WaitingForNetwork: 'Waiting for network...',
          ContinueOnThisLanguage: 'Continue in English',
          ...ar,
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: false,
    },
  });

class LocalizationStore extends EventEmitter {
  constructor() {
    super();

    this.defaultLanguage = defaultLanguage;
    this.i18n = i18n;
    // this.cache = cache;

    this.setMaxListeners(Infinity);
    this.addTdLibListener();
  }

  addTdLibListener = () => {
    DBController.addListener('update', this.onUpdate);
    DBController.addListener('clientUpdate', this.onClientUpdate);
  };

  removeTdLibListener = () => {
    DBController.off('update', this.onUpdate);
    DBController.off('clientUpdate', this.onClientUpdate);
  };

  onUpdate = update => {
    switch (update['@type']) {
      case 'updateAuthorizationState': {
        switch (update.authorization_state['@type']) {
          case 'authorizationStateWaitTdlibParameters':
            DBController.send({
              '@type': 'setOption',
              name: 'localization_target',
              value: {'@type': 'optionValueString', value: 'android'},
            });
            DBController.send({
              '@type': 'setOption',
              name: 'language_pack_id',
              value: {'@type': 'optionValueString', value: language},
            });
            DBController.send({
              '@type': 'getLocalizationTargetInfo',
              only_local: false,
            }).then(result => {
              this.info = result;

              DBController.clientUpdate({
                '@type': 'clientUpdateLanguageChange',
                language: language,
              });
            });
            break;
        }
        break;
      }
      case 'updateLanguagePackStrings': {
        // add/remove new strings

        this.emit('updateLanguagePackStrings', update);
        break;
      }
    }
  };

  onClientUpdate = async update => {
    switch (update['@type']) {
      case 'clientUpdateLanguageChange': {
        const {language} = update;

        DBController.send({
          '@type': 'getLanguagePackStrings',
          language_pack_id: language,
          keys: [],
        }).then(async result => {
          await storageSet('i18n', language);

          const resources = this.processStrings(language, result);

          // this.cache.save(language, defaultNamespace, resources);

          // i18n.addResourceBundle(language, defaultNamespace, resources);
          //
          // await i18n.changeLanguage(language);

          DBController.send({
            '@type': 'setOption',
            name: 'language_pack_id',
            value: {'@type': 'optionValueString', value: language},
          });

          this.emit('clientUpdateLanguageChange', update);
        });
        break;
      }
    }
  };

  processStrings = (lng, languagePackStrings) => {
    if (!languagePackStrings) {
      return {};
    }
    const {strings} = languagePackStrings;
    if (!strings) {
      return {};
    }

    let result = {};
    for (let i = 0; i < strings.length; i++) {
      const {value} = strings[i];
      switch (value['@type']) {
        case 'languagePackStringValueOrdinary': {
          result[strings[i].key] = value.value;
          break;
        }
        case 'languagePackStringValuePluralized': {
          //result[strings[i].key] = value.value;
          break;
        }
        case 'languagePackStringValueDeleted': {
          break;
        }
      }
    }

    return result;
  };

  loadLanguage = async language => {
    const result = await DBController.send({
      '@type': 'getLanguagePackStrings',
      language_pack_id: language,
      keys: [],
    });

    const resources = this.processStrings(language, result);
  };
}

const store = new LocalizationStore();
window.localization = store;
export default store;
