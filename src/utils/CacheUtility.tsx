import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'gainer_loser_detail_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const getCacheKey = (url: string) => `${CACHE_PREFIX}${url}`;

export const getCachedResponse = async (url: string) => {
  const key = getCacheKey(url);
  const cachedData = await AsyncStorage.getItem(key);
  if (!cachedData) return null;

  const { timestamp, data } = JSON.parse(cachedData);
  if (Date.now() - timestamp > CACHE_EXPIRY) {
    await AsyncStorage.removeItem(key);
    return null;
  }

  return data;
};

export const setCachedResponse = async (url: string, data: any) => {
  const key = getCacheKey(url);
  const cachedData = {
    timestamp: Date.now(),
    data,
  };
  await AsyncStorage.setItem(key, JSON.stringify(cachedData));
};