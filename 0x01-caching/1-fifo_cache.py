#!/usr/bin/python3

"""FIFOCache function"""


BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    def __init__(self):
        """initialize class"""
        super().__init__()

    def put(self, key, item):
        """put function

        """
        if key is None or item is None:
            return None

        self.cache_data[key] = item

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS and \
                key not in self.cache_data:
            first_key = next(iter(self.cache_data))
            print(f"DISCARD: {first_key}")
            del self.cache_data[first_key]

    def get(self, key):
        """get function

        """
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.get(key)
