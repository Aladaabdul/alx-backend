#!/usr/bin/python3

"""BasicCache class"""


BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """BasicCache class

    """
    def __init__(self):
        """init function

        """
        super().__init__()

    def put(self, key, item):
        """put function

        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """get function

        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data.get(key)
