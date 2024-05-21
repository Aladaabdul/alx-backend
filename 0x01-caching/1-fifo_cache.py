#!/usr/bin/python3

"""FIFOCache function"""


from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):

    """FIFOCache class

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

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key, _ = self.cache_data.popitem(False)
            print(f"DISCARD: {first_key}")

    def get(self, key):
        """get function

        """
        return self.cache_data.get(key, None)

    def print_cache(self):
        """print the cache"""

        print("Current cache:")
        for key, value in self.cache_data.items():
            print(f"{key}: {value}")
