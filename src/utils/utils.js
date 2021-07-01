import moment from 'moment';
import 'moment/locale/ru';

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  updatedCookie += '; path=/;';
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function saveToLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

export function getFromLocalStorage(name) {
  return localStorage.getItem(name);
}

export function removeFromLocalStorage(name) {
  localStorage.removeItem(name);
}

export const getTokenFromPayload = (payload) => {
  return payload && payload.indexOf('Bearer') === 0 ? payload.split('Bearer ')[1] : payload;
};


export const dateToFromNowDaily = ( myDate ) => {
  let fromNow = moment( myDate ).fromNow();
  const mom = moment( myDate );
  return mom.locale('ru')
    .calendar( null, {
      lastWeek: '[Прошлый] dddd, H:mm',
      lastDay:  '[Вчера], H:mm',
      sameDay:  '[Сегодня], H:mm',
      nextDay:  '[Завтра], H:mm',
      nextWeek: 'dddd, H:mm',
      sameElse: function () {
        return "[" + fromNow + "]";
      }
    });
}