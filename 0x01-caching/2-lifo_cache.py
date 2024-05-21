#!/usr/bin/python3

"""FIFOCache function"""


BaseCaching = __import__('base_caching').BaseCaching
from collections import OrderedDict


class LIFOCache(BaseCaching):
    """LIFO class

    """
    def __init__(self):
        """initialize class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """put function

        """
        if key is None or item is None:
            return None

        self.cache_data[key] = item

        if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
            last_key, _ = self.cache_data.popitem(True)
            print(f"DISCARD: {last_key}")
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, last=True)

    def get(self, key):
        """get function

        """
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.get(key)
