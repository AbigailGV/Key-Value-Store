# Key-Value-Store
*A simple key-value store for storing integers and a global version.*

Every time any key is written with a value, the version number is increased.
The store supports three operations:
1. PUT = returns the version number of this write.
2. Simple GET = returns the last value mapped to the key.
3. Versioned GET = it takes a key and a version number, and returns the corresponding value mapped to the key at the **time of the version number**. 

